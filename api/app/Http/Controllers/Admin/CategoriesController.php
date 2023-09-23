<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Traits\UploadImageTrait;
use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{
    public function categories()
    {
        try {
            $categories = Category::with('SubCategories.Services', 'Services')->withCount('SubCategories')->get();

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
            $category = Category::with('SubCategories.Services', 'Services.SubCategory')->where('slug', $request->slug)->first();

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
            $category = Category::with('SubCategories.Services', 'Services')->where('slug', $request->slug)->first();

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

            if($request->name && $request->name !== '') {
                $category->name = $request->name;
                $category->slug = Str::slug($category->name);
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

    public function update_sub_category(Request $request)
    {
        $request->validate([
            'slug' => 'required|string',
            'name' => 'required|string',
        ]);
        
        try {
            $sub_cat = SubCategory::where('slug', $request->slug)->first();
            $sub_cat->name = $request->name;
            $sub_cat->slug = Str::slug($sub_cat->name);
            $sub_cat->save();
            
            return response()->json([
                'status' => 'success',
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function new_sub_category(Request $request)
    {
        $request->validate([
            'slug' => 'required|string',
            'name' => 'required|string',
        ]);
        
        try {
            $category = Category::where('slug', $request->slug)->first();
            $sub_cat = new SubCategory;
            $sub_cat->name = $request->name;
            $sub_cat->category_id = $category->id;
            $sub_cat->slug = Str::slug($request->name);
            $sub_cat->save();

            return response()->json([
                'status' => 'success',
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}