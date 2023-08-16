<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

trait BillsTrait
{
    public function getOperators()
    {
        $blocSecret = env('BLOC_SECRET_KEY');

        try {
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'authorization' => "Bearer $blocSecret",
            ])->get('https://api.blochq.io/v1/bills/operators?bill=telco');

            if ($response->successful()) {
                $data = $response->json();
                return $data;
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}