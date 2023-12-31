<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;
use App\Models\Dispute;
use Illuminate\Http\Request;
use Vinkla\Hashids\Facades\Hashids;

class RequestsController extends Controller
{
    public function index()
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $bookingQuery = Booking::with('Service.User', 'User')->where('status', 'ongoing');
            $disputeQuery = Dispute::with('Booking.Service.User', 'Booking.User', 'Messages.Media')->orderBy('id', 'desc')->where('status', 'open');
            $historyQuery = Booking::with('Service.User', 'User', 'Invoice')->orderBy('id', 'desc');
            
            if ($user->profile_type_id == 1) {
                $bookings = $bookingQuery->where('user_id', $userId)->get();
                $disputes = $disputeQuery->where('client_id', $userId)->get();
                $history = $historyQuery->where('user_id', $userId)->get();
            } elseif ($user->profile_type_id == 2) {
                $bookings = $bookingQuery->where('provider_id', $userId)->get();
                $disputes = $disputeQuery->where('provider_id', $userId)->get();
                $history = $historyQuery->where('provider_id', $userId)->get();
            }

            $enquiries = Chat::with([
                'Messages',
                'User.Service',
                'Receiver.Service',
                'Booking'
            ])
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                      ->where('status', 'open');
            })
            ->orWhere(function ($query) use ($userId) {
                $query->where('receiver_id', $userId)
                      ->where('status', 'open');
            })
            ->orderBy('id', 'desc')
            ->get();

            return response()->json([
                'status' => 'success',
                'enquiries' => $enquiries,
                'bookings' => $bookings,
                'disputes' => $disputes,
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