<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\BillsTrait;
use App\Models\Transaction;
use Illuminate\Http\Request;

class BillsController extends Controller
{
    use BillsTrait;
    
    public function get_operators()
    {
        try {
            $operators = $this->getOperators();

            if ($operators === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch operators',
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'operators' => $operators,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function get_products(Request $request)
    {
        try {
            $products = $this->getProducts($request);

            if ($products === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch products',
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'products' => $products,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function buy_airtime(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();
            
            $response = $this->buyAirtime($request);

            if ($response['success'] === true) {
                $data = $response['data'];

                $user->decrement('balance', $data['amount'] / 100);
                
                $txn = new Transaction;
                $txn->user_id = $user->id;
                $txn->reference = $data['reference'];
                $txn->amount = $data['amount'] / 100;
                $txn->type = $data['meta_data']['operator_name'] . ' Airtime';
                $txn->final_amount = $data['amount'] / 100;
                $txn->method = 'transfer';
                $txn->status = 'Success';
                $txn->save();
                
                return response()->json([
                    'status' => 'success',
                    'data' => $data,
                ]);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}