<?php

namespace App\Http\Controllers;

use App\Models\ProfileType;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register()
    {
        return response()->json([
            'profile_types' => ProfileType::all(),
        ]);
    }
}