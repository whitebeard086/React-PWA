<?php

namespace App\Traits;

trait GatewayTrait
{
    public function assignVirtualAccount($user)
    {
        $curl = curl_init();
        $data = array(
            "email" => $user->email,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "phone" => $user->phone,
            "preferred_bank" => "test-bank",
            "country" => "NG"
        );

        $post_data = json_encode($data);

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/dedicated_account/assign",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer ".env('PAYSTACK_SECRET'),
                "Content-Type: application/json"
            ),
        ));

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

    public function updateDedicatedAccount($user)
    {
        $curl = curl_init();

        $userEmail = $user->email;
        $paystackSecret = env('PAYSTACK_SECRET');

        $apiUrl = "https://api.paystack.co/customer/$userEmail";

        curl_setopt_array($curl, array(
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer $paystackSecret",
                "Cache-Control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return [
                'status' => 'error',
                'message' => 'cURL Error: ' . $err
            ];
        }

        $res = json_decode($response);

        if ($res && isset($res->data->dedicated_account->account_number)) {
            $user->bank = $res->data->dedicated_account->bank->name;
            $user->virtual_acc = $res->data->dedicated_account->account_number;
            $user->save();

            return [
                'status' => 'success',
                'message' => 'User bank and virtual account updated successfully.'
            ];
        } else {
            return [
                'status' => 'error',
                'message' => $res
            ];
        }
    }

    public function getCustomerTransactions($user)
    {
        $curl = curl_init();

        $userEmail = $user->email;
        $paystackSecret = env('PAYSTACK_SECRET');

        $apiUrl = "https://api.paystack.co/customer/$userEmail";

        curl_setopt_array($curl, array(
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer $paystackSecret",
                "Cache-Control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return [
                'status' => 'error',
                'message' => 'cURL Error: ' . $err
            ];
        }

        $res = json_decode($response);

        if ($res && isset($res->data->dedicated_account->account_number)) {

            return [
                'status' => 'success',
                'response' => $res
            ];
        } else {
            return [
                'status' => 'error',
                'message' => $res
            ];
        }
    }
}