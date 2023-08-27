<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'type',
        'data',
        'is_read',
        'url',
    ];

    protected $casts = [
        'sender_id' => 'float',
        'receiver_id' => 'float',
        'is_read' => 'boolean',
    ];

    public function Sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function Receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}