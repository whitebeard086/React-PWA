<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bank_name',
        'account_number',
        'account_name',
        'account_type',
        'recipient_code',
    ]; 

    protected $casts = [
        'user_id' => 'float',
        'account_number' => 'float',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}