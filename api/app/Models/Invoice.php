<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'price',
        'chat_id',
        'receiver_id',
        'file',
    ];

    protected $casts = [
        'price' => 'float',
        'chat_id' => 'float',
        'receiver_id' => 'float',
    ];

    public function Chat()
    {
        return $this->belongsTo(Chat::class);
    }

    public function Receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function Items()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}