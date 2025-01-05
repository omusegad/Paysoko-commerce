<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * @OA\Post(
     *     path="/orders",
     *     tags={"orders"},
     *     summary="Place an order",
     *     description="Creates a new order based on items in the Redis cart",
     *     operationId="placeOrder",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="items",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="product_code", type="string", example="Pineapple_Inc_KE_8aztdcizacca"),
     *                     @OA\Property(property="product_name", type="string", example="Floveme Power Bank 2S 20000mAh"),
     *                     @OA\Property(property="product_quantity", type="integer", example=1),
     *                     @OA\Property(property="product_price", type="number", format="float", example=2000),
     *                     @OA\Property(property="product_total", type="number", format="float", example=2000)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Order placed successfully",
     *
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Cart is empty",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Cart is empty")
     *         )
     *     )
     * )
     */
    public function placeOrder(Request $request)
    {

        try {
          // Fetch cart items from Redis
          $cart = Redis::lrange('cart', 0, -1);
            if (empty($cart)) {
               return response()->json(['message' => 'Cart is empty'], 400);
            }

          // Process cart items
          $items = array_map(function ($item) {
             return json_decode($item, true);
          }, $cart);

          // Calculate total
          $total = array_reduce($items, function ($sum, $item) {
             return $sum + $item['product_price'] * $item['product_quantity'];
          }, 0);

          // Generate a unique order ID
          $orderId = 'RONDO-' . strtoupper(Str::random(10));

          // Create the order in the database
          $order = Order::create([
            'order_id' => $orderId,
            'items' => json_encode($items),
            'total' => $total,
          ]);

          // Clear the cart from Redis
          Redis::del('cart');

          // Return the success response
          return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order,
          ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to place order'], 500);
        }


    }

    /**
     * @OA\Get(
     *     path="/orders",
     *     tags={"orders"},
     *     summary="Retrieve all orders",
     *     description="Returns a list of all orders",
     *     operationId="getAllOrders",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="order_id", type="string", example="RONDO-ABCDEFGH12"),
     *                 @OA\Property(property="items", type="string", example="[{'product_code': '...', ...}]"),
     *                 @OA\Property(property="total", type="number", format="float", example=2000)
     *             )
     *         )
     *     )
     * )
     */
    public function getAllOrders()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

     
}
