<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Escrow;
use App\Models\Booking;
use App\Models\Invoice;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function book_service(Request $request)
    {
        try {
            $bookingData = $request->validate([
                'service_id' => 'required',
                'provider_id' => 'required',
                'user_id' => 'required',
                'invoice_id' => 'required',
            ]);

            $booking = Booking::create($bookingData);

            $escrow = new Escrow;
            $escrow->service_id = $booking->service_id;
            $escrow->user_id = $booking->user_id;
            $escrow->booking_id = $booking->id;
            $escrow->amount = $request->amount;
            $escrow->save();

            $user = User::findOrFail($booking->user_id);
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

            return response()->json([
                'status' => 'success',
                'booking' => Booking::with('Escrow', 'Service.User', 'User', 'Invoice')->where('id', $booking->id)->firstOrFail(),
                'escrow' => $escrow,
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}