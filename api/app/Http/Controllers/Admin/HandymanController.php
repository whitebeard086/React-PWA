<?php

namespace App\Http\Controllers\Admin;

use App\Models\Chat;
use App\Models\User;
use App\Models\Booking;
use App\Models\Dispute;
use App\Models\Service;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Vinkla\Hashids\Facades\Hashids;
use App\Http\Controllers\Controller;
use App\Traits\SystemTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class HandymanController extends Controller
{
    use SystemTrait;
    
    public function enquiries()
    {
        try {
            $enquiries = Chat::with('Messages', 'User.Service.Category', 'Receiver.Service.Category', 'User.Service.User', 'Receiver.Service.User', 'Invoices.Items')->orderBy('id', 'desc')->withCount('Messages')->get();
            
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
            $disputes = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('status', 'open')->get();
            
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

    public function closed_disputes()
    {
        try {
            $disputes = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('status', 'resolved')->get();
            
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

    public function refund_client(Request $request)
    {
        try {
            $dispute = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('uid', $request->uid)->first();
            $booking = $dispute->booking;
            
            DB::beginTransaction();

            // Update dispute status
            $dispute->status = 'resolved';
            $dispute->save();

            // Update booking status
            $booking->status = 'completed';
            $booking->save();

            // Update escrow status
            $escrow = $booking->escrow;
            
            if (!$escrow) {
                throw new ModelNotFoundException('Escrow not found');
            }
            $escrow->status = 'completed';
            $escrow->save();

            // Update escrow account balance
            $escrowAccount = User::where('username', 'escrow')->firstOrFail();
            $escrowAccount->decrement('balance', $escrow->amount);
            $escrowAccount->save();

            // Update client balance
            $client = $dispute->client;
            if (!$client) {
                throw new ModelNotFoundException('Client not found');
            }
            $client->increment('balance', $escrow->amount);
            $client->save();

            $txn = new Transaction;
            $txn->user_id = $client->id;
            $txn->reference = $booking->invoice->invoice_number;
            $txn->amount = $booking->invoice->price;
            $txn->type = 'Service Refund';
            $txn->final_amount = $booking->invoice->price;
            $txn->method = 'transfer';
            $txn->status = 'Success';
            $txn->save();

            // TODO: SMS, Email, Push, and In-App notifications

            DB::commit();

            return response()->json([
                'status' => 'Success',
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function pay_provider(Request $request)
    {
        try {
            $dispute = Dispute::with('Invoice.Items', 'Client', 'Provider.Service.Category', 'Disputer.Service', 'Booking.User', 'Messages.Media')->where('uid', $request->uid)->first();
            $booking = $dispute->booking;
            
            DB::beginTransaction();

            // Update dispute status
            $dispute->status = 'resolved';
            $dispute->save();

            // Update booking status
            $booking->status = 'completed';
            $booking->save();

            // Update escrow status
            $escrow = $booking->escrow;
            
            if (!$escrow) {
                throw new ModelNotFoundException('Escrow not found');
            }
            $escrow->status = 'completed';
            $escrow->save();

            // Update escrow account balance
            $escrowAccount = User::where('username', 'escrow')->firstOrFail();
            $escrowAccount->decrement('balance', $escrow->amount);
            $escrowAccount->save();

            // Update provider balance
            $provider = $dispute->provider;
            if (!$provider) {
                throw new ModelNotFoundException('Provider not found');
            }
            $taskitly = User::where('username', 'taskitly')->first();

            $commission = $this->calculateServiceCommission($escrow->amount);
            $service_commission = $commission['service_commission']; 
            $provider_commission = $commission['provider_commission']; 
            $commission_rate = $commission['commission_rate']; 

            $booking->service_commission = $service_commission;
            $booking->provider_commission = $provider_commission;
            $booking->commission_rate = $commission_rate;
            $booking->save();
            $taskitly->increment('balance', $service_commission);
            $taskitly->save();
            $provider->increment('balance', $provider_commission);
            $provider->save();

            $chat = $booking->chat;
            $chat->status = 'closed';
            $chat->save(); 

            $txn = new Transaction;
            $txn->user_id = $provider->id;
            $txn->reference = $booking->invoice->invoice_number;
            $txn->amount = $provider_commission;
            $txn->type = 'Service Refund';
            $txn->final_amount = $provider_commission;
            $txn->method = 'transfer';
            $txn->status = 'Success';
            $txn->save();

            // TODO: SMS, Email, Push, and In-App notifications

            DB::commit();

            return response()->json([
                'status' => 'Success',
            ], 200);
            
        } catch (ModelNotFoundException $e) {
            DB::rollback();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 404);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function active_bookings()
    {
        try {
            $activeBookings = Booking::with('Invoice.Items', 'Service.User', 'Service.Category', 'User')->where('status', 'ongoing')->get();
            
            return response()->json([
                'status' => 'success',
                'activeBookings' => $activeBookings,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function completed_bookings()
    {
        try {
            $completedBookings = Booking::with('Invoice.Items', 'Service.User', 'Service.Category', 'User')->where('status', 'completed')->get();
            
            return response()->json([
                'status' => 'success',
                'completedBookings' => $completedBookings,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}