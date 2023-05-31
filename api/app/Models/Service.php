<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'sub_category_id',
        'workdays_id',
        'title',
        'slug',
        'description',
        'starting_price',
    ];

    protected $casts = [
        'user_id' => 'float',
        'category_id' => 'float',
        'sub_category_id' => 'float',
        'workdays_id' => 'float',
        'starting_price' => 'float',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Category()
    {
        return $this->belongsTo(Category::class);
    }

    public function Workdays()
    {
        return $this->belongsTo(Workdays::class);
    }
    
    public function SubCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    
}