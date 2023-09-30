<?php

namespace App\Http\Controllers\Admin;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FinanceController extends Controller
{
    public function system_commissions()
    {
        try {
            $service_commissions = Booking::with(['Service.User', 'User', 'Invoice'])->where('status', 'completed')->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'serviceCommissions' => $service_commissions,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}