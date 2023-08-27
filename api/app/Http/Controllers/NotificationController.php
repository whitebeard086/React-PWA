<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        try {
            $notifications = Notification::with('Sender', 'Sender.Service')->where('receiver_id', auth()->user()->id)->orderBy('id', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'notifications' => $notifications,
            ], 200);
            
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function create_notification(Request $request)
    {
        try {
            $n = new Notification;
            $n->sender_id = auth()->user()->id;
            $n->receiver_id = $request->receiver_id;
            $n->type = $request->type;
            $n->data = $request->data;
            $n->url = $request->url;
            $n->save();

            return response()->json([
                'status' => 'success',
                'notification' => Notification::with('Sender', 'Sender.Service')->where('id', $n->id)->first(),
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function mark_as_read(Request $request)
    {
        try {
            $n = Notification::find($request->id);
            $n->is_read = 1;
            $n->save();

            return response()->json([
                'status' => 'success',
                'notification' => Notification::with('Sender', 'Sender.Service')->where('id', $n->id)->first(),
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function mark_all_as_read()
    {
        try {
            $notifications = Notification::with('Sender', 'Sender.Service')->where('receiver_id', auth()->user()->id)->orderBy('id', 'desc')->get();

            foreach ($notifications as $n) {
                $n->is_read = 1;
                $n->save();
            }

            return response()->json([
                'status' => 'success',
                'notifications' => $notifications,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function clear() 
    {
        try {
            $notifications = Notification::with('Sender', 'Sender.Service')->where('receiver_id', auth()->user()->id)->orderBy('id', 'desc')->get();

            foreach ($notifications as $n) {
                $n->delete();
            }

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