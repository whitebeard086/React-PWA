<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $allBookings = Booking::where('provider_id', $userId);
            $bookings = Booking::orderBy('id', 'desc')->with('Service.User', 'User', 'Service.Category')->where('status', 'ongoing')->where('provider_id', $userId)->get();
            $enquiries = Chat::with('Messages', 'User.Service', 'Receiver.Service')->where('receiver_id', $userId)->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'enquiries' => $enquiries,
                'bookings' => $bookings,
                'bookingsCount' => $allBookings->count(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}