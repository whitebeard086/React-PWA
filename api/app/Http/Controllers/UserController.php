<?php

namespace App\Http\Controllers;

use Otp;
use App\Models\Country;
use App\Models\User;
use App\Models\ProfileType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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
        $user = User::with('ProfileType')->where('id', auth()->user()->id)->first();

        if (isset($user) && $user->phone_verified_at == null) {
            return response()->json([
                'user' => $user,
                'message' => 'Phone not verified',
            ]);
        }
        
        return response()->json([
            'user' => $user,
        ]);
    }

    public function get_countries()
    {
        return response()->json([
            'countries' => Country::all(),
        ]);
    }

    public function update_phone(Request $request)
    {
        $user = $request->user();
        $user->phone = $request->phone;
        $user->save();

        $otp = (new OTP())->generate($user->phone, 4, 10);
        
        // $curl = curl_init();
        // $data = array(
        //     "api_key" => env('TERMII_API_KEY'), 
        //     "to" => $user->phone,  
        //     "from" => "N-Alert",
        //     "sms" => "Hi $user->username, use the following code to verify your mobile number, $otp->token",  
        //     "type" => "plain",  
        //     "channel" => "dnd" 
        // );

        // $post_data = json_encode($data);

        // curl_setopt_array($curl, array(
        //     CURLOPT_URL => "https://api.ng.termii.com/api/sms/send",
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_ENCODING => "",
        //     CURLOPT_MAXREDIRS => 10,
        //     CURLOPT_TIMEOUT => 0,
        //     CURLOPT_FOLLOWLOCATION => true,
        //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        //     CURLOPT_CUSTOMREQUEST => "POST",
        //     CURLOPT_POSTFIELDS => $post_data,
        //     CURLOPT_HTTPHEADER => array(
        //         "Content-Type: application/json"
        //     ),
        // ));

        // $response = curl_exec($curl);
        // $err = curl_error($curl);

        // curl_close($curl);

        // if ($err) {
        //     echo "cURL Error #:" . $err;
        // } else {
        //     // echo $response;
        //     $res = json_decode($response);
        // }

        return response()->json([
            'user' => $user,
            'message' => 'Otp sent',
            // 'response' => $res
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
    
}