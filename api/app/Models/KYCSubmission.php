<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KYCSubmission extends Model
{
    use HasFactory;

    protected $table = 'kyc_submissions';

    protected $fillable = [
        'user_id',
        'document_type',
        'doc_front',
        'doc_back',
        'nin',
        'status',
        'admin_notes',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
