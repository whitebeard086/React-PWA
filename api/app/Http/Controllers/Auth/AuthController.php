<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
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
                'message' => $form['username'] . ' is already taken!'
            ], 409);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => $form['username'] . ' is available.',
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

        return response($response, 200);
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
}