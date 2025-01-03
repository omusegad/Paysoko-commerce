<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $item = $request->validate([
            'id' => 'required',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        Redis::lpush('cart', json_encode($item));
        return response()->json(['message' => 'Item added to cart']);
    }

    public function removeFromCart($itemId)
    {
        $cart = Redis::lrange('cart', 0, -1);

        foreach ($cart as $index => $item) {
            $item = json_decode($item, true);
            if ($item['id'] == $itemId) {
                Redis::lrem('cart', 1, json_encode($item));
                return response()->json(['message' => 'Item removed from cart']);
            }
        }

        return response()->json(['message' => 'Item not found'], 404);
    }

    public function getCart()
    {
        $cart = Redis::lrange('cart', 0, -1);
        $items = array_map(fn($item) => json_decode($item, true), $cart);

        return response()->json($items);
    }
}
