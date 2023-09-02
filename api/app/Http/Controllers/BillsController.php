<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\BillsTrait;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BillsController extends Controller
{
    use BillsTrait;
    
    public function get_operators()
    {
        try {
            $operators = $this->getOperators('telco');

            if ($operators === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch operators',
                ], 500);
            }

            // Filter out Smile and Visaphone
            $filteredOperators = array_filter($operators['data'], function ($item) {
                return $item['name'] !== 'Smile' && $item['name'] !== 'Visafone';
            });

            return response()->json([
                'status' => 'success',
                'operators' => $operators,
                'data' => array_values($filteredOperators),
                'message' =>$operators['message'],
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

            // Get all data products
            $fixedProducts = array_filter($products['data'], function ($product) {
                return $product['fee_type'] === 'FIXED';
            });

            return response()->json([
                'status' => 'success',
                'products' => $products,
                'data' => array_values($fixedProducts),
                'message' =>$products['message'],
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function get_bill_operators($bill)
    {
        try {
            $operators = $this->getOperators($bill);

            if ($operators === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch operators',
                ], 500);
            }

            // Filter out Smile and Visaphone
            $filteredOperators = array_filter($operators['data'], function ($item) {
                return $item['name'] !== 'Smile' && $item['name'] !== 'Visafone';
            });

            return response()->json([
                'status' => 'success',
                'operators' => $operators,
                'data' => array_values($filteredOperators),
                'message' =>$operators['message'],
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function get_operator_products(Request $request)
    {
        $formFields = $request->validate([
            'operatorID' => 'required|string',
            'bill' => 'required|string',
        ]);
        $operatorID = $formFields['operatorID'];
        $bill = $formFields['bill'];

        try {
            $products = $this->getOperatorProducts($operatorID, $bill);

            if ($products === null) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to fetch products',
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'products' => $products,
                'message' =>$products['message'],
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function verify_customer(Request $request)
    {
        $formFields = $request->validate([
            'operatorID' => 'required|string',
            'bill' => 'required|string',
            // 'meter_type' => 'nullable|string',
            'device_number' => 'required|string',
        ]);
        $operatorID = $formFields['operatorID'];
        $bill = $formFields['bill'];
        // $meter_type = $formFields['meter_type'];
        $meter_type = $request->input('meter_type');
        $device_number = $formFields['device_number'];

        try {
            $customer = $this->verifyCustomer($operatorID, $meter_type, $bill, $device_number);

            if ($customer['success'] == false) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to verify customer',
                ], 500);
            }

            return response()->json([
                'status' => 'success',
                'customer' => $customer,
                'message' =>$customer['message'],
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

            if (!Hash::check($request->pin, $user->transaction_pin)) {
                return response()->json([
                    'status' => 'pin error',
                    'message' => 'Incorrect pin'
                ], 400);
            }
            
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
    
    public function buy_bundle(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();

            if (!Hash::check($request->pin, $user->transaction_pin)) {
                return response()->json([
                    'status' => 'pin error',
                    'message' => 'Incorrect pin'
                ], 400);
            }
            
            $response = $this->buyAirtime($request);

            if ($response['success'] === true) {
                $data = $response['data'];

                $user->decrement('balance', $data['amount'] / 100);
                
                $txn = new Transaction;
                $txn->user_id = $user->id;
                $txn->reference = $data['reference'];
                $txn->amount = $data['amount'] / 100;
                $txn->type = $data['meta_data']['operator_name'];
                // $txn->type = $data['meta_data']['operator_name'] . ' Data';
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
                'status' => 'failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}