<?php

namespace App\Services;

class SMSService
{
   public function sendSMS($phone, $username, $message)
   {
      $curl = curl_init();
      $data = array(
         "api_key" => env('TERMII_API_KEY'), 
         "to" => $phone,  
         "from" => "N-Alert",
         "sms" => $message,  
         "type" => "plain",  
         "channel" => "dnd" 
      );

      $post_data = json_encode($data);

      curl_setopt_array($curl, array(
         CURLOPT_URL => "https://api.ng.termii.com/api/sms/send",
         CURLOPT_RETURNTRANSFER => true,
         CURLOPT_ENCODING => "",
         CURLOPT_MAXREDIRS => 10,
         CURLOPT_TIMEOUT => 0,
         CURLOPT_FOLLOWLOCATION => true,
         CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
         CURLOPT_CUSTOMREQUEST => "POST",
         CURLOPT_POSTFIELDS => $post_data,
         CURLOPT_HTTPHEADER => array(
            "Content-Type: application/json"
         ),
      ));

      $response = curl_exec($curl);
      $err = curl_error($curl);

      curl_close($curl);

      if ($err) {
         echo "cURL Error #:" . $err;
      } else {
         return json_decode($response);
      }
   }
}