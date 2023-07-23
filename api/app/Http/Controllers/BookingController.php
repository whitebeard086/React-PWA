<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Escrow;
use App\Models\Booking;
use App\Models\Invoice;
use App\Traits\SmsTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notifications\InvoicePaidNotification;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BookingController extends Controller
{
    use SmsTrait;
    
    public function book_service(Request $request)
    {
        try {
            $bookingData = $request->validate([
                'service_id' => 'required',
                'provider_id' => 'required',
                'user_id' => 'required',
                'invoice_id' => 'required',
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

            $provider->notify(new InvoicePaidNotification($user, $invoice));

            $receiverPhone = $provider->phone;
            $receiverUsername = $provider->username;
            $senderUsername = $user->username;
            $invoiceNumber = $invoice->invoice_number;

            // $smsResponse = $this->serviceBookedSmsNotification($receiverPhone, $senderUsername, $receiverUsername, $invoiceNumber);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'booking' => Booking::with('Escrow', 'Service.User', 'User', 'Invoice')->where('id', $booking->id)->firstOrFail(),
                'escrow' => $escrow,
            ], 200);
            
        } catch (\Throwable $e) {
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

            return response()->json([
                'status' => 'success',
                'message' => 'Booking completed',
                'booking' => Booking::with('Service.User', 'User')->where('id', $booking->id)->firstOrFail(),
            ], 200);
            
        } catch (\Throwable $e) {
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
            $booking = Booking::with('service.user', 'user')->findOrFail($request->booking_id);

            DB::beginTransaction();

            // Update booking status
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

            $provider->increment('balance', $escrow->amount);
            $provider->save();

            DB::commit();

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
}