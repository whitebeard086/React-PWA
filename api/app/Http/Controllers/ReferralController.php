<?php

namespace App\Http\Controllers;

use App\Models\Referral;
use Illuminate\Http\Request;

class ReferralController extends Controller
{
    public function getReferrals()
    {
        $userId = auth()->user()->id;

        $referrals = Referral::with(['referred'])
            ->where('referrer_id', $userId)
            ->get();

        return response()->json([
            'referrals' => $referrals,
        ]);
    }
}
