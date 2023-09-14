<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Collection;
use Illuminate\Http\Request;
use App\Jobs\ProcessTransaction;
use Illuminate\Support\Facades\Log;

class BlocWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // Get the signature from the request headers
        $signature = $request->header('X-Bloc-Webhook');

        // Compute the hash
        $computedSignature = hash_hmac('sha256', $request->getContent(), env('BLOC_WEBHOOK_SECRET_KEY'));

        // Compare the signature with the computed hash
        if ($signature !== $computedSignature) {
            // The request is not authentic
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // Parse the request's body as an object
        $event = json_decode($request->getContent());

        // Log the entire request
        Log::info('Webhook received', ['request' => $request->all()]);

        switch ($event->event) {
            case 'transaction.new':
                // Get the user whose collection_id matches the account_id in the response
                $user = User::where('collection_id', $event->data->account_id)->first();
    
                // Update the user's balance
                if ($user
                    && $event->data->drcr === 'CR' 
                    && $event->data->reversal === false 
                    && $event->data->status === 'successful' 
                    && $event->data->source === 'Account' 
                    && $event->data->payment_method === 'Collection Account') 
                {
                    $prepped = $event->data->amount / 100;
                    $user->increment('balance', $prepped);
                }
                break;
    
            case 'transaction.update':
                // Get the user whose collection_id matches the account_id in the response
                $user = User::where('collection_id', $event->data->account_id)->first();
            
                // Check if all conditions are met
                if ($user
                    && $event->data->drcr === 'CR' 
                    && $event->data->reversal === false 
                    && $event->data->status === 'successful' 
                    && $event->data->source === 'Account' 
                    && $event->data->payment_method === 'Collection Account') 
                {
                    // Update the user's balance
                    $prepped = $event->data->amount / 100;
                    $user->increment('balance', $prepped);
                }
                break;
            // Add more cases as needed...
    
            // case 'transaction.new':
            // case 'transaction.update':
            //     // Dispatch the job to process the transaction
            //     ProcessTransaction::dispatch($event);
            //     break;

            case 'accounts.collection.created':
                try {
                    // Get the data from the event.
                    $data = $event->data;

                    // Create a new record in the webhook_data table.
                    $collectionData = new Collection;
                    $collectionData->webhook_id = $data['id'];
                    $collectionData->name = $data['name'];
                    $collectionData->bank_name = $data['bank_name'];
                    $collectionData->created_at = $data['created_at'];
                    $collectionData->environment = $data['environment'];
                    $collectionData->account_number = $data['account_number'];
                    $collectionData->preferred_bank = $data['preferred_bank'];
                    $collectionData->save();
                    
                    break;
                } catch (\Exception $e) {
                    Log::error('Failed to process webhook', ['error' => $e->getMessage()]);
                    return response()->json(['message' => 'Failed to process webhook'], 500);
                }
            default:
                // Unknown event type
                return response()->json(['message' => 'Unknown event type'], 400);
        }
    
        // If everything was processed successfully, return a 200 response
        return response()->json(['message' => 'Webhook processed successfully']);
    }
}
