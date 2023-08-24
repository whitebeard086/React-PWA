<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'sender_id',
        'message',
        'file',
        'invoice',
    ];

    protected $casts = [
        'chat_id' => 'float',
        'sender_id' => 'float',
    ];

    public function Chat()
    {
        return $this->belongsTo(Chat::class);
    }
}