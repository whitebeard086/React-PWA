<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Escrow extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'user_id',
        'booking_id',
        'amount',
        'status',
    ]; 

    protected $casts = [
        'service_id' => 'float',
        'user_id' => 'float',
        'booking_id' => 'float',
        'amount' => 'float',
    ];

    public function Service()
    {
        return $this->belongsTo(Service::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Booking()
    {
        return $this->belongsTo(Booking::class);
    }
}