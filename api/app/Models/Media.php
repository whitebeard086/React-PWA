<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'mediaable_id',
        'mediaable_type',
        'file',
    ];

    protected $casts = [
        'mediaable_id' => 'float',
    ];

    public function mediaable(): MorphTo 
    {
        return $this->morphTo();   
    }
}