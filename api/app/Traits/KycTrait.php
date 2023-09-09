<?php
   
namespace App\Traits;
   
trait KycTrait
{
   public function checkKycTier($user, $amount)
   {
      if ($user->kyc_tier === "0") {
         return response()->json([
            'status' => 'Upgrade your account',
            'message' => 'You cannot make any transactions until you complete your account verification.'
         ], 422);
      }
   
      if ($user->kyc_tier === "1" && $amount > 3000) {
         return response()->json([
            'status' => 'Upgrade your account',
            'message' => 'You cannot make a single transaction above NGN3,0000.'
         ], 405);
      }
   
      if ($user->kyc_tier === "2" && $amount > 10000) {
         return response()->json([
            'status' => 'Upgrade your account',
            'message' => 'You cannot make a single transaction above NGN10,0000'
         ], 405);
      }
   
      if ($user->kyc_tier === "3" && $amount > 1000000) {
         return response()->json([
            'status' => 'Upgrade your account',
            'message' => 'You cannot make a single transaction above NGN1,000,0000.'
         ], 405);
      }
   
      return null;
   }
}
