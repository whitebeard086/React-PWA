<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'banner',
        'slug',
        'description',
    ];

    public function Services()
    {
        return $this->hasMany(Service::class);
    }

    public function SubCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}