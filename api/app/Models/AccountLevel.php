<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'document_number',
        'max_balance',
    ];

    protected $casts = [
        'max_balance' => 'float',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
