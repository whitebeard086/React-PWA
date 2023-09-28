<?php

namespace App\Http\Controllers;

use App\Models\Referral;
use App\Models\SystemConfigurations;
use Illuminate\Http\Request;

class ReferralController extends Controller
{
    public function getReferrals()
    {
        $userId = auth()->user()->id;
        // $system = SystemConfigurations::where('id', 1)->first();

        $referrals = Referral::with(['referred'])
            ->where('referrer_id', $userId)
            ->get();

        return response()->json([
            'referrals' => $referrals,
            // 'systemConfig' => $system
        ]);
    }

    public function system_config()
    {
        $system = SystemConfigurations::where('id', 1)->first();
        
        return response()->json([
            'systemConfig' => $system
        ]);
    }
}