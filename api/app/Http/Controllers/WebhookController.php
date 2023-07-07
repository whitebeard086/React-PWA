<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Digikraaft\PaystackWebhooks\Http\Controllers\WebhooksController as PaystackWebhooksController;

class WebhookController extends PaystackWebhooksController
{
    public function handleChargeSuccess($payload)
    {
        Log::info('Payload', ['payload' => $payload]);
        try {
            if ($payload->event = "charge.success") {
                $txn = new Transaction;
                $txn->user_id = auth()->user()->id;
                $txn->reference = $payload->data->reference;
                $txn->amount = $payload->data->amount / 100;
                $txn->type = 'Wallet Topup';
                $txn->charge = 0.00;
                $txn->final_amount = $payload->data->amount;
                $txn->method = 'paystack';
                $txn->status = $payload->data->status;
                $txn->save();

                $user = Auth::user();
                $user->increment('balance', $txn->amount);

                return response()->json([
                    'status' => 'success',
                ],200);
            }
        } catch (\Exception $e) {
            //throw $th;
        }
    }
}