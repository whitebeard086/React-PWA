<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'user_id',
        'invoice_id',
        'service_status',
        'user_status',
        'status',
    ]; 

    protected $casts = [
        'service_id' => 'float',
        'user_id' => 'float',
        'invoice_id' => 'float',
    ];

    public function Service()
    {
        return $this->belongsTo(Service::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }
    
    public function Invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function Escrow()
    {
        return $this->hasOne(Escrow::class);
    }
}