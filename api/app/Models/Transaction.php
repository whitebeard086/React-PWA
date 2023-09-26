<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'uid',
    ];

    protected $casts = [
        'user_id' => 'float',
        'amount' => 'float',
        'charge' => 'float',
        'final_amount' => 'float',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            $transaction->uid = (string) Str::uuid();
        });
    }
    
    public function User()
    {
        return $this->belongsTo(User::class);
    }
}