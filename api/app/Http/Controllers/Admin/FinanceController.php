<?php

namespace App\Http\Controllers\Admin;

use App\Models\Booking;
use App\Models\Referral;
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

    public function referral_rewards()
    {
        try {
            $referrals = Referral::with('referrer', 'referred')->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'referrals' => $referrals,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}