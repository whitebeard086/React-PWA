<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class RequestsController extends Controller
{
    public function index()
    {
        $enquiries = Chat::with('Messages', 'User.Service', 'Receiver.Service')->where('user_id', auth()->user()->id)
                                            ->orWhere('receiver_id', auth()->user()->id)->get();
        
        return response()->json([
            'status' => 'success',
            'enquiries' => $enquiries,
        ], 200);
    }
}