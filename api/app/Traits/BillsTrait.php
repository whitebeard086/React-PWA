<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

trait BillsTrait
{
    public function getOperators($operator)
    {
        $blocSecret = env('BLOC_SECRET_KEY');

        // supports "electricity", "television", "telco"
        try {
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'authorization' => "Bearer $blocSecret",
            ])->get("https://api.blochq.io/v1/bills/operators?bill=$operator");

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

    public function getProducts($data)
    {
        $blocSecret = env('BLOC_SECRET_KEY');
        $category = $data->category;

        try {
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'authorization' => "Bearer $blocSecret",
            ])->get("https://api.blochq.io/v1/bills/operators/$category/products?bill=telco");

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

    public function verifyCustomer($operatorID, $meter_type, $bill, $device_number)
    {
        $blocSecret = env('BLOC_SECRET_KEY');
        $accessToken = "Bearer $blocSecret";

        // If meter_type is not null, include it in the endpoint URL
        $meter_type_parameter = $meter_type !== null ? "meter_type=$meter_type&" : "";
        
        $response = Http::withHeaders([
            'accept' => 'application/json',
            'authorization' => $accessToken,
        ])->get("https://api.blochq.io/v1/bills/customer/validate/$operatorID?$meter_type_parameter" . "bill=$bill&device_number=$device_number");

        return $response->json();
    }

    public function getOperatorProducts($operatorID, $bill)
    {
        $blocSecret = env('BLOC_SECRET_KEY');
        
        // supports electricity, television, telco

        try {
            $response = Http::withHeaders([
                'accept' => 'application/json',
                'authorization' => "Bearer $blocSecret",
            ])->get("https://api.blochq.io/v1/bills/operators/$operatorID/products?bill=$bill");

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

    public function buyAirtime($data)
    {
        $curl = curl_init();
        $url = "https://api.blochq.io/v1/bills/payment?bill=telco";
        $blocSecret = env('BLOC_SECRET_KEY');

        $fields = [
            'device_details' => ['beneficiary_msisdn' => $data->phone],
            'amount' => $data->amount * 100,
            'operator_id' => $data->operator,
            'product_id' => $data->product
        ];

        $post_data = json_encode($fields);

        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => [
                "accept: application/json",
                "authorization: Bearer sk_test_64d91c85651453c535f710f264d91c85651453c535f710f3",
                "content-type: application/json"
            ],
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $curlError = curl_error($curl);

        curl_close($curl);
        
        if ($curlError) {
            return [
                'status' => 'error',
                'message' => 'cURL Error: ' . $curlError
            ];
        }

        if ($httpCode !== 200) {
            return [
                'status' => 'error',
                'message' => 'API request failed with HTTP code: ' . $httpCode
            ];
        }

        return json_decode($response, true);
    }
}