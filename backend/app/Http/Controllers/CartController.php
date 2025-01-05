<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CartController extends Controller
{
    /**
    * @OA\Post(
    * path="/cart",
    * tags={"cart"},
    * summary="Add item to cart",
    * description="Adds a product to the Redis cart",
    * operationId="addToCart",
    * @OA\RequestBody(
    * required=true,
    * @OA\JsonContent(
    * type="object",
    * @OA\Property(property="product_code", type="string", example="Pineapple_Inc_KE_8aztdcizacca"),
    * @OA\Property(property="product_name", type="string", example="Floveme Power Bank 2S 20000mAh"),
    * @OA\Property(property="product_quantity", type="integer", example=1),
    * @OA\Property(property="product_price", type="number", format="float", example=2000)
    * )
    * ),
    * @OA\Response(
    * response=201,
    * description="Item added to cart",
    * @OA\JsonContent(
    * type="object",
    * @OA\Property(property="message", type="string", example="Item added to cart")
    * )
    * ),
    * @OA\Response(
    * response=500,
    * description="Failed to add item to cart",
    * @OA\JsonContent(
    * type="object",
    * @OA\Property(property="message", type="string", example="Failed to add item to cart")
    * )
    * )
    * )
    */
    public function addToCart(Request $request)
    {
        try {
            $item = $request->validate([
                'product_code' => 'required|string',
                'product_name' => 'required|string',
                'product_quantity' => 'required|integer',
                'product_price' => 'required|numeric',
            ]);

            // Add the item to Redis cart list (lpush adds to the left of the list)
            Redis::lpush('cart', json_encode($item));

            return response()->json(['message' => 'Item added to cart'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to add item to cart'], 500);
        }
    }

    /**
    * View cart items
    *
    * @OA\Get(
    * path="/cart",
    * tags={"cart"},
    * summary="View cart items",
    * description="Retrieves all items currently in the cart",
    * operationId="viewCart",
    * @OA\Response(
    * response=200,
    * description="Successful operation",
    * @OA\JsonContent(
    * oneOf={
    * @OA\Schema(
    * type="object",
    * @OA\Property(property="message", type="string", example="Cart is empty")
    * ),
    * @OA\Schema(
    * type="array",
    * @OA\Items(
    * type="object",
    * @OA\Property(property="product_code", type="string", example="Pineapple_Inc_KE_8aztdcizacca"),
    * @OA\Property(property="product_name", type="string", example="Floveme Power Bank 2S 20000mAh"),
    * @OA\Property(property="product_quantity", type="integer", example=1),
    * @OA\Property(property="product_price", type="number", format="float", example=2000)
    * )
    * )
    * }
    * )
    * ),
    * @OA\Response(
    * response=500,
    * description="Failed to fetch cart"
    * )
    * )
    */
    public function viewCart(){
        try {
           $cart = Redis::lrange('cart', 0, -1);

        if (empty($cart)) {
           return response()->json(['message' => 'Cart is empty'], 200);
        }

            $items = array_map(function ($item) {
            return json_decode($item, true);
            }, $cart);

            return response()->json($items, 200);
        } catch (\Exception $e) {
           return response()->json(['message' => 'Failed to fetch cart'], 500);
        }
    }

    /**
    * Remove all items from the cart
    *
    * @OA\Delete(
    * path="/cart",
    * tags={"cart"},
    * summary="Clear the cart",
    * description="Removes all items currently in the cart",
    * operationId="clearCart",
    * @OA\Response(
    * response=200,
    * description="Cart cleared successfully",
    * @OA\JsonContent(
    * type="object",
    * @OA\Property(property="message", type="string", example="Cart cleared")
    * )
    * ),
    * @OA\Response(
    * response=500,
    * description="Failed to clear the cart"
    * )
    * )
    */
    public function clearCart(){
        try {
            // Remove all items from the Redis cart
            Redis::del('cart');
            return response()->json(['message' => 'Cart cleared'], 200);
        } catch (\Exception $e) {
                return response()->json(['message' => 'Failed to clear cart'], 500);
        }
    }

}
