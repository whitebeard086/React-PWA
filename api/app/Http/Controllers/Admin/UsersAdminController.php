<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersAdminController extends Controller
{
    public function index()
    {
        try {
            $all_clients = User::with('Bookings')->where('profile_type_id', 1)->where('username', '!=', 'escrow')->get();
            $all_providers = User::with('Service.Category', 'Service.Bookings')->where('profile_type_id', 2)->get();

            return response()->json([
                'status' => 'success',
                'allClients' => $all_clients,
                'allProviders' => $all_providers,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}