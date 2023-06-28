<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Escrow;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function book_service(Request $request)
    {
        try {
            $bookingData = $request->validate([
                'service_id' => 'required',
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
            
            $user->decrement('balance', $escrow->amount);
            $escrowAccount->increment('balance', $escrow->amount);

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