"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

// Item type for the cart reflecting the provided structure
interface CartItem {
    product_code: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
}

const fetchCartItems = async (): Promise<CartItem[]> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/cart`
        );
        return response.data || [];
    } catch (error: any) {
        throw new Error("Error fetching cart items" + error);
    }
};

const placeOrder = async (cartItems: CartItem[]) => {
    // Map cart items to the format needed by the order endpoint
    const orderData = {
        items: cartItems.map((item) => ({
            product_code: item.product_code,
            product_name: item.product_name,
            product_quantity: item.product_quantity,
            product_price: item.product_price,
            product_total: item.product_price * item.product_quantity,
        })),
    };

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
            orderData
        );
        return response.data;
    } catch (error: any) {
        throw new Error("Error placing the order");
    }
};

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);

    // React Query hook to fetch cart items
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["cart"], // Key for the query
        queryFn: fetchCartItems, // Function that fetches the data
    });

    // React Query mutation to place the order
    const mutation = useMutation({
        mutationFn: placeOrder,
        onSuccess: (data) => {
            console.log("Order placed successfully:", data);
            // Optionally, redirect the user to a success page or reset cart
        },
        onError: (error: any) => {
            console.error("Error placing order:", error.message);
        },
    });

    const calculateTotal = () => {
        return (
            (data || [])
                .reduce(
                    (total, item) =>
                        total + item.product_price * item.product_quantity,
                    0
                )
                .toFixed(2) || "0.00"
        );
    };

    useEffect(() => {
        // This ensures that the code below only runs on the client
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="container min-h-screen p-6 mx-auto">
                <span className="flex justify-between mt-3 mb-3">
                    <h1 className="text-2xl font-bold text-blue-500">
                        Your Shopping Cart
                    </h1>
                    <Link
                        href="/dashboard"
                        className="px-6 py-2 text-xl font-bold text-blue-600 border border-blue-500 rounded-full"
                    >
                        Dashboard
                    </Link>
                </span>

                <div className="text-lg text-center text-blue-400">
                    Loading cart items...
                </div>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        if (data) {
            mutation.mutate(data); // Call mutation to place the order with cart data
        }
    };

    return (
        <div className="container min-h-screen p-6 mx-auto">
            <span className="flex justify-between mt-3 mb-3">
                <h1 className="text-lg font-bold text-blue-500">
                    Your Shopping Cart
                </h1>
                <Link
                    href="/dashboard"
                    className="px-6 py-2 text-sm font-bold text-blue-600 border border-blue-500 rounded-full"
                >
                    Dashboard
                </Link>
            </span>

            {isLoading ? (
                <div className="text-lg text-center text-blue-400">
                    Loading cart items...
                </div>
            ) : isError ? (
                <div className="text-lg text-center text-red-500">
                    {error instanceof Error
                        ? error.message
                        : "Error loading cart items"}
                </div>
            ) : (data?.length || 0) === 0 ? (
                <div className="text-lg text-center text-gray-500">
                    Your cart is empty.
                </div>
            ) : (
                <div className="space-y-6">
                    {data?.map((item: CartItem) => (
                        <div
                            key={item.product_code}
                            className="flex items-center justify-between pb-6 mb-6 border-b"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-md">
                                    {/* Placeholder or product image */}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {item.product_name}
                                    </h3>
                                    <p className="text-gray-500">
                                        Product Code: {item.product_code}
                                    </p>
                                    <p className="text-gray-400">
                                        Quantity: {item.product_quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-semibold text-gray-800">
                                    $
                                    {(
                                        item.product_price *
                                        item.product_quantity
                                    ).toFixed(2)}
                                </span>
                                <button className="text-sm text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center justify-between pt-3">
                        <span className="text-xl font-semibold text-gray-800">
                            Total: ${calculateTotal()}
                        </span>
                        <button
                            className="px-8 py-2 text-blue-600 border border-blue-600 rounded-full duration-300500 hover:text-white hover:bg-blue-700"
                            onClick={handlePlaceOrder} // Trigger order submission
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
