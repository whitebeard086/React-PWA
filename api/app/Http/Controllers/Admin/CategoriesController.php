<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\UploadImageTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

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

    public function category(Request $request)
    {
        try {
            $category = Category::with('SubCategories', 'Services')->where('slug', $request->slug)->first();

            return response()->json([
                'status' => 'success',
                'category' => $category,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update_category(Request $request)
    {
        try {
            $category = Category::with('SubCategories', 'Services')->where('slug', $request->slug)->first();

            if ($request->hasFile('banner')) {
                if ($category->banner) {
                    $category->banner = Storage::disk('wasabi')->delete($category->banner);
                }
    
                $category->banner = $request->file('banner')->storePublicly(
                    "Categories/banners",
                    'wasabi'
                );
            }

            if ($request->hasFile('icon')) {
                if ($category->icon) {
                    Storage::disk('wasabi')->delete($category->icon);
                    $category->icon = null;
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
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}