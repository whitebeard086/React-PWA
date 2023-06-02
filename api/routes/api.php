<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register/check-user', [AuthController::class, 'check_user']);
Route::post('/register/check-email', [AuthController::class, 'check_email']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [UserController::class, 'register']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile/user', [UserController::class, 'get_user']);
    Route::get('/countries', [UserController::class, 'get_countries']);
    Route::get('/categories', [UserController::class, 'get_categories']);
    Route::post('/category/subcategories', [UserController::class, 'get_subcategories']);
    Route::post('/profile/phone', [UserController::class, 'update_phone']);
    Route::post('/profile/phone/verify', [UserController::class, 'verify_phone']);
    Route::post('/profile/service/new', [UserController::class, 'new_service']);
    Route::post('/profile/service/update', [UserController::class, 'update_service']);
    Route::post('/profile/banner/upload', [UserController::class, 'upload_banner']);
});