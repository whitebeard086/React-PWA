<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    public $incrementing = false;
    public $keyType = 'string';

    protected $table = 'collections';
    protected $primaryKey = 'webhook_id';

    protected $fillable = [
        'name', 'webhook_id', 'bank_name', 'preferred_bank',
        'created_at', 'environment', 'account_number',
    ];

}
