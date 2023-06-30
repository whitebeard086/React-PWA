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
            $user = User::where('id', auth()->user()->id)->firstOrFail();

            if ($user->profile_type_id == 1) {
                $bookings = Booking::with('Service.User', 'User')
                                    ->where('user_id', $user->id)
                                    ->where('status', 'ongoing')
                                    ->get();
            } elseif ($user->profile_type_id == 2) {
                $bookings = Booking::with('Service.User', 'User')
                                    ->where('provider_id', $user->id)
                                    ->where('status', 'ongoing')
                                    ->get();
            }
            
            $enquiries = Chat::with('Messages', 'User.Service', 'Receiver.Service')->where('user_id', auth()->user()->id)
                                            ->orWhere('receiver_id', auth()->user()->id)->get();
        
            return response()->json([
                'status' => 'success',
                'enquiries' => $enquiries,
                'bookings' => $bookings,
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}