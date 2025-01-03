<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        $cart = Redis::lrange('cart', 0, -1);
        if (empty($cart)) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $items = array_map(fn($item) => json_decode($item, true), $cart);
        $total = array_reduce($items, fn($sum, $item) => $sum + $item['price'] * $item['quantity'], 0);

        $order = Order::create([
            'items' => json_encode($items),
            'total' => $total,
        ]);

        Redis::del('cart');
        return response()->json(['message' => 'Order placed', 'order' => $order]);
    }

    public function getOrders()
    {
        $orders = Order::all();
        return response()->json($orders);
    }
}
