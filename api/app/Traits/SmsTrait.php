<?php

namespace App\Traits;

trait SmsTrait
{
    public function sendNewEnquirySmsNotification($receiverPhone, $senderUsername, $receiverUsername)
    {
        $apiKey = env('TERMII_API_KEY');
        $apiEndpoint = "https://api.ng.termii.com/api/sms/send";

        $data = [
            "api_key" => $apiKey,
            "to" => $receiverPhone,
            "from" => "N-Alert",
            "sms" => "Hi $receiverUsername, You have a new service enquiry from $senderUsername. Please check your requests.",
            "type" => "plain",
            "channel" => "dnd"
        ];

        $post_data = json_encode($data);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
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

    public function newInvoiceSmsNotification($receiverPhone, $senderUsername, $receiverUsername)
    {
        $apiKey = env('TERMII_API_KEY');
        $apiEndpoint = "https://api.ng.termii.com/api/sms/send";

        $data = [
            "api_key" => $apiKey,
            "to" => $receiverPhone,
            "from" => "N-Alert",
            "sms" => "Hi $receiverUsername, You have received a new invoice from $senderUsername. Please check your messages.",
            "type" => "plain",
            "channel" => "dnd"
        ];

        $post_data = json_encode($data);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
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

    public function serviceBookedSmsNotification($receiverPhone, $senderUsername, $receiverUsername, $invoiceNumber)
    {
        $apiKey = env('TERMII_API_KEY');
        $apiEndpoint = "https://api.ng.termii.com/api/sms/send";

        $data = [
            "api_key" => $apiKey,
            "to" => $receiverPhone,
            "from" => "N-Alert",
            "sms" => "Hi $receiverUsername, this is to inform you that $senderUsername has fully paid for invoice #$invoiceNumber. You may resume work.",
            "type" => "plain",
            "channel" => "dnd"
        ];

        $post_data = json_encode($data);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
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

    public function serviceCompletedSmsNotification($receiverPhone, $senderUsername, $receiverUsername)
    {
        $apiKey = env('TERMII_API_KEY');
        $apiEndpoint = "https://api.ng.termii.com/api/sms/send";

        $data = [
            "api_key" => $apiKey,
            "to" => $receiverPhone,
            "from" => "N-Alert",
            "sms" => "Hi $receiverUsername, this is to inform you that $senderUsername has completed the service. Please inspect the work and confirm if you are satisfied.",
            "type" => "plain",
            "channel" => "dnd"
        ];

        $post_data = json_encode($data);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
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

    public function serviceConfirmedSmsNotification($receiverPhone, $senderUsername, $receiverUsername)
    {
        $apiKey = env('TERMII_API_KEY');
        $apiEndpoint = "https://api.ng.termii.com/api/sms/send";

        $data = [
            "api_key" => $apiKey,
            "to" => $receiverPhone,
            "from" => "N-Alert",
            "sms" => "Hi $receiverUsername, $senderUsername has confirmed the completion of the service. We have released the payment to your Taskitly account.",
            "type" => "plain",
            "channel" => "dnd"
        ];

        $post_data = json_encode($data);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
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