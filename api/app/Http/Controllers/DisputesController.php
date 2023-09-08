<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Media;
use App\Models\Dispute;
use Illuminate\Http\Request;
use App\Models\DisputeMessage;
use App\Traits\UploadImageTrait;

class DisputesController extends Controller
{
    use UploadImageTrait;
    
    public function get_dispute(Request $request)
    {
        try {
            $dispute = Dispute::with('Disputer.Service', 'Booking.User', 'Booking.Service.User.Service', 'Messages.Medias')->where('uid', $request->DUID)->firstOrFail();

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

    public function send_message(Request $request)
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $disputeQuery = Dispute::with('Booking.Service.User', 'Booking.User', 'Messages.Medias')->orderBy('id', 'desc');
            
            if ($user->profile_type_id == 1) {
                $disputes = $disputeQuery->where('client_id', $userId)->get();
            } elseif ($user->profile_type_id == 2) {
                $disputes = $disputeQuery->where('provider_id', $userId)->get();
            }
            
            $disMessage = new DisputeMessage;
            $disMessage->dispute_id = $request->dispute_id;
            $disMessage->sender_id = $request->sender_id;
            $disMessage->message = $request->message;

            $folder = 'bookings/disputes';
            $identifier = 'media';
            if($request->hasFile('media')) {
                $file = $this->uploadImage($request, $folder, $identifier);
                
                $media = new Media;
                $media->file = $file;
                $disMessage->medias()->save($media);
            }

            $disMessage->save();

            return response()->json([
                'status' => 'success',
                'dispute' => Dispute::with('Booking.Service.User', 'Booking.User', 'Messages.Medias')->where('id', $disMessage->dispute_id),
                'message' => DisputeMessage::with('Medias')->where('id', $disMessage->id)->get(),
                // 'disputes' => $disputes,
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}