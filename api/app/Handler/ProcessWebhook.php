<?php
namespace App\Handler;
use App\Models\User;
use App\Models\Transaction;
use \Spatie\WebhookClient\Jobs\ProcessWebhookJob;

//The class extends "ProcessWebhookJob" class as that is the class //that will handle the job of processing our webhook before we have //access to it.
class ProcessWebhook extends ProcessWebhookJob
{
    public function handle()
    {
        $data = json_decode($this->webhookCall, true);
        //Do something with the event
        $payload = $data['payload'];
        
        try {
            if ($payload['event'] = "charge.success") {
                $user = User::where('email', $payload['data']['customer']['email'])->firstOrFail();
                
                $txn = new Transaction;
                $txn->user_id = $user->id;
                $txn->reference = $payload['data']['reference'];
                $txn->amount = $payload['data']['amount'] / 100;
                $txn->type = 'Wallet Topup';
                $txn->charge = 0.00;
                $txn->final_amount = $payload['data']['amount'] / 100;
                $txn->method = 'dedicated account';
                $txn->status = 'Success';
                $txn->save();

                $user->increment('balance', $txn->amount);

                return response()->json([
                    'status' => 'success',
                ],200);
            }
        } catch (\Exception $e) {
            logger($e->getMessage());
        }
        http_response_code(200); //Acknowledge you received the response
    }
}