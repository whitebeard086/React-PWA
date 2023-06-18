<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentsController extends Controller
{
    public function index()
    {
        $paystack_txns = Transaction::where('user_id', auth()->user()->id)->where('status', 'pending')->get();

        if(isset($paystack_txns)) {
            foreach ($paystack_txns as $txn) {
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
                        'Authorization: Bearer '.env('PAYSTACK_SECRET_KEY', 'sk_test_c15ca925d91155218193dee6640e95abb2b32af6'),
                        'Cache-Control: no-cache',
                    ),
                ));

                $response = curl_exec($curl);
                $err = curl_error($curl);

                curl_close($curl);
                
                if ($err) {
                    echo "cURL Error #:" . $err;
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

                // return response()->json($res);
            }
        }

        $txns = Transaction::orderBy('id', 'desc')->where('user_id', auth()->user()->id)->get();

        return response()->json([
            'status' => 'success',
            'transactions' => $txns,
        ], 200);
    }
}