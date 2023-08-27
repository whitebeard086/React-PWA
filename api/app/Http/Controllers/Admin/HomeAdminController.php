<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;

class HomeAdminController extends Controller
{
    public function index()
    {
        try {
            $all_bookings = Booking::count();
            $all_clients = User::where('profile_type_id', 1)->where('username', '!=', 'escrow')->count();
            $all_providers = User::where('profile_type_id', 2)->count();
            $recent_providers = User::with('Bookings', 'Service.Bookings')->where('profile_type_id', 2)->orderBy('id', 'desc')->take(5)->get();
            $recent_customers = User::where('profile_type_id', 1)->where('username', '!=', 'escrow')->orderBy('id', 'desc')->take(5)->get();
            $recent_bookings = Booking::with('Invoice')->orderBy('id', 'desc')->take(5)->get();

            return response()->json([
                'status' => 'success',
                'allBookings' => $all_bookings,
                'allClients' => $all_clients,
                'allProviders' => $all_providers,
                'recentProviders' => $recent_providers,
                'recentCustomers' => $recent_customers,
                'recentBookings' => $recent_bookings,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}