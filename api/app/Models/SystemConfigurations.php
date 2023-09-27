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
        'referral_bonus' => 'float',
    ];
}