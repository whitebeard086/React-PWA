<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {
        try {
            $userId = auth()->user()->id;
            $user = User::findOrFail($userId);

            $bookingQuery = Booking::orderBy('id', 'desc')->with('Service.User', 'User', 'Service.Category')->where('status', 'completed');
            
            if ($user->profile_type_id == 1) {
                $bookings = $bookingQuery->where('user_id', $userId)->paginate(5);
            } elseif ($user->profile_type_id == 2) {
                $bookings = $bookingQuery->where('provider_id', $userId)->get();
            }

            $categories = Category::all();
            $services = Service::with('Category', 'SubCategory', 'Workdays', 'User')->get();

            return response()->json([
                'status' => 'success',
                'categories' => $categories,
                'services' => $services,
                'bookings' => $bookings
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
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

    public function update_category(Request $request)
    {
        $category = Category::where('slug', $request->slug)->first();
        if ($request->name){
            $category->name = $request->name;
            $category->slug = Str::slug($request->name);
        }
        
        if ($request->hasFile('icon')) {
            if ($category->icon) {
                Storage::disk('wasabi')->delete($category->icon);
            }

            $category->icon = $request->file('icon')->storePublicly(
                "Categories/icons",
                'wasabi'
            );
        }
        
        if ($request->hasFile('banner')) {
            if ($category->banner) {
                Storage::disk('wasabi')->delete($category->banner);
            }

            $category->banner = $request->file('banner')->storePublicly(
                "Categories/banners",
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