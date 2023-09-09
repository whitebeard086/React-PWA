<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DisputeMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'dispute_id',
        'sender_id',
        'message',
    ]; 

    protected $casts = [
        'dispute_id' => 'float',
        'sender_id' => 'float',
    ];

    public function Medias(): MorphMany
    {
        return $this->morphMany(Media::class, 'mediaable');
    }

    public function Dispute()
    {
        return $this->belongsTo(Dispute::class);
    }
}