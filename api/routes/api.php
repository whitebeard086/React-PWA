<?php

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GatewayController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\Auth\AuthController;

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
    // Authentication routes
    Route::get('/profile/user', [UserController::class, 'get_user']);
    Route::post('/profile/provider', [UserController::class, 'get_provider']);
    Route::get('/countries', [UserController::class, 'get_countries']);
    Route::get('/categories', [UserController::class, 'get_categories']);
    Route::post('/category/subcategories', [UserController::class, 'get_subcategories']);
    Route::post('/profile/virtual-account', [UserController::class, 'assign_virtual_account']);
    Route::post('/profile/image', [UserController::class, 'user_image']);
    Route::post('/profile/phone', [UserController::class, 'update_phone']);
    Route::post('/profile/phone/verify', [UserController::class, 'verify_phone']);
    Route::post('/profile/service/new', [UserController::class, 'new_service']);
    Route::post('/profile/service/update', [UserController::class, 'update_service']);
    Route::post('/profile/banner/upload', [UserController::class, 'upload_banner']);

    // Home routes
    Route::get('/home', [HomeController::class, 'index']);
    Route::post('/category', [HomeController::class, 'create_category']);
    Route::post('/category/update', [HomeController::class, 'update_category']);

    // Browse routes
    Route::get('/browse', [BrowseController::class, 'index']);
    Route::post('/browse/category', [BrowseController::class, 'get_category']);

    // Request routes
    Route::get('/requests', [RequestsController::class, 'index']);

    // Payment Routes
    Route::get('/payments', [PaymentsController::class, 'index']);

    // Deposit Routes
    Route::post('/paystack/deposit', [GatewayController::class, 'paystackDeposit']);
    Route::post('/paystack/verify', [GatewayController::class, 'verifyPaystackPayment']);

    // Chat Routes
    Route::post('/chat', [ChatController::class, 'chat']);
    Route::post('/chat/invoice', [ChatController::class, 'invoice']);
    Route::post('/chat/send-message', [ChatController::class, 'send_message']);
    Route::post('/chat/delete-message', [ChatController::class, 'delete_message']);

    // Booking Routes
    Route::post('/book-service', [BookingController::class, 'book_service']);
    Route::post('/service/complete', [RequestsController::class, 'complete_service']);
});