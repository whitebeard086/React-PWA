<?php

namespace App\Http\Controllers;

use Otp;
use App\Models\User;
use App\Models\Address;
use App\Models\Country;
use App\Models\Service;
use App\Models\Category;
use App\Models\Workdays;
use App\Models\ProfileType;
use App\Models\SubCategory;
use App\Models\Transaction;
use Illuminate\Support\Str;
use App\Traits\GatewayTrait;
use Illuminate\Http\Request;
use App\Models\KYCSubmission;
use App\Traits\CustomersTrait;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    use GatewayTrait;
    use CustomersTrait;
    private $otp;

    public function __construct()
    {
        $this->otp = new Otp;
    }
    
    public function register()
    {
        return response()->json([
            'profile_types' => ProfileType::all(),
        ]);
    }

    public function get_user()
    {
        try {
            $user = User::with(['address', 'accountLevel', 'ProfileType', 'Service.Category', 'Service.Workdays', 'Service.SubCategory', 'WithdrawalAccounts', 'kycSubmissions'])->where('id', auth()->user()->id)->first();

            if (isset($user->phone_verified_at) && !$user->bank) {
                $result = $this->assignVirtualAccount($user);
                $update = $this->updateDedicatedAccount($user);
            }

            if (isset($user) && $user->phone_verified_at == null) {
                return response()->json([
                    'user' => $user,
                    'message' => 'Phone not verified',
                ]);
            }

            if (isset($user->transaction_pin)) {
                $has_pin = true;
            } else {
                $has_pin = false;
            }
            
            $user->save();

            if (!$user->collection_number && ($user->first_name && $user->last_name)) {
                $collectionResponse = $this->createColectionAccount($user);
                if ($collectionResponse && $collectionResponse['success'] == true) {
                    $user->collection_number = $collectionResponse['data']['account_number'];
                    $user->collection_id = $collectionResponse['data']['id'];
                    $user->collection_name = $collectionResponse['data']['name'];
                    $user->collection_bank = $collectionResponse['data']['bank_name'];
                    $user->collection_preferred = $collectionResponse['data']['preferred_bank'];
                    $user->save();
                }
            }

            /* if ($user->account_id) {
                $virtualResponse = $this->getAccount($user->account_id);
                if ($virtualResponse['success'] == true) {
                    $prepped = $virtualResponse['data']['balance'] / 100;
                    $user->account_balance = $prepped;
                    $user->save();
                }
            }

            if ($user->wallet_id) {
                $walletResponse = $this->getWallet($user->wallet_id);
                if ($walletResponse['success'] == true) {
                    $prepped = $walletResponse['data']['balance'] / 100;
                    $user->wallet_balance = $prepped;
                    $user->save();
                }
            }

            $upgradeResponse = $this->upgradeCustomerToKYCT1($user);
            if ($upgradeResponse && $upgradeResponse['success'] == true) {
                // KYC Tier 1 upgrade successful
                $user->kyc_tier = $upgradeResponse['data']['kyc_tier'];
                $user->save();
            } */

            // if (!$user->customer_id && $user->bvn) {
            //     $customerResponse = $this->createCustomerIfConditionsMet($user);
    
            //     if ($customerResponse) {
            //         $user->customer_id = $customerResponse['data']['id'];
            //         $user->kyc_tier = $customerResponse['data']['kyc_tier'];

            //         $virtualResponce = $this->createAccount($user->customer_id);
            //         if ($virtualResponce) {
            //             $user->preferred_bank = $virtualResponce['data']['preferred_bank'];
            //             $user->account_id = $virtualResponce['data']['id'];
            //             $user->account_balance = $virtualResponce['data']['balance'];
            //             $user->account_number = $virtualResponce['data']['account_number'];
            //         }

            //         $walletResponce = $this->createWallet($user->customer_id);
            //         if ($walletResponce) {
            //             $user->wallet_id = $walletResponce['data']['id'];
            //             $user->wallet_balance = $walletResponce['data']['balance'];
            //             $user->wallet_number = $walletResponce['data']['account_number'];
            //         }
                    
            //         $upgradeResponse = $this->upgradeCustomerToKYCT1($user);
            //         if ($upgradeResponse) {
            //             // KYC Tier 1 upgrade successful
            //             $user->kyc_tier = $upgradeResponse['data']['kyc_tier'];
            //         }

            //         $user->save();
            //     } else {
            //         // Customer creation conditions not met
            //     }
            // }

            return response()->json([
                'user' => $user,
                'hasPin' => $has_pin,
                // 'update' => $update,
                // 'users' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
        
    }

    public function get_countries()
    {
        return response()->json([
            'countries' => Country::all(),
        ]);
    }

    public function get_categories()
    {
        return response()->json([
            'categories' => Category::all(),
        ], 200);
    }

    public function get_subcategories(Request $request)
    {
        $subcategories = SubCategory::where('category_id', $request->category_id)->get();

        if ($subcategories->count() === 0) {
            return response()->json([
                'status' => false,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'subcategories' => $subcategories,
        ], 200);
    }

    public function assign_virtual_account(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();

        try {
            $curl = curl_init();
            $data = array(
                "email" => $user->email,
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "phone" => $user->phone,
                "preferred_bank" => "test-bank",
                "country" => "NG"
            );

            $post_data = json_encode($data);

            curl_setopt_array($curl, array(
                CURLOPT_URL => "https://api.paystack.co/dedicated_account/assign",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_POSTFIELDS => $post_data,
                CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer ".env('PAYSTACK_SECRET'),
                    "Content-Type: application/json"
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);
            
            if ($err) {
                return response()->json([
                    'status' => 'error',
                    'response' => json_decode($err)
                ]);
            } else {
                $res = json_decode($response);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Virtual account created successfully',
                'response' => $res
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
        
    }

    public function update_phone(Request $request)
    {
        $user = $request->user();
        $user->phone = $request->phone;
        $user->save();

        $otp = (new OTP())->generate($user->phone, 4, 10);
        
        $curl = curl_init();
        $data = array(
            "api_key" => env('TERMII_API_KEY'), 
            "to" => $user->phone,  
            "from" => "N-Alert",
            "sms" => "Hi $user->username, use the following code to verify your mobile number, $otp->token",  
            "type" => "plain",  
            "channel" => "dnd" 
        );

        $post_data = json_encode($data);

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.ng.termii.com/api/sms/send",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_data,
            CURLOPT_HTTPHEADER => array(
                "Content-Type: application/json"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            $res = json_decode($response);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Otp sent',
            'response' => $res
        ]);
    }

    public function verify_phone(Request $request)
    {
        $n_otp = $this->otp->validate($request->phone, $request->otp);

        if ($n_otp->message == "OTP does not exist") {
            return response()->json([
                'status' => 'error',
                'message' => "invalid OTP, please check that you entered the correct code.",
            ], 400);
        }

        if ($n_otp->message == "OTP is not valid") {
            return response()->json([
                'status' => 'error',
                'message' => "OTP has expired, click 'Resend' to get a new one.",
            ], 400);
        }

        $user = $request->user();

        if (isset($user)) {
            $user->phone_verified_at = now();
            $user->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Phone verified successfully',
        ], 200);
    }
    
    public function new_service(Request $request)
    {
        $workdays = new Workdays;
        $workdays->monday_start = $request->monday1;
        $workdays->monday_end = $request->monday2;
        $workdays->tuesday_start = $request->tuesday1;
        $workdays->tuesday_end = $request->tuesday2;
        $workdays->wednesday_start = $request->wednesday1;
        $workdays->wednesday_end = $request->wednesday2;
        $workdays->thursday_start = $request->thursday1;
        $workdays->thursday_end = $request->thursday2;
        $workdays->friday_start = $request->friday1;
        $workdays->friday_end = $request->friday2;
        $workdays->saturday_start = $request->saturday1;
        $workdays->saturday_end = $request->saturday2;
        $workdays->sunday_start = $request->sunday1;
        $workdays->sunday_end = $request->sunday2;
        $workdays->save();

        $service = new Service;
        $service->user_id = auth()->user()->id;
        $service->category_id = $request->category;
        $service->sub_category_id = $request->subcategory;
        $service->workdays_id = $workdays->id;
        $service->title = $request->title;
        $service->slug = Str::slug($request->title);
        $service->description = $request->description;
        $service->starting_price = $request->starting_price;
        $service->save();
        $service->uid = Hashids::encode($service->id);
        $service->save();

        return response()->json([
            'status' => 'success',
            'service' => $service,
            'workdays' => $workdays,
        ], 200);
    }

    public function update_service(Request $request)
    {
        $workdays = Workdays::where('id', $request->workdays_id)->first();
        $workdays->monday_start = $request->monday1;
        $workdays->monday_end = $request->monday2;
        $workdays->tuesday_start = $request->tuesday1;
        $workdays->tuesday_end = $request->tuesday2;
        $workdays->wednesday_start = $request->wednesday1;
        $workdays->wednesday_end = $request->wednesday2;
        $workdays->thursday_start = $request->thursday1;
        $workdays->thursday_end = $request->thursday2;
        $workdays->friday_start = $request->friday1;
        $workdays->friday_end = $request->friday2;
        $workdays->saturday_start = $request->saturday1;
        $workdays->saturday_end = $request->saturday2;
        $workdays->sunday_start = $request->sunday1;
        $workdays->sunday_end = $request->sunday2;
        $workdays->save();

        $service = Service::where('id', $request->service_id)->first();
        $service->user_id = auth()->user()->id;
        $service->category_id = $request->category;
        $service->sub_category_id = $request->subcategory;
        $service->workdays_id = $workdays->id;
        $service->title = $request->title;
        $service->slug = Str::slug($request->title);
        $service->description = $request->description;
        $service->starting_price = $request->starting_price;
        $service->save();

        return response()->json([
            'status' => 'success',
            'service' => $service,
            'workdays' => $workdays,
        ], 200);
    }

    public function user_image(Request $request)
    {
        $user = $request->user();

        if ($request->hasFile('image')) {
            if ($user->image) {
                Storage::disk('wasabi')->delete($user->image);
            }

            $user->image = $request->file('image')->storePublicly(
                "Users/$user->username",
                'wasabi'
            );
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Image uploaded successfully',
            'user' => $user,
        ], 201);
    }

    public function upload_banner(Request $request)
    {
        $service = Service::where('id', $request->service_id)->first();
        $user = User::where('id', $service->user_id)->first();
        
        if ($request->hasFile('banner')) {
            if ($service->banner) {
                Storage::disk('wasabi')->delete($service->banner);
            }

            $service->banner = $request->file('banner')->storePublicly(
                "Services/banners/$user->username",
                'wasabi'
            );
        }

        $service->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Banner uploaded successfully',
            'service' => $service,
        ], 200);
    }

    public function get_provider(Request $request)
    {
        $provider = User::with('Service.Workdays', 'Service.Category', 'Service.Bookings')->where('slug', $request->slug)->first(); 

        return response()->json([
            'status' => 'success',
            'provider' => $provider,
        ], 200);
    }

    public function get_provider_by_get($slug)
    {
        $provider = User::with('Service.Workdays', 'Service.Category', 'Service.Bookings')->where('slug', $slug)->first(); 

        return response()->json([
            'status' => 'success',
            'provider' => $provider,
        ], 200);
    }

    public function get_client($slug)
    {
        $client = User::where('slug', $slug)->first(); 

        return response()->json([
            'status' => 'success',
            'client' => $client,
        ], 200);
    }

    public function update_profile_view(Request $request)
    {
        try {
            $provider = User::where('id', $request->provider_id)->firstOrFail();
            $provider->profile_views = $provider->profile_views + 1;
            $provider->save();
            
            return response()->json([
                'status' => 'success',
                'provider' => $provider,
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function create_pin(Request $request)
    {
        $request->validate([
            'pin' => 'required|integer',
            'pin_confirmation' => 'same:pin',
        ]);
        
        try {
            $user = User::where('id', auth()->user()->id)->firstOrFail();

            if (isset($user)) {
                $user->transaction_pin = bcrypt($request->pin);
                $user->save();
            }

            return response()->json([
                'status' => 'success',
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function validate_pin(Request $request)
    {
        $request->validate([
            'pin' => 'required|integer',
        ]);

        $user = User::where('id', auth()->user()->id)->firstOrFail();

        if (!Hash::check($request->pin, $user->transaction_pin)) {
            return response()->json([
                'status' => 'pin error',
                'message' => 'Incorrect pin'
            ], 400);
        }

        return response()->json([
            'status' => 'success',
        ], 200);
    }

    public function update_pin(Request $request)
    {
        $request->validate([
            'old_pin' => 'required|integer',
            'pin' => 'required|integer',
            'pin_confirmation' => 'same:pin',
        ]);
        
        try {
            $user = User::where('id', auth()->user()->id)->firstOrFail();
            
            if (isset($user)) {
                if (!Hash::check($request->old_pin, $user->transaction_pin)) {
                    return response()->json([
                        'status' => 'Pin Error!',
                        'message' => 'The PIN entered does not match your transaction PIN, please try again.'
                    ], 400);
                }
                
                if (Hash::check($request->pin, $user->transaction_pin)) {
                    return response()->json([
                        'status' => 'Duplicate Error!',
                        'message' => 'The PIN entered is the same as your transaction PIN, please enter a new PIN.'
                    ], 400);
                }
                
                $user->transaction_pin = bcrypt($request->pin);
                $user->save();
            }

            return response()->json([
                'status' => 'success',
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function initiate_kyc(Request $request)
    {
        if (auth()->user()->id != $request->user_id) {
            return response()->json([
                'status' => 'error',
                'kyc' => null,
                'message' => 'You do not have permission to perform this function!'
            ], 403);
        }

        $user = User::where('id', $request->user_id)->first();
        // $formFields = $request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'document_type' => 'required',
        //     'doc_front' => 'nullable|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
        //     'doc_back' => 'nullable|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
        //     'nin' => 'nullable',
        //     'admin_notes' => 'nullable',
        // ]);
        // $formFields = $request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'document_type' => 'required',
        //     'doc_front' => 'required_if:document_type,passport,voterId,driversLicense|nullable_if:document_type,!=,passport,voterId,driversLicense|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
        //     'doc_back' => 'required_if:document_type,passport,voterId,driversLicense|nullable_if:document_type,!=,passport,voterId,driversLicense|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
        //     'nin' => 'required_if:document_type,!=,passport,voterId,driversLicense|nullable_if:document_type,passport,voterId,driversLicense',
        //     'admin_notes' => 'nullable',
        // ]);
        $formFields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'document_type' => 'required',
            'doc_front' => 'required_if:document_type,passport,voterId,driversLicense|nullable|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
            'doc_back' => 'required_if:document_type,passport,voterId,driversLicense|nullable|mimes:jpg,jpeg,png,xls,xlsx,doc,docx',
            'nin' => 'required_if:document_type,nin|nullable',
            'admin_notes' => 'nullable',
        ]);

        if ($request->hasFile('doc_front')) {
            $formFields['doc_front'] = $request->file('doc_front')->storePublicly('Accounts/kyc', 'wasabi');
        }

        if ($request->hasFile('doc_back')) {
            $formFields['doc_back'] = $request->file('doc_back')->storePublicly('Accounts/kyc', 'wasabi');
        }

        $kyc = KYCSubmission::create($formFields);

        // Update user's pending_account_level based on account_level_id
        if ($user->account_level_id == 1) {
            $user->pending_account_level = 'Two';
        } elseif ($user->account_level_id == 2) {
            $user->pending_account_level = 'Three';
        } elseif ($user->account_level_id == 3) {
            $user->pending_account_level = 'Four';
        }
        
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'KYC initiated successfully',
            'kyc' => $kyc,
        ], 200);
    }

    public function update_bvn(Request $request, $userID)
    {
        $user = User::findOrFail($userID);
        $formFields = $request->validate([
            'bvn' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
        ]);

        $message = '';
        $statusCode = 200;

        $user->update($formFields);
        // $user->update($request->all());
        $message .= 'User details updated successfully!';

        if (!$user->customer_id && $user->bvn) {
            $customerResponse = $this->createCustomerIfConditionsMet($user);

            if ($customerResponse['success'] == false) {
                $customMessage = $customerResponse['message'];
                $message = "$customMessage\nYour details were updated; however, you will not get an account yet.";
                $statusCode = 200;
            } else {
                $user->customer_id = $customerResponse['data']['id'];
                $user->kyc_tier = $customerResponse['data']['kyc_tier'];

                $virtualResponce = $this->createAccount($user->customer_id);
                if ($virtualResponce) {
                    $user->preferred_bank = $virtualResponce['data']['preferred_bank'];
                    $user->account_id = $virtualResponce['data']['id'];
                    $user->account_balance = $virtualResponce['data']['balance'];
                    $user->account_number = $virtualResponce['data']['account_number'];
                }

                $walletResponce = $this->createWallet($user->customer_id);
                if ($walletResponce) {
                    $user->wallet_id = $walletResponce['data']['id'];
                    $user->wallet_balance = $walletResponce['data']['balance'];
                    $user->wallet_number = $walletResponce['data']['account_number'];
                }
                
                $upgradeResponse = $this->upgradeCustomerToKYCT1($user);
                if ($upgradeResponse && $upgradeResponse['success'] == true) {
                    // KYC Tier 1 upgrade successful
                    $user->kyc_tier = $upgradeResponse['data']['kyc_tier'];
                }

                $user->save();
            }
        }

        return response()->json([
            'message' => $message,
            'user' => $user,
        ], $statusCode);
    }

    public function simulate_credit(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();
        $formFields = $request->validate([
            'amount' => 'required|string',
        ]);

        $data = [
            'amount' => $formFields['amount'] * 100,
            'account_id' => $user->account_id,
            'alias' => 'Business',
        ];

        $message = '';
        $statusCode = 200;

        $creditResponse = $this->simulateCredit($data);
        
        if ($creditResponse['success'] == false) {
            $statusCode = 400;
        } else {
            $prepped = $creditResponse['data']['balance'] / 100;
            $newBalance = $user->account_balance + $prepped;
            $user->account_balance = $newBalance;
            $statusCode = 200;
        }
        
        $message = $creditResponse['message'];

        $user->save();

        $txn = new Transaction;
        $txn->user_id = $user->id;
        $txn->reference = $user->account_id;
        $txn->amount = $formFields['amount'];
        $txn->type = "Wallet Topup";
        $txn->final_amount = $formFields['amount'];
        $txn->method = 'topup';
        $txn->status = 'Success';
        $txn->save();

        return response()->json([
            'message' => $message,
            'user' => $user,
        ], $statusCode);
    }
    
    public function address(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();
        $formFields = $request->validate([
            'street' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'country' => 'required|string',
            'postal_code' => 'required|string',
        ]);

        $formFields['user_id'] = $user->id;
        $address = Address::create($formFields);

        return response()->json([
            'status' => 'success',
            'message' => 'Address updated successfully',
            'address' => $address,
        ], 200);
    }
    
    public function update_kyb(Request $request)
    {
        $user = User::where('id', auth()->user()->id)->firstOrFail();
        $formFields = $request->validate([
            'place_of_birth' => 'required|string',
            'gender' => 'required|string',
            'dob' => 'required|string',
        ]);

        $user->update($formFields);

        return response()->json([
            'status' => 'success',
            'message' => 'User details updated successfully',
            'user' => $user,
        ], 200);
    }

    // public function get_transaction($slug)
    // {
    //     $transaction = Transaction::where('uid', $slug)->first(); 

    //     return response()->json([
    //         'status' => 'success',
    //         'transaction' => $transaction,
    //     ], 200);
    // }
}