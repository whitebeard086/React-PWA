<?php

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BillsController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GatewayController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\DisputesController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Controllers\BlocWebhookController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\HandymanController;
use App\Http\Controllers\Admin\HomeAdminController;
use App\Http\Controllers\Admin\UsersAdminController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

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
Route::webhooks('paystack/webhook');
Route::post('/webhooks', [BlocWebhookController::class, 'handle']);

// Home Routes
Route::get('/home/guest', [HomeController::class, 'guest']);

// Browse routes
Route::get('/browse', [BrowseController::class, 'index']);
Route::post('/browse/category', [BrowseController::class, 'get_category']);
Route::post('/profile/provider', [UserController::class, 'get_provider']);


// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Authentication routes
    Route::get('/profile/user', [UserController::class, 'get_user']);
    Route::get('/countries', [UserController::class, 'get_countries']);
    Route::get('/categories', [UserController::class, 'get_categories']);
    Route::post('/category/subcategories', [UserController::class, 'get_subcategories']);
    Route::post('/profile/virtual-account', [UserController::class, 'assign_virtual_account']);
    Route::post('/profile/image', [UserController::class, 'user_image']);
    Route::post('/profile/phone', [UserController::class, 'update_phone']);
    Route::post('/profile/kyb', [UserController::class, 'address']);
    Route::post('/profile/kyb/update', [UserController::class, 'update_kyb']);
    Route::post('/profile/bvn/{userID}', [UserController::class, 'update_bvn']);
    Route::post('/profile/phone/verify', [UserController::class, 'verify_phone']);
    Route::post('/profile/service/new', [UserController::class, 'new_service']);
    Route::post('/profile/service/update', [UserController::class, 'update_service']);
    Route::post('/profile/banner/upload', [UserController::class, 'upload_banner']);
    Route::post('/profile/pin', [UserController::class, 'create_pin']);
    Route::post('/profile/pin/update', [UserController::class, 'update_pin']);
    Route::post('/profile/delete', [AuthController::class, 'delete_account']);
    Route::post('/profile/delete/cancel', [AuthController::class, 'cancel_delete_account']);

    Route::post('/profile/view', [UserController::class, 'update_profile_view']);

    // Home routes
    Route::get('/home', [HomeController::class, 'index']);
    Route::post('/category', [HomeController::class, 'create_category']);
    Route::post('/category/update', [HomeController::class, 'update_category']);

    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Request routes
    Route::get('/requests', [RequestsController::class, 'index']);
    Route::post('/requests/disputes/dispute', [DisputesController::class, 'get_dispute']);
    Route::post('/requests/disputes/dispute/send-message', [DisputesController::class, 'send_message']);
    Route::post('/service/dispute/close', [DisputesController::class, 'close_dispute']);

    // Payment Routes
    Route::get('/payments', [PaymentsController::class, 'index']);

    // Deposit Routes
    Route::post('/paystack/deposit', [GatewayController::class, 'paystackDeposit']);
    Route::post('/paystack/verify', [GatewayController::class, 'verifyPaystackPayment']);
    Route::post('/deposit/update', [GatewayController::class, 'updateTransaction']);

    // Withdrawal Routes 
    Route::get('/withdraw', [WithdrawalController::class, 'index']);
    Route::post('/withdraw/new-account', [WithdrawalController::class, 'add_account']);
    Route::post('/withdraw/payout', [WithdrawalController::class, 'payout_customer']);
    Route::post('/withdraw/account/resolve', [WithdrawalController::class, 'resolve_account_number']);
    Route::post('/withdraw/transfer-recipient', [WithdrawalController::class, 'create_transfer_recipient']);
    Route::post('/withdraw/account/delete', [WithdrawalController::class, 'remove_account']);

    // Chat Routes
    Route::post('/chat', [ChatController::class, 'chat']);
    Route::post('/chat/invoice', [ChatController::class, 'invoice']);
    Route::post('/chat/invoice/notification', [ChatController::class, 'send_invoice_notification']);
    Route::post('/chat/new-message/mail', [ChatController::class, 'new_message_email']);
    Route::post('/chat/send-message', [ChatController::class, 'send_message']);
    Route::post('/chat/delete-message', [ChatController::class, 'delete_message']);

    // Booking Routes
    Route::post('/book-service', [BookingController::class, 'book_service']);
    Route::post('/service/start', [BookingController::class, 'start_service']);
    Route::post('/service/cancel', [BookingController::class, 'cancel_service']);
    Route::post('/service/complete', [BookingController::class, 'complete_service']);
    Route::post('/service/confirm', [BookingController::class, 'confirm_service']);
    Route::post('/service/dispute/new', [BookingController::class, 'open_dispute']);

    // Bills Routes
    Route::get('/bills/operators', [BillsController::class, 'get_operators']);
    Route::get('/bills/operators/{bill}', [BillsController::class, 'get_bill_operators']);
    Route::post('/bills/operator_products', [BillsController::class, 'get_operator_products']);
    Route::post('/bills/verify_customer', [BillsController::class, 'verify_customer']);
    Route::post('/bills/operator/products', [BillsController::class, 'get_products']);
    Route::post('/bills/airtime', [BillsController::class, 'buy_airtime']);
    Route::post('/bills/data', [BillsController::class, 'buy_bundle']);
    Route::post('/bills/pay', [BillsController::class, 'pay_bill']);

    // Referral routes
    Route::get('/referrals', [ReferralController::class, 'getReferrals']);

    // Kyc routes
    Route::post('/kyc', [UserController::class, 'initiate_kyc']);

    // blockhq
    Route::post('/simulae-credit', [UserController::class, 'simulate_credit']);

    // Notification Routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/new', [NotificationController::class, 'create_notification']);
    Route::post('/notifications/read', [NotificationController::class, 'mark_as_read']);
    Route::post('/notifications/read-all', [NotificationController::class, 'mark_all_as_read']);
    Route::post('/notifications/clear', [NotificationController::class, 'clear']);
});

// Admin Routes
Route::group(['prefix' => 'admin'], function(){
    // Public Routes
    Route::post('/login', [AdminAuthController::class, 'login']);

    // Protected Routes
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        // Home Routes
        Route::get('/home', [HomeAdminController::class, 'index']);

        // Users Routes
        Route::get('/users', [UsersAdminController::class, 'index']);

        // Handyman Routes
        Route::get('/enquiries', [HandymanController::class, 'enquiries']);
        Route::post('/enquiries/enquiry', [HandymanController::class, 'enquiry']);
        Route::get('/disputes', [HandymanController::class, 'disputes']);
        Route::post('/disputes/dispute', [HandymanController::class, 'dispute']);
        Route::post('/disputes/dispute/refund-client', [HandymanController::class, 'refund_client']);
        Route::post('/disputes/dispute/pay-provider', [HandymanController::class, 'pay_provider']);
    });
});