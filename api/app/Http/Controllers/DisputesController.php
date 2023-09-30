<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Media;
use App\Models\Dispute;
use App\Traits\SmsTrait;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\DisputeMessage;
use App\Traits\UploadImageTrait;
use Illuminate\Support\Facades\DB;
use App\Notifications\ServiceConfirmedNotification;
use App\Traits\SystemTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DisputesController extends Controller
{
    use UploadImageTrait;
    use SystemTrait;
    use SmsTrait;
    
    public function get_dispute(Request $request)
    {
        try {
            $dispute = Dispute::with('Client', 'Provider.Service', 'Disputer.Service', 'Booking.User', 'Booking.Service.User.Service', 'Booking.Invoice', 'Messages.Media')->where('uid', $request->DUID)->firstOrFail();

            return response()->json([
                'status' => 'success',
                'dispute' => $dispute,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function send_message(Request $request)
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $disputeQuery = Dispute::with('Booking.Service.User', 'Booking.User', 'Booking.Invoice', 'Messages.Media')->orderBy('id', 'desc');
            
            if ($user->profile_type_id == 1) {
                $disputes = $disputeQuery->where('client_id', $userId)->get();
            } elseif ($user->profile_type_id == 2) {
                $disputes = $disputeQuery->where('provider_id', $userId)->get();
            }
            
            $disMessage = new DisputeMessage;
            $disMessage->dispute_id = $request->dispute_id;
            $disMessage->sender_id = $request->sender_id;
            $disMessage->message = $request->message;
            $disMessage->save();

            if($request->hasFile('media')) {
                foreach ($request->file('media') as $file) {
                    $image = $file->storePublicly("bookings/disputes", 'wasabi');
                    
                    $disMedia = new Media;
                    $disMedia->file = $image;
                    $disMessage->media()->save($disMedia);
                }
            }


            return response()->json([
                'status' => 'success',
                'dispute' => Dispute::with('Client', 'Provider.Service', 'Booking.Service.User', 'Booking.User', 'Booking.Invoice', 'Messages.Media')->where('id', $request->dispute_id)->first(),
                'message' => DisputeMessage::with('Media')->where('id', $disMessage->id)->first(),
                // 'disputes' => $disputes,
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function close_dispute(Request $request)
    {
        try {
            $dispute = Dispute::with('Client', 'Provider.Service', 'Disputer.Service', 'Booking.User', 'Booking.Service.User.Service', 'Booking.Invoice', 'Messages.Media')->where('uid', $request->DUID)->firstOrFail();
            $booking = $dispute->booking;

            DB::beginTransaction();

            // Update dispute status
            $dispute->status = 'resolved';
            $dispute->save();

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
                'dispute' => $dispute,
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
}