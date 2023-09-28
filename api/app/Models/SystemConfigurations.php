<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemConfigurations extends Model
{
    use HasFactory;

    protected $fillable = [
        'referral_bonus',
        'referral_pitch',
    ];

    protected $casts = [
        'service_commission' => 'float',
        'data_discount' => 'float',
        'airtime_discount' => 'float',
        'referral_bonus' => 'float',
    ];
}