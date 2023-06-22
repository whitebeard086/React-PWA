<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
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
                $chat = Chat::with('Messages', 'User.Service', 'Receiver.Service')
                    ->findOrFail($request->id);
                    
            } elseif (isset($request->provider_id)) {
                $userId = auth()->user()->id;
                
                $chat = Chat::with('Messages', 'User.Service', 'Receiver.Service')
                    ->where('receiver_id', $request->provider_id)
                    ->where('user_id', $userId)
                    ->first();

                if (!$chat) {
                    $n_chat = new Chat;
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

        return response()->json([
            'status' => 'sent',
            'message' => $message,
        ], 201);
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
}