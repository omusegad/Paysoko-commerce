"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

// Data type definitions
interface Product {
    product_code: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
}

interface Order {
    id: number;
    order_id: string;
    items: string; // JSON string to be parsed
    total: string;
    created_at: string;
    updated_at: string;
}

// Mock data
const orders: Order[] = [
    {
        id: 5,
        order_id: "RONDO-FZSSUNWNJR",
        items: '[{"product_code": "Pineapple_Inc_KE_8aztdcizacca", "product_name": "Floveme Power Bank 2S 20000mAh", "product_price": 2000, "product_quantity": 1}]',
        total: "2000.00",
        created_at: "2025-01-05T08:41:05.000000Z",
        updated_at: "2025-01-05T08:41:05.000000Z",
    },
];

// Function to send data to the cart API
const addToCartApi = async (product: Product): Promise<Product> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Failed to add product to cart");
    }

    return response.json();
};

export default function OrdersPage() {

    // React Query mutation hook
    const mutation = useMutation({
        mutationFn: addToCartApi,
        onSuccess: (data) => {
            console.log("Product added to cart:", data);
            alert("Product added to cart successfully!");
        },
        onError: (error: Error) => {
            console.error("Error adding to cart:", error.message);
            alert("Failed to add product to cart.");
        },
    });

    // Handle adding product to cart
    const handleAddToCart = (product: Product) => {

        // Call API using react-query mutation
        mutation.mutate(product);
    };

    return (
        <div className="container min-h-screen p-6 mx-auto">
            <span className="flex justify-between mt-3 mb-3">
                <h1 className="text-lg font-bold text-blue-500">
                    Order History
                </h1>
                <Link
                    href="/dashboard"
                    className="px-6 py-2 text-sm font-bold text-blue-600 border border-blue-500 rounded-full"
                >
                    Dashboard
                </Link>
            </span>

            <div className="space-y-6">
                {orders.map((order) => {
                    const items: Product[] = JSON.parse(order.items); // Parse items

                    return (
                        <div
                            key={order.id}
                            className="p-4 space-y-4 border rounded-lg shadow-md"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                Order ID: {order.order_id}
                            </h2>
                            <p className="text-gray-500">
                                Total: ${order.total}
                            </p>
                            <p className="text-sm text-gray-400">
                                Created At:{" "}
                                {new Date(order.created_at).toLocaleString()}
                            </p>

                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div
                                        key={item.product_code}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-800">
                                                {item.product_name}
                                            </h3>
                                            <p className="text-gray-600">
                                                Price: $
                                                {item.product_price.toFixed(2)}
                                            </p>
                                            <p className="text-gray-500">
                                                Quantity:{" "}
                                                {item.product_quantity}
                                            </p>
                                        </div>
                                        <button
                                            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
