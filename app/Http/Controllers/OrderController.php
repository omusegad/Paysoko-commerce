<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Redis;



class OrderController extends Controller
{
    /**
    * @OA\Post(
    * path="/orders",
    * tags={"orders"},
    * summary="Place an order",
    * description="Creates a new order based on items in the cart",
    * operationId="createOrder",
    * @OA\Response(
    * response=200,
    * description="Order placed successfully",
    * @OA\JsonContent(
    * type="object",
    * @OA\Property(property="message", type="string"),
    * @OA\Property(property="order", type="object")
    * )
    * )
    * )
    */
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

    /**
    * @OA\Get(
    * path="/orders",
    * tags={"orders"},
    * summary="Retrieve all orders",
    * description="Returns a list of all orders",
    * operationId="listAllOrders",
    * @OA\Response(
    * response=200,
    * description="Successful operation",
    * @OA\JsonContent(
    * type="array",
    * @OA\Items(
    * type="object"
    * )
    * )
    * )
    * )
    */
    public function getAllOrders()
        {
            $orders = Order::all();
            return response()->json($orders);
        }
}
