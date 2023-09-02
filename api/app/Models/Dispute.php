<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dispute extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'disputer_id',
        'client_id',
        'provider_id',
        'invoice_id',
        'description',
        'status',
        'respond_before',
    ]; 

    protected $casts = [
        'disputer_id' => 'float',
        'client_id' => 'float',
        'booking_id' => 'float',
        'invoice_id' => 'float',
        'provider_id' => 'float',
    ];

    public function Booking()
    {
        return $this->belongsTo(Booking::class);
    }
    
    public function Disputer()
    {
        return $this->belongsTo(User::class, 'disputer_id');
    }
    
    public function Client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
    
    public function Provider()
    {
        return $this->belongsTo(User::class, 'provider_id');
    }

    public function Invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function Messages()
    {
        return $this->hasMany(DisputeMessage::class);
    }
}