<?php

namespace App\Traits;

use App\Models\Transaction;
use Illuminate\Support\Str;

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

    public function listBanks()
    {
        $curl = curl_init();

        $paystackSecret = env('PAYSTACK_SECRET');

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/bank?currency=NGN",
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

        return [
            'status' => 'success',
            'response' => $res
        ];
    }

    public function resolveAccountNumber($request)
    {
        $curl = curl_init();

        $paystackSecret = env('PAYSTACK_SECRET');
        $accountNumber = $request->accountNumber;
        $bankCode = $request->bankCode;
  
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/bank/resolve?account_number=$accountNumber&bank_code=$bankCode",
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

        return [
            'status' => 'success',
            'response' => $res
        ];
    }

    public function createTransferRecipient($request)
    {
        $url = "https://api.paystack.co/transferrecipient";
        $paystackSecret = env('PAYSTACK_SECRET');

        $fields = [
            'type' => "nuban",
            'name' => $request->accountName,
            'account_number' => $request->accountNumber,
            'bank_code' => $request->bankCode,
            'currency' => "NGN"
        ];

        $fields_string = http_build_query($fields);

        //open connection
        $ch = curl_init();
        
        //set the url, number of POST vars, POST data
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_POST, true);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Authorization: Bearer $paystackSecret",
            "Cache-Control: no-cache",
        ));

        //So that curl_exec returns the contents of the cURL; rather than echoing it
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 
        
        //execute post
        $result = json_decode(curl_exec($ch));

        if(curl_errno($ch)){
            return [
                'status' => 'error',
                'message' => throw new \Exception(curl_error($ch))
            ];
        }

        //close connection
        curl_close($ch);

        return $result;    
    }

    public function deleteTransferRecipient($account)
    {
        $curl = curl_init();

        $paystackSecret = env('PAYSTACK_SECRET');
        $recipientCode = $account->recipient_code;
  
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/transferrecipient/$recipientCode",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "DELETE",
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

        return [
            'status' => 'success',
            'response' => $res
        ];
    }

    public function payoutCustomer($request)
    {
        try {
            $uuid = Str::uuid();
            
            $url = "https://api.paystack.co/transfer";
            $paystackSecret = env('PAYSTACK_SECRET');

            $requestData = [
                'source' => 'balance',
                'amount' => $request->amount,
                'reference' => $uuid,
                'recipient' => $request->recipientCode,
                'reason' => "Taskitly Withdrawal"
            ];

            $headers = [
                "Authorization: Bearer $paystackSecret",
                "Cache-Control: no-cache",
            ];

            $ch = curl_init();

            curl_setopt_array($ch, [
                CURLOPT_URL => $url,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => http_build_query($requestData),
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_RETURNTRANSFER => true,
            ]);

            $response = curl_exec($ch);
            
            if (curl_errno($ch)) {
                throw new \Exception(curl_error($ch));
            }

            curl_close($ch);

            $responseData = json_decode($response, true);

            if (isset($responseData['status']) && $responseData['status'] === false) {
                throw new \Exception($responseData['message'] ?? 'An error occurred during transfer.');
            }

            return $responseData;
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        }
    }
}