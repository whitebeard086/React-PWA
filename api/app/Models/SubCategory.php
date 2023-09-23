<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id',
        'slug',
        'description',
    ];

    protected $casts = [
        'category_id' => 'float',
    ];
    
    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function Services()
    {
        return $this->hasMany(Service::class);
    }
}