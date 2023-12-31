<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'receiver_id',
    ];

    protected $casts = [
        'user_id' => 'float',
        'receiver_id' => 'float',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
    
    public function Messages()
    {
        return $this->hasMany(Message::class);
    }

    public function Booking()
    {
        return $this->hasOne(Booking::class);
    }

    public function Invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}