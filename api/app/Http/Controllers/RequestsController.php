<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;

class RequestsController extends Controller
{
    public function index()
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $bookingQuery = Booking::with('Service.User', 'User')->where('status', 'ongoing');
            $historyQuery = Booking::with('Service.User', 'User', 'Invoice')->orderBy('id', 'desc');
            
            if ($user->profile_type_id == 1) {
                $bookings = $bookingQuery->where('user_id', $userId)->get();
                $history = $historyQuery->where('user_id', $userId)->get();
            } elseif ($user->profile_type_id == 2) {
                $bookings = $bookingQuery->where('provider_id', $userId)->get();
                $history = $historyQuery->where('provider_id', $userId)->get();
            }

            $enquiries = Chat::with('Messages', 'User.Service', 'Receiver.Service')->where('user_id', $userId)
                ->orWhere('receiver_id', $userId)->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'enquiries' => $enquiries,
                'bookings' => $bookings,
                'history' => $history
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}