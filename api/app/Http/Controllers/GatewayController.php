<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GatewayController extends Controller
{
    public function paystackDeposit(Request $request)
    {
        $formFields = $request->validate([
            'user_id' => 'nullable',
            'reference' => 'nullable',
            'amount' => 'nullable',
            'type' => 'nullable',
            'charge' => 'nullable',
            'final_amount' => 'nullable',
            'method' => 'nullable',
            'status' => 'nullable',
        ]);

        $formFields['user_id'] = auth()->user()->id;
        $formFields['type'] = 'deposit';
        $formFields['method'] = 'paystack';

        $txn = Transaction::create($formFields);

        $txn->final_amount = ($txn->amount + $txn->charge) / 100;
        $txn->amount = $txn->amount / 100;
        $txn->charge = $txn->charge / 100;
        $txn->status = 'pending';
        $txn->save();

        return response()->json([
            'status' => 'success',
            'transaction' => $txn,
            'latest transaction' => Transaction::latest()->where('user_id', auth()->user()->id)->where('status', 'pending')->first(),
        ]);
    }

    public function verifyPaystackPayment()
    {
        $txn = Transaction::latest()->where('user_id', auth()->user()->id)->where('status', 'pending')->first();
        
        $curl = curl_init();
  
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.paystack.co/transaction/verify/'.$txn->reference,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer '.env('PAYSTACK_SECRET_KEY'),
                'Cache-Control: no-cache',
            ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        
        if ($err) {
            // echo "cURL Error #:" . $err;
            return response()->json($err);
        } else {
            // echo $response;
            $res = json_decode($response);
        }

        $user = Auth::user();

        if($res->data->status === 'success') {
            $txn->status = 'Success';
            
            $user->increment('balance', $txn->final_amount);
        } elseif($res->data->gateway_response === 'Declined') {
            $txn->status = 'Declined';
        } else {
            $txn->status = 'Failed';
        }
        
        $txn->save();

        return response()->json($res);
    }
}