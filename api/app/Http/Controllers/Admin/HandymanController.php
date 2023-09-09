<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use Illuminate\Http\Request;

class HandymanController extends Controller
{
    public function enquiries()
    {
        try {
            $enquiries = Chat::with('Messages', 'User.Service', 'Receiver.Service', 'Invoices.Items')->orderBy('id', 'desc')->get();
            
            return response()->json([
                'status' => 'success',
                'enquiries' => $enquiries,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}