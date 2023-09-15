<?php

namespace App\Http\Controllers\Admin;

use App\Models\Chat;
use App\Models\Service;
use Illuminate\Http\Request;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use App\Models\Dispute;

class HandymanController extends Controller
{
    public function enquiries()
    {
        try {
            $enquiries = Chat::with('Messages', 'User.Service.Category', 'Receiver.Service.Category', 'User.Service.User', 'Receiver.Service.User', 'Invoices.Items')->orderBy('id', 'desc')->withCount('Messages')->get();
            // $services = Service::get();
            // if ($services) {
            //     foreach ($services as $service) {
            //         if (!$service->uid) {
            //             $service->uid = Hashids::encode($service->id);
            //             $service->save();
            //         }
                    
            //     }
            // }
            
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

    public function enquiry(Request $request)
    {
        try {
            $enquiry = Chat::with('Messages', 'User.Service.Category', 'Receiver.Service.Category', 'User.Service.User', 'Receiver.Service.User', 'Invoices.Items')->where('uid', $request->uid)->withCount('Messages')->firstOrFail();

            return response()->json([
                'status' => 'success',
                'enquiry' => $enquiry,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function disputes()
    {
        try {
            $disputes = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('status', 'open')->orWhere('status', 'resolved')->get();
            
            return response()->json([
                'status' => 'success',
                'disputes' => $disputes,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function dispute(Request $request)
    {
        try {
            $dispute = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('uid', $request->uid)->first();

            return response()->json([
                'status' => 'success',
                'dispute' => $dispute,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}