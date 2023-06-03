<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $services = Service::with('Category', 'SubCategory', 'Workdays', 'User')->get();

        return response()->json([
            'status' => 'success',
            'categories' => $categories,
            'services' => $services,
        ]);
    }

    public function create_category(Request $request)
    {
        $category = new Category;
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);
        
        if ($request->hasFile('icon')) {
            if ($category->icon) {
                Storage::disk('wasabi')->delete($category->icon);
            }

            $category->icon = $request->file('icon')->storePublicly(
                "Categories/icons",
                'wasabi'
            );
        }

        $category->save();

        return response()->json([
            'status' => 'success',
            'category' => $category,
        ], 201); 
    }
}