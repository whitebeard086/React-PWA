<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use App\Models\User;
use Ichtrojan\Otp\Otp;
use App\Models\Referral;
use Illuminate\Support\Str;
use App\Services\SMSService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    protected $smsService;
    private $otp;

    public function __construct(SMSService $smsService)
    {
        $this->smsService = $smsService;
        $this->otp = new Otp;
    }
    
    public function check_email(Request $request)
    {
        $form = $request->validate([
            'email' => 'required',
        ]);

        $email_exists = User::where('email', $request->email)->first();

        if (isset($email_exists)) {
            return response()->json([
                'status' => 'error',
                'message' => $request->email . ' is already taken!'
            ], 409);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => $request->email . ' is available.',
            ], 200);
        }
    }

    public function check_user(Request $request)
    {
        $form = $request->validate([
            'username' => 'required',
        ]);

        $user_exists = User::where('username', $form['username'])->first();

        if ($user_exists) {
            return response()->json([
                'status' => 'error',
                'message' => $form['username'] . ' is already taken!',
                'a_referrer' => true,
                'referrer' => 'Referred by: ' . $user_exists->first_name . ' ' . $user_exists->last_name,
            ], 409);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => $form['username'] . ' is available.',
                'a_referrer' => false,
                'referrer' => $form['username'] . ' cannot be your referrer at this time, sorry.'
            ], 200);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|alpha_dash|unique:users,username',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'slug' => 'nullable',
            'profile_type_id' => 'required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required',
            'password_confirmation' => 'same:password',
        ]);
        // dd($request);
        if (!$request->username) {
            return response()->json([
                'error' => 'Please enter a username'
            ], 500);
        }


        $new_user = User::create([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'profile_type_id' => $request->profile_type_id,
            'slug' => Str::slug($request->username),
            'email' => $request->email,
            'password' => bcrypt($request->password),
            // 'password_confirmation' => bcrypt($fields['password_confirmation']),
        ]);
        
        // check if the user was referred
        if ($request->has('referrer')) {
            $referrer = User::where('username', $request->input('referrer'))->first();
            if ($referrer) {
                // Record the referral relationship in the "referrals" table
                Referral::create([
                    'referrer_id' => $referrer->id,
                    'referred_id' => $new_user->id,
                ]);
                // Add reward to the referrer's balance
                $referrer->balance += 200;
                $referrer->save();
                
                //Send sms to the referrer
                // $message = "Congratulations $referrer->username, you've earned ₦200 referral bonus from the new account by $new_user->username";
                $message = "Congratulations $referrer->username, you've earned NGN200 from referral.";
                $this->smsService->sendSMS($referrer->phone, $referrer->username, $message);
            }
        }
        $user = User::with('ProfileType', 'Service.Category', 'Service.Workdays', 'Service.SubCategory')->where('id', $new_user->id)->first();

        $token = $user->createToken('register')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::with('ProfileType', 'Service.Category', 'Service.Workdays', 'Service.SubCategory')->where('username', $fields['username'])->first();

        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Incorrect username or password'
            ], 401);
        }

        $token = $user->createToken('login')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }

    public function delete_account(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'password error',
                    'message' => 'Incorrect password'
                ], 400);
            }

            $user->deactivate_at = Carbon::now()->addHours(72);
            $user->save();
            
            return response()->json([
                'status' => 'success',
                'user' => $user
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function cancel_delete_account(Request $request)
    {
        try {
            $user = User::where('id', auth()->user()->id)->first();

            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'password error',
                    'message' => 'Incorrect password'
                ], 400);
            }

            $user->deactivate_at = null;
            $user->save();
            
            return response()->json([
                'status' => 'success',
                'user' => $user
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
        
    public function initiate(Request $request) {
        $request->validate([
            'email' => 'required|email',
        ]);
        
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json([
                'message' => 'We can\'t find a user with that email address.',
            ], 404);
        }
        $token = Password::createToken($user);
        
        $this->smsService->sendSMS($user->phone, $user->username, "Your password reset token is $token");

        return response()->json([
            'message' => 'We have sent a password reset token to your phone number.',
        ]);
    }

    public function reset(Request $request) {
        $credentials = request()->validate([
            'token' => 'required|string',
            'password' => 'required|string|confirmed',
            // 'otp' => 'required|string',
        ]);
    
        // Verify the OTP
        // $n_otp = $this->otp->validate($request->phone, $request->otp);
        // if ($n_otp->message == "OTP does not exist" || $n_otp->message == "OTP is not valid") {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => $n_otp->message,
        //     ], 400);
        // }
    
        $reset_password_status = Password::reset($credentials, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
    
        if ($reset_password_status == Password::INVALID_TOKEN) {
            return response()->json(["message" => "Invalid token provided"], 400);
        }
        return response()->json(["message" => "Password has been successfully changed"]);
    }
}