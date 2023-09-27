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

            return response()->json([
                'status' => 'success',
                'systemConfig' => $system,
                'referrals' => $referrals
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