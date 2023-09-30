<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use App\Traits\GatewayTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentsController extends Controller
{
    use GatewayTrait;
    
    public function index()
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();
        
        try {
            $txns = Transaction::orderBy('id', 'desc')->where('user_id', auth()->user()->id)->get();

            $response = $this->getCustomerTransactions($user);

            return response()->json([
                'status' => 'success',
                'transactions' => $txns,
                'response' => $response
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function get_transaction($slug)
    {
        $transaction = Transaction::where('uid', $slug)->first(); 

        return response()->json([
            'status' => 'success',
            'transaction' => $transaction,
        ], 200);
    }
}