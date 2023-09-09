<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Message;
use App\Traits\SmsTrait;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use App\Traits\UploadImageTrait;
use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Support\Facades\Storage;
use App\Notifications\NewInvoiceNotification;
use App\Notifications\NewMessageNotification;
use App\Notifications\ServiceEnquiryNotification;

class ChatController extends Controller
{
    use UploadImageTrait;
    use SmsTrait;
    
    // public function chat(Request $request)
    // {
    //     $provider = User::with('Service.Workdays', 'Service.Category')->where('slug', $request->slug)->firstOrFail();
    //     $id = $request->id;
    //     $provider_id = $request->provider_id;
    //     $userId = Auth::id();

    //     $chat = Chat::with('Messages', 'User.Service', 'Receiver.Service')
    //             ->where(function ($query) use ($id, $provider_id, $userId) {
    //                 if (isset($id)) {
    //                     $query->where('id', $id);
    //                 }

    //                 if (isset($provider_id)) {
    //                     $query->orWhere(function ($query) use ($provider_id, $userId) {
    //                         $query->where('receiver_id', $provider_id)
    //                             ->where('user_id', $userId);
    //                     });
    //                 }
    //             })
    //             ->first();

    //     if (!$chat) {
    //         $n_chat = new Chat;
    //         $n_chat->user_id = auth()->user()->id;
    //         $n_chat->receiver_id = $provider->id;
    //         $n_chat->save();

    //         return response()->json([
    //             'status' => 'new chat',
    //             'provider' => $provider,
    //             'chat' => $n_chat,
    //         ], 201);
    //     }

    //     return response()->json([
    //         'status' => 'chat',
    //         'provider' => $provider,
    //         'chat' => $chat,
    //     ], 200);
    // }


    public function chat(Request $request)
    {
        try {
            $provider = User::with('Service.Workdays', 'Service.Category')
                ->where('slug', $request->slug)
                ->firstOrFail();

            if (isset($request->id)) {
                $chat = Chat::with('Messages', 'User.Service', 'Receiver.Service', 'Invoices.Items')
                    ->findOrFail($request->id);
                    
            } elseif (isset($request->provider_id)) {
                $userId = auth()->user()->id;
                
                $chat = Chat::with('Messages', 'User.Service', 'Receiver.Service', 'Invoices.Items')
                    ->where('receiver_id', $request->provider_id)
                    ->where('user_id', $userId)
                    ->first();

                if (!$chat) {
                    $n_chat = new Chat;
                    $n_chat->uid = Hashids::encode($n_chat->id);
                    $n_chat->user_id = $userId;
                    $n_chat->receiver_id = $provider->id;
                    $n_chat->save();

                    return response()->json([
                        'status' => 'new chat',
                        'provider' => $provider,
                        'chat' => $n_chat,
                    ], 201);
                }
            }

            return response()->json([
                'status' => 'chat',
                'provider' => $provider,
                'chat' => $chat,
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }




    public function send_message(Request $request)
    {
        $message = new Message();
        $message->chat_id = $request->chat_id;
        $message->sender_id = $request->sender_id;
        $message->message = $request->message;
        
        if ($request->hasFile('file')) {
            if ($message->file) {
                Storage::disk('wasabi')->delete($message->file);
            }

            $message->file = $request->file('file')->storePublicly(
                "Messages/files",
                'wasabi'
            );
        }
        
        if ($request->hasFile('invoice')) {
            if ($message->invoice) {
                Storage::disk('wasabi')->delete($message->invoice);
            }

            $message->invoice = $request->file('invoice')->storePublicly(
                "Messages/invoices",
                'wasabi'
            );
        }

        $message->save();

        $chat = Chat::where('id', $request->chat_id)->firstOrFail();
        $sender = $chat->user;
        $receiver = $chat->receiver;

        if ($chat->messages->count() === 1) {
            $chat->receiver->notify(new ServiceEnquiryNotification($sender));

            $receiverPhone = $receiver->phone;
            $senderUsername = $sender->username;
            $receiverUsername = $receiver->username;
            
            $smsResponse = $this->sendNewEnquirySmsNotification($receiverPhone, $senderUsername, $receiverUsername);
        }

        return response()->json([
            'status' => 'sent',
            'message' => $message,
            'messages' => $chat->messages->count(),
        ], 201);
    }

    public function invoice(Request $request)
    {
        try {
            $invoices = Invoice::where('chat_id', $request->chat_id)->where('status', '!=', 'paid')->get();
            
            if ($invoices) {
                foreach ($invoices as $inv) {
                    $this->deleteImage($inv->file);

                    $inv->delete();
                }
            }
            
            $invoice = new Invoice;
            $invoice->invoice_number = $request->invoice_number;
            $invoice->price = $request->price;
            $invoice->chat_id = $request->chat_id;
            $invoice->receiver_id = $request->receiver_id;

            $this->deleteImage($invoice->file);

            $folder = 'Invoices';
            $identifier = 'invoice';

            $invoice->file = $this->uploadImage($request, $folder, $identifier);
            $invoice->save();

            $invoiceData = json_decode($request->invoiceData);
            
            if (isset($invoiceData)) {
                foreach ($invoiceData as $invItem) {
                    $item = new InvoiceItem;
                    $item->invoice_id = $invoice->id;
                    $item->item = $invItem->item;
                    $item->price = $invItem->price;
                    $item->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'invoice' => Invoice::where('id', $invoice->id)->first(),
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function delete_message(Request $request)
    {
        $message = Message::where('id', $request->message_id)->firstOrFail();

        if (isset($message)) {
            if ($message->file){
                Storage::disk('wasabi')->delete($message->file);
            }

            $message->delete();
        }
        
        return response()->json([
            'status' => 'success',
            'message' => $request->message_id,
        ], 200);
    }

    public function new_message_email(Request $request)
    {
        try {
            $receiver = User::where('id', $request->receiver_id)->firstOrFail();
            $sender = User::where('id', $request->sender_id)->firstOrFail();
            $receiver->notify(new NewMessageNotification($sender));
            
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
    
    public function send_invoice_notification(Request $request)
    {
        try {
            $receiver = User::where('id', $request->receiver_id)->firstOrFail();
            $sender = User::where('id', $request->sender_id)->firstOrFail();
            $receiver->notify(new NewInvoiceNotification($sender));

            $receiverPhone = $receiver->phone;
            $senderUsername = $sender->username;
            $receiverUsername = $receiver->username;

            $this->newInvoiceSmsNotification($receiverPhone, $senderUsername, $receiverUsername);
            
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
}