<?php

namespace App\Traits;

use App\Models\SystemConfigurations;

trait SystemTrait
{
    public function calculateServiceCommission($amount)
    {
        $system = SystemConfigurations::where('id', 1)->first();
        
        // Ensure $amount and $percentage are valid numbers
        $percentage = $system->service_commission;
        if (!is_numeric($amount) || !is_numeric($percentage)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Arguments should a number'
            ], 400);
        }

        // Calculate service commission
        $service_commission = ($amount * $percentage) / 100;

        // Calculate the remaining value
        $provider_commission = $amount - $service_commission;

        // Return both values as an associative array
        return [
            'service_commission' => $service_commission,
            'provider_commission' => $provider_commission,
            'commission_rate' => $system->service_commission
        ];
    }

}