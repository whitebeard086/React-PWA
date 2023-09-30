<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Media;
use App\Models\Escrow;
use App\Models\Booking;
use App\Models\Dispute;
use App\Models\Invoice;
use App\Traits\SmsTrait;
use App\Models\Transaction;
use App\Traits\SystemTrait;
use Illuminate\Http\Request;
use App\Models\DisputeMessage;
use Illuminate\Support\Facades\DB;
use Vinkla\Hashids\Facades\Hashids;
use App\Notifications\InvoicePaidNotification;
use App\Notifications\ServiceCompletedNotification;
use App\Notifications\ServiceConfirmedNotification;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookingController extends Controller
{
    use SmsTrait;
    use SystemTrait;
    
    public function book_service(Request $request)
    {
        try {
            $bookingData = $request->validate([
                'service_id' => 'required',
                'provider_id' => 'required',
                'user_id' => 'required',
                'invoice_id' => 'required',
                'chat_id' => 'required',
            ]);

            DB::beginTransaction();
            
            $booking = Booking::create($bookingData);

            $escrow = new Escrow;
            $escrow->service_id = $booking->service_id;
            $escrow->user_id = $booking->user_id;
            $escrow->booking_id = $booking->id;
            $escrow->amount = $request->amount;
            $escrow->save();

            $user = User::findOrFail($booking->user_id);
            $provider = User::findOrFail($booking->provider_id);
            $escrowAccount = User::where('username', 'escrow')->firstOrFail();

            if (isset($user) && $user->balance < $request->amount) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'insufficient balance',
                ], 400);
            }
            
            $user->decrement('balance', $escrow->amount);
            $escrowAccount->increment('balance', $escrow->amount);

            $invoice = Invoice::findOrFail($request->invoice_id);
            $invoice->status = 'paid';
            $invoice->save();

            $txn = new Transaction;
            $txn->user_id = $user->id;
            $txn->reference = $invoice->invoice_number;
            $txn->amount = $invoice->price;
            $txn->type = 'Service Payment';
            $txn->final_amount = $invoice->price;
            $txn->method = 'transfer';
            $txn->status = 'Success';
            $txn->save();

            DB::commit();
            
            $provider->notify(new InvoicePaidNotification($user, $invoice));

            $receiverPhone = $provider->phone;
            $receiverUsername = $provider->username;
            $senderUsername = $user->username;
            $invoiceNumber = $invoice->invoice_number;

            $smsResponse = $this->serviceBookedSmsNotification($receiverPhone, $senderUsername, $receiverUsername, $invoiceNumber);

            

            return response()->json([
                'status' => 'success',
                'booking' => Booking::with('Escrow', 'Service.User', 'User', 'Invoice')->where('id', $booking->id)->firstOrFail(),
                'escrow' => $escrow,
            ], 200);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function complete_service(Request $request)
    {
        try {
            $booking = Booking::findOrFail($request->booking_id);
            
            $booking->service_status = 'completed';
            $booking->save();

            $provider = $booking->service->user;
            $receiver = $booking->user;
            $receiver->notify(new ServiceCompletedNotification($provider));

            $receiverPhone = $receiver->phone;
            $receiverUsername = $receiver->username;
            $senderUsername = $provider->username;

            $this->serviceCompletedSmsNotification($receiverPhone, $senderUsername, $receiverUsername);

            return response()->json([
                'status' => 'success',
                'message' => 'Booking completed',
                'booking' => Booking::with('Service.User', 'User')->where('id', $booking->id)->firstOrFail(),
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // public function confirm_service(Request $request)
    // {
    //     try {
    //         $booking = Booking::findOrFail($request->booking_id);
    //         $booking->user_status = 'completed';
    //         $booking->status = 'completed';

    //         $escrow = Escrow::where('booking_id', $booking->id)->firstOrFail();
    //         $escrow->status = 'completed';

    //         $escrowAccount = User::where('username', 'escrow')->firstOrFail();
    //         $escrowAccount->decrement('balance', $escrow->amount);

    //         $provider = User::where('id', $booking->provider_id)->firstOrFail();
    //         $provider->increment('balance', $escrow->amount);

    //         $booking->save();
    //         $escrow->save();
    //         $escrowAccount->save();
    //         $provider->save();

    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Service completed and closed successfully',
    //             'booking' => Booking::with('Service.User', 'User')->where('id', $booking->id)->firstOrFail(),
    //         ], 200);
            
    //     } catch (\Throwable $e) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $e->getMessage(),
    //         ], 500);
    //     }
    // }

    public function confirm_service(Request $request)
    {
        try {
            $booking = Booking::with('service.user', 'user', 'invoice')->findOrFail($request->booking_id);

            DB::beginTransaction();

            // Update booking status
            if ($request->rating) {
                $booking->rating = $request->rating;
            } else {
                return response()->json([
                    'status' => 'rating error',
                    'message' => 'Please kindly rate this service',
                ], 400);
            }
            $booking->comment = $request->comment;
            $booking->user_status = 'completed';
            $booking->status = 'completed';
            $booking->save();

            // Update escrow status
            $escrow = $booking->escrow;
            
            if (!$escrow) {
                throw new ModelNotFoundException('Escrow not found');
            }

            $escrow->status = 'completed';
            $escrow->save();

            // Update escrow account balance
            $escrowAccount = User::where('username', 'escrow')->firstOrFail();
            $escrowAccount->decrement('balance', $escrow->amount);
            $escrowAccount->save();

            // Update provider balance
            $provider = $booking->service->user;

            if (!$provider) {
                throw new ModelNotFoundException('Provider not found');
            }

            $taskitly = User::where('username', 'taskitly')->first();

            $commission = $this->calculateServiceCommission($escrow->amount);
            $service_commission = $commission['service_commission']; 
            $provider_commission = $commission['provider_commission']; 
            $commission_rate = $commission['commission_rate']; 

            $booking->service_commission = $service_commission;
            $booking->provider_commission = $provider_commission;
            $booking->commission_rate = $commission_rate;
            $booking->save();
            $taskitly->increment('balance', $service_commission);
            $taskitly->save();
            $provider->increment('balance', $provider_commission);
            $provider->save();

            $chat = $booking->chat;
            $chat->status = 'closed';
            $chat->save(); 

            $txn = new Transaction;
            $txn->user_id = $provider->id;
            $txn->reference = $booking->invoice->invoice_number;
            $txn->amount = $provider_commission;
            $txn->type = 'Service Payment';
            $txn->final_amount = $provider_commission;
            $txn->method = 'transfer';
            $txn->status = 'Success';
            $txn->save();

            DB::commit();
            
            $sender = $booking->user;
            $provider->notify(new ServiceConfirmedNotification($sender));

            $receiverPhone = $provider->phone;
            $receiverUsername = $provider->username;
            $senderUsername = $sender->username;
            $this->serviceConfirmedSmsNotification($receiverPhone, $senderUsername, $receiverUsername);

            return response()->json([
                'status' => 'success',
                'message' => 'Service completed and closed successfully',
                'booking' => $booking,
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }   
    }

    public function start_service(Request $request)
    {
        try {
            $booking = Booking::findOrFail($request->booking_id);

            $booking->service_status = 'ongoing';
            $booking->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Service resumed',
                'booking' => Booking::with('Service.User', 'User')->where('id', $booking->id)->firstOrFail(),
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function cancel_service(Request $request)
    {
        try {
            $booking = Booking::findOrFail($request->booking_id);

            DB::beginTransaction();

            if(!$request->reason) {
                return response()->json([
                    'status' => 'reason error',
                    'message' => 'Please kindly tell us why you want to cancel this service.',
                ], 400);
            } 

            $booking->service_status = 'cancelled';
            $booking->user_status = 'cancelled';
            $booking->status = 'cancelled';
            $booking->cancel_reason = $request->reason;
            $booking->save();

            // Update escrow status
            $escrow = $booking->escrow;

            if (!$escrow) {
                throw new ModelNotFoundException('Escrow not found');
            }

            $escrow->status = 'canceled';
            $escrow->save();

            // Update escrow account balance
            $escrowAccount = User::where('username', 'escrow')->firstOrFail();
            $escrowAccount->decrement('balance', $escrow->amount);
            $escrowAccount->save();

            // Update client's balance
            $client = $booking->user;

            if (!$client) {
                throw new ModelNotFoundException('Client not found');
            }

            $client->increment('balance', $escrow->amount);
            $client->save();

            $txn = new Transaction;
            $txn->user_id = $client->id;
            $txn->reference = $booking->invoice->invoice_number;
            $txn->amount = $booking->invoice->price;
            $txn->type = 'Service Payment Refund';
            $txn->final_amount = $booking->invoice->price;
            $txn->method = 'transfer';
            $txn->status = 'Success';
            $txn->save();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Service cancelled',
                'booking' => Booking::with('Service.User', 'User', 'Invoice')->where('id', $booking->id)->firstOrFail(),
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        } 
    }

    public function open_dispute(Request $request)
    {
        $formFields = $request->validate([
            'booking_id' => 'required',
            'reason' => 'required',
            'file' => 'nullable',
        ]);
        
        try {
            $booking = Booking::findOrFail($request->booking_id);
            $client = $booking->user;
            $provider = $booking->service->user;
            $invoice = $booking->invoice;

            DB::beginTransaction();

            if(!$request->reason) {
                return response()->json([
                    'status' => 'reason error',
                    'message' => 'Please kindly tell us why you want to lodge a complaint.',
                ], 400);
            } 

            if (!$client) {
                throw new ModelNotFoundException('Client not found');
            }

            if (!$provider) {
                throw new ModelNotFoundException('Provider not found');
            }

            if (!$invoice) {
                throw new ModelNotFoundException('Invoice not found');
            }

            $booking->service_status = 'disputed';
            $booking->user_status = 'disputed';
            $booking->status = 'disputed';
            $booking->save();

            $dispute = new Dispute;
            $dispute->booking_id = $booking->id;
            $dispute->disputer_id = auth()->user()->id;
            $dispute->client_id = $client->id;
            $dispute->provider_id = $provider->id;
            $dispute->invoice_id = $invoice->id;
            $dispute->description = $request->reason;
            $dispute->respond_before = Carbon::now()->addHours(24);
            $dispute->save();
            
            $dispute->uid = Hashids::encode($dispute->id);
            $dispute->save();

            if($request->hasFile('file')) {
                $formFields['file'] = $request->file('file')->storePublicly("bookings/disputes", 'wasabi');

                $dm = new DisputeMessage;
                $dm->dispute_id = $dispute->id;
                $dm->sender_id = auth()->user()->id;
                $dm->save();
                
                $media = new Media;
                $media->file = $formFields['file'];
                $dm->media()->save($media);
            }

            DB::commit();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Dispute Opened',
                'booking' => Booking::with('Service.User', 'User', 'Invoice')->where('id', $booking->id)->firstOrFail(),
                'dispute' => Dispute::with('Booking', 'Messages.Media')->where('id', $dispute->id)->get(),
            ], 201);

            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}