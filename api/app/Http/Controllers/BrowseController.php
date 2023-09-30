<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class BrowseController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::with('Services', 'Services.Bookings')->get();

        return response()->json([
            'status' => 'success',
            'categories' => $categories,
        ]);
    }

    public function get_category(Request $request)
    {
        $category = Category::where('slug', $request->slug)->with('Services.User', 'Services.Bookings', 'SubCategories')->first();

        return response()->json([
            'status' => 'success',
            'category' => $category,
        ]);
    }

    public function get_category_by_get($slug)
    {
        $category = Category::where('slug', $slug)->with('Services.User', 'Services.Bookings', 'SubCategories')->first();
    
        return response()->json([
            'status' => 'success',
            'category' => $category,
        ]);
    }
    
}