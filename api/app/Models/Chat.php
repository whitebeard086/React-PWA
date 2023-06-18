<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
    
    public function Messages()
    {
        return $this->hasMany(Message::class);
    }
}