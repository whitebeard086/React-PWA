<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'item',
        'price',
    ];

    protected $casts = [
        'price' => 'float',
        'invoice_id' => 'float',
    ];

    public function Invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}