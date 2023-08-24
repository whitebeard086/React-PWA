<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reference',
        'amount',
        'type',
        'charge',
        'final_amount',
        'method',
        'status',
    ];

    protected $casts = [
        'user_id' => 'float',
        'amount' => 'float',
        'charge' => 'float',
        'final_amount' => 'float',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}