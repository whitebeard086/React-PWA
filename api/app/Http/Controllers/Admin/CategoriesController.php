<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    public function categories()
    {
        try {
            $categories = Category::with('SubCategories', 'Services')->withCount('SubCategories')->get();

            return response()->json([
                'status' => 'success',
                'categories' => $categories,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}