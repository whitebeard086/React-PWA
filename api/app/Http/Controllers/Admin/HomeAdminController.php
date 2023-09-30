<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Dispute;
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
            $recent_bookings = Booking::with('Invoice.Items', 'User', 'Service.User')->orderBy('id', 'desc')->take(5)->get();
            $recent_disputes = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->orderBy('id', 'desc')->take(5)->get();

            $bookings = Booking::where('status', 'completed')->get();
            $total_revenue = $bookings->sum('service_commission');

            return response()->json([
                'status' => 'success',
                'allBookings' => $all_bookings,
                'allClients' => $all_clients,
                'allProviders' => $all_providers,
                'totalRevenue' => $total_revenue,
                'recentProviders' => $recent_providers,
                'recentCustomers' => $recent_customers,
                'recentBookings' => $recent_bookings,
                'recentDisputes' => $recent_disputes,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}