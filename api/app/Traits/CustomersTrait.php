<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

trait CustomersTrait
{
   public function createCustomer($data)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
         'content-type' => 'application/json',
      ])->post('https://api.blochq.io/v1/customers', $data);

      return $response->json();

      // if ($response->successful()) {
      //    return $response->json();
      // } else {
      //    return [
      //       'status' => 'error',
      //       'message' => 'Failed to create customer.',
      //       'response' => $response->json(),
      //    ];
      // }
   }

   public function upgradeCustomerToKYCT1($user)
   {
      if ($this->checkKYCT1Requirements($user)) {
         $customerId = $user->customer_id;

         $blocSecret = env('BLOC_SECRET_KEY');
         $accessToken = "Bearer $blocSecret";
         
         $data = [
            'address' => [
               'street' => $user->address->street,
               'city' => $user->address->city,
               'state' => $user->address->state,
               'country' => $user->address->country,
               'postal_code' => $user->address->postal_code,
            ],
            'place_of_birth' => $user->place_of_birth,
            'dob' => $user->dob,
            'gender' => $user->gender,
            'country' => $user->address->country,
            'image' => "https://s3.eu-central-1.wasabisys.com/taskitly/$user->image",
         ];

         $response = Http::withHeaders([
            'accept' => 'application/json',
            'authorization' => $accessToken,
            'content-type' => 'application/json',
         ])->put("https://api.blochq.io/v1/customers/upgrade/t1/$customerId", $data);

         return $response->json();
      }
   }

   public function createCustomerIfConditionsMet($user)
   {
      if (!$user->customer_id && $user->email && $user->phone && $user->first_name && $user->last_name && $user->bvn) {
         $data = [
            'email' => $user->email,
            'phone_number' => $user->phone,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'customer_type' => 'Personal',
            'bvn' => $user->bvn,
         ];

         return $this->createCustomer($data);
      }

      return null;
   }

   public function createAccount($customerID)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $data = [
         'customer_id' => $customerID,
         'preferred_bank' => 'Banc Corp',
      ];

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
         'content-type' => 'application/json',
      ])->post('https://api.blochq.io/v1/accounts', $data);

      if ($response->successful()) {
         return $response->json();
      } else {
         return [
            'status' => 'error',
            'message' => 'Failed to create virtual account.',
            'response' => $response->json(),
         ];
      }
   }

   public function createWallet($customerID)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $data = [
         'customer_id' => $customerID,
         'preferred_bank' => 'Banc Corp',
         'alias' => 'Business',
      ];

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
         'content-type' => 'application/json',
      ])->post('https://api.blochq.io/v1/wallets', $data);

      if ($response->successful()) {
         return $response->json();
      } else {
         return [
            'status' => 'error',
            'message' => 'Failed to create wallet.',
            'response' => $response->json(),
         ];
      }
   }

   public function getWallet($walletID)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
      ])->get("https://api.blochq.io/v1/wallets/$walletID");

      return $response->json();
      // if ($response->successful()) {
      //    return $response->json();
      // } else {
      //    return [
      //       'status' => 'error',
      //       'response' => $response->json(),
      //    ];
      // }
   }

   public function getAccount($accountID)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
      ])->get("https://api.blochq.io/v1/accounts/$accountID");

      return $response->json();
      // if ($response->successful()) {
      //    return $response->json();
      // } else {
      //    return [
      //       'status' => 'error',
      //       'response' => $response->json(),
      //    ];
      // }
   }

   public function simulateCredit($data)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $response = Http::withHeaders([
         'accept' => 'application/json',
         'authorization' => $accessToken,
         'content-type' => 'application/json',
      ])->post('https://api.blochq.io/v1/accounts/credit/manual', $data);

      return $response->json();
   }

   public function createColectionAccount($user)
   {
      $blocSecret = env('BLOC_SECRET_KEY');
      $accessToken = "Bearer $blocSecret";

      $data = [
         'alias' => $user->first_name.' '.$user->last_name,
      ];

      try {
         $response = Http::withHeaders([
            'accept' => 'application/json',
            'authorization' => $accessToken,
            'content-type' => 'application/json',
            ])->post("https://api.blochq.io/v1/accounts/collections", $data);
    
            return $response->json();
        } catch (\Exception $e) {
            return [
               'success' => false,
               'message' => 'Unable to process the request at this time. Please try again later.',
            ];
        }
   }

   protected function checkKYCT1Requirements($user)
   {
      // Check if the user has the necessary data for KYC T1
      return (
         $user->kyc_tier === "0" &&
         $user->address &&
         ($user->address->street ?? false) &&
         ($user->address->city ?? false) &&
         ($user->address->state ?? false) &&
         ($user->address->country ?? false) &&
         ($user->address->postal_code ?? false) &&
         $user->place_of_birth &&
         $user->dob &&
         $user->gender &&
         $user->image
      );
   }
}