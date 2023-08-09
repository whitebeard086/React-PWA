<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WithdrawalAccount;
use App\Traits\GatewayTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WithdrawalController extends Controller
{
    use GatewayTrait;

    public function index()
    {
        try {
            $banks = $this->listBanks();

            return response()->json([
                'status' => 'success',
                'banks' => $banks,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function resolve_account_number(Request $request)
    {
        try {
            $response = $this->resolveAccountNumber($request);

            if ($response['response']->status !== true) {
                return response()->json([
                    'status' => 'error',
                    'message' => $response['response']->message,
                    'test' => $response['response']->status,
                ], 400); 
            }

            return response()->json([
                'status' => 'success',
                'response' => $response['response'],
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function create_transfer_recipient(Request $request)
    {
        try {
            $response = $this->createTransferRecipient($request);

            if ($response->status !== true) {
                return response()->json([
                    'status' => 'error',
                    'message' => $response->message,
                    'test' => $response->status,
                ], 400); 
            }

            return response()->json([
                'status' => 'success',
                'response' => $response,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function add_account(Request $request)
    {   
        try {
            $user = User::where('id', auth()->user()->id)->firstOrFail();
            $duplicate_account = WithdrawalAccount::where('recipient_code', $request->recipientCode)->firstOrFail();
            
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'password error',
                    'message' => 'Incorrect password'
                ], 400);
            }
            
            if (isset($duplicate_account)) {
                return response()->json([
                    'status' => 'duplicate error',
                    'message' => 'Account already exists'
                ], 400);
            }

            $account = WithdrawalAccount::create([
                'user_id' => $user->id,
                'bank_name' => $request->bankName,
                'account_number' => $request->accountNumber,
                'account_name' => $request->accountName,
                'recipient_code' => $request->recipientCode,
            ]);

            return response()->json([
                'status' => 'success',
                'Account' => $account
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}