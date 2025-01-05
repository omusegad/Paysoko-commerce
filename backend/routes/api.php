<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\PasswordResetController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;

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


//handling Auth Api
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Handling Cart api
Route::prefix('cart')->group(function () {
    Route::post('/', [CartController::class, 'addToCart']);
    Route::delete('/{itemId}', [CartController::class, 'removeFromCart']);
    Route::get('/', [CartController::class, 'viewCart']);
});

// Handling orders api
Route::prefix('orders')->group(function () {
    Route::post('/', [OrderController::class, 'placeOrder']);
    Route::get('/', [OrderController::class, 'getAllOrders']);
});

