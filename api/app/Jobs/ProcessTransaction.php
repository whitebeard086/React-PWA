<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ProcessTransaction implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;  // The job will be attempted only once

    protected $event;

    /**
     * Create a new job instance.
     */
    public function __construct($event)
    {
        $this->event = $event;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $user = User::where('collection_id', $this->event->data->account_id)->first();

        // Check if all conditions are met
        if ($user 
            && $this->event->data->drcr === 'CR' 
            && $this->event->data->reversal === false 
            && $this->event->data->status === 'successful' 
            && $this->event->data->source === 'Account' 
            && $this->event->data->payment_method === 'Collection Account') 
        {
            // Update the user's balance
            $prepped = $this->event->data->amount / 100;
            $user->increment('balance', $prepped);
        }
    }

    /**
     * The unique ID of the job.
     *
     * @return string
     */
    public function uniqueId()
    {
        return $this->event->data->transaction_id;
    }
}
