<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('cart')->group(function () {
    Route::post('/', [CartController::class, 'addToCart']);
    Route::delete('/{itemId}', [CartController::class, 'removeFromCart']);
    Route::get('/', [CartController::class, 'getCart']);
});

Route::prefix('orders')->group(function () {
    Route::post('/', [OrderController::class, 'placeOrder']);
    Route::get('/', [OrderController::class, 'getOrders']);
});

