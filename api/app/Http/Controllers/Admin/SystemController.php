<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\SystemConfigurations;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function system_config()
    {
        try {
            $system = SystemConfigurations::where('id', 1)->first();
            $referrals = Referral::with('referrer', 'referred')->orderBy('id', 'desc')->get();
            $latestReferrals = Referral::with('referrer', 'referred')->orderBy('id', 'desc')->take(5)->get();

            return response()->json([
                'status' => 'success',
                'systemConfig' => $system,
                'referrals' => $referrals,
                'latestReferrals' => $latestReferrals,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function update(Request $request)
    {
        try {
            $system = SystemConfigurations::where('id', 1)->first();

            if ($request->bonus) {
                $system->referral_bonus = $request->bonus;
            }
            if ($request->pitch) {
                $system->referral_pitch = $request->pitch;
            }
            if ($request->commission) {
                $system->service_commission = $request->commission;
            }
            if ($request->airtimeDiscount) {
                $system->airtime_discount = $request->airtimeDiscount;
            }
            if ($request->dataDiscount) {
                $system->data_discount = $request->dataDiscount;
            }
            if ($request->zeroAirtime) {
                $system->airtime_discount = 0.00;
            }
            if ($request->zeroData) {
                $system->data_discount = 0.00;
            }
            if ($request->zeroCommission) {
                $system->service_commission = 0.00;
            }
            
            $system->save();

            return response()->json([
                'status' => 'success',
                'systemConfig' => $system
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}