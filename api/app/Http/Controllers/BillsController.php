<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\BillsTrait;
use App\Traits\KycTrait;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class BillsController extends Controller
{
    use BillsTrait;
    use KycTrait;
    
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

    public function pay_bill(Request $request)
    {
        $formFields = $request->validate([
            'operatorID' => 'required|string',
            'productID' => 'required|string',
            'bill' => 'required|string',
            'device_number' => 'required|string',
            'amount' => 'required|string',
        ]);

        $user = User::where('id', auth()->user()->id)->first();

        $kycResponse = $this->checkKycTier($user, $request->amount);
        if ($kycResponse !== null) {
            return $kycResponse;
        }
        
        if (!Hash::check($request->pin, $user->transaction_pin)) {
            return response()->json([
                'status' => 'pin error',
                'message' => 'Incorrect pin'
            ], 400);
        }

        $message = '';
        $statusCode = 200;
        $billResponse = null;

        $operator_id = $formFields['operatorID'];
        $product_id = $formFields['productID'];
        $bill = $formFields['bill'];
        $device_number = $formFields['device_number'];
        $meter_type = $request->input('meter_type');
        $amount = $formFields['amount'] * 100;
        $account_id = $user->account_id;

        $electricity =[
            'device_details' => [
                'device_number' => $device_number,
                'meter_type' => $meter_type,
            ],
            'amount' => $amount,
            'product_id' => $product_id,
            'operator_id' => $operator_id,
            'account_id' => $account_id,
        ];

        $television =[
            'device_details' => [
                'device_number' => $device_number,
            ],
            'amount' => $amount,
            'product_id' => $product_id,
            'operator_id' => $operator_id,
            'account_id' => $account_id,
        ];

        $telco = [
            'device_details' => ['beneficiary_msisdn' => $device_number],
            'amount' => $amount,
            'product_id' => $product_id,
            'operator_id' => $operator_id,
            'account_id' => $account_id,
        ];

        if ($bill == 'electricity') {
            $electricityResponse = $this->billSubsriptions($electricity, $bill);
            if ($electricityResponse && $electricityResponse['success'] == true) {
                $prepped = $electricityResponse['data']['amount'] / 100;
                $newBalance = $user->account_balance - $prepped;
                $user->account_balance = $newBalance;
                $message = 'Payment completed successfully';
                $statusCode = 200;
                $billResponse = $electricityResponse;
            } else {
                $message = ($electricityResponse && $electricityResponse['message']) ? $electricityResponse['message'] : 'Transaction Failed';
                $statusCode = 400;
            }
        } 
        if ($bill == 'television') {
            $televisionResponse = $this->billSubsriptions($television, $bill);
            if ($televisionResponse && $televisionResponse['success'] == true) {
                $prepped = $televisionResponse['data']['amount'] / 100;
                $newBalance = $user->account_balance - $prepped;
                $user->account_balance = $newBalance;
                $message = 'Payment completed successfully';
                $statusCode = 200;
                $billResponse = $televisionResponse;
            } else {
                $message = ($televisionResponse && $televisionResponse['message']) ? $televisionResponse['message'] : 'Transaction Failed';
                $statusCode = 400;
            }
        }
        if ($bill == 'telco') {
            $telcoResponse = $this->billSubsriptions($telco, $bill);
            if ($telcoResponse && $telcoResponse['success'] == true) {
                $prepped = $telcoResponse['data']['amount'] / 100;
                $newBalance = $user->account_balance - $prepped;
                $user->account_balance = $newBalance;
                $message = 'Payment completed successfully';
                $statusCode = 200;
                $billResponse = $telcoResponse;
            } else {
                $message = ($telcoResponse && $telcoResponse['message']) ? $telcoResponse['message'] : 'Transaction Failed';
                $statusCode = 400;
            }
        }

        if ($billResponse) {
            $txn = new Transaction;
            $txn->user_id = $user->id;
            $txn->reference = $billResponse['data']['reference'];
            $txn->amount = $formFields['amount'];
            $txn->type = $bill . ' ' . 'payment';
            $txn->final_amount = $formFields['amount'];
            $txn->method = 'payment';
            $txn->status = 'Success';
            $txn->save();
        }

        
        
        return response()->json([
            'message' => $message,
            'user' => $user,
            'bill' => $billResponse,
        ], $statusCode);
    }

    public function buy_airtime(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();

            $kycResponse = $this->checkKycTier($user, $request->amount);
            if ($kycResponse !== null) {
                return $kycResponse;
            }

            if (!Hash::check($request->pin, $user->transaction_pin)) {
                return response()->json([
                    'status' => 'pin error',
                    'message' => 'Incorrect pin'
                ], 400);
            }

            $response = $this->buyAirtime($request, $user->account_id);

            if ($response && $response['success'] === true) {
                $data = $response['data'];
                $prepped = $data['amount'] / 100;

                $user->decrement('account_balance', $prepped);
                
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

            $kycResponse = $this->checkKycTier($user, $request->amount);
            if ($kycResponse !== null) {
                return $kycResponse;
            }
            
            if (!Hash::check($request->pin, $user->transaction_pin)) {
                return response()->json([
                    'status' => 'pin error',
                    'message' => 'Incorrect pin'
                ], 400);
            }
            
            $kycResponse = $this->checkKycTier($user, $request->amount);
            if ($kycResponse !== null) {
                return $kycResponse;
            }

            $fields = [
                'device_details' => ['beneficiary_msisdn' => $request->phone],
                'amount' => $request->amount * 100,
                'operator_id' => $request->operator,
                'product_id' => $request->product,
                'account_id' => $user->account_id
            ];
            $bill = 'telco';

            $response = $this->billSubsriptions($fields, $bill);

            if ($response && $response['success'] === true) {
                $data = $response['data'];
                $prepped = $data['amount'] / 100;

                $user->decrement('balance', $prepped);
                
                $txn = new Transaction;
                $txn->user_id = $user->id;
                $txn->reference = $data['reference'];
                $txn->amount = $prepped;
                $txn->type = $data['meta_data']['operator_name'];
                // $txn->type = $data['meta_data']['operator_name'] . ' Data';
                $txn->final_amount = $prepped;
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