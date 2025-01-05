"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

// Define the order and item types
interface Item {
    product_code: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
}

interface Order {
    id: number;
    order_id: string;
    items: string; // The items are a stringified JSON
    total: string;
    created_at: string;
    updated_at: string;
}

const fetchOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data || [];
    } catch (error: any) {
        throw new Error(
            error?.response?.data?.message || "Error fetching orders"
        );
    }
};

export default function DashboardPage() {
    const router = useRouter();

   

    // React Query hook to fetch orders
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
    });

    console.log(data)

    // Redirect to login if no token is found
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="container min-h-screen mx-auto">
            <span className="flex justify-between mt-3 mb-3">
                <h1 className="text-xl font-bold text-blue-500 ">Orders</h1>
                <div className="flex justify-between w-1/6">
                    <Link
                        href="/cart"
                        className="px-6 py-2 text-xs font-bold text-blue-600 border border-blue-500 rounded-full hover:bg-blue-600 hover:text-white"
                    >
                        View cart
                    </Link>
                    <Link
                        href="/add"
                        className="px-6 py-2 text-xs font-bold text-blue-600 border border-blue-500 rounded-full hover:bg-blue-600 hover:text-white"
                    >
                        Add to cart
                    </Link>
                </div>
            </span>

            {isLoading ? (
                <p className="text-lg text-center text-blue-400">Loading...</p>
            ) : isError ? (
                <p className="text-lg text-center text-red-500">
                    {error instanceof Error
                        ? error.message
                        : "Error loading orders"}
                </p>
            ) : data?.length === 0 ? (
                <p className="text-lg text-center text-gray-600">
                    No orders available.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-collapse rounded-lg shadow-md table-auto">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    #
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Order ID
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Product Name
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Quantity
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Price
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Total
                                </th>
                                <th className="px-4 py-2 text-left text-gray-800">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((order) => {
                                const items: Item[] = JSON.parse(order.items); // Parse items field
                                let rowIndex = 1;
                                return (
                                    <>
                                        {items.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="text-sm border-t"
                                            >
                                                <td className="px-4 py-2 text-gray-800">
                                                    {rowIndex++}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    {order.order_id}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    {item.product_name}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    {item.product_quantity}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    ${item.product_price}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    ${order.total}
                                                </td>
                                                <td className="px-4 py-2 text-gray-800">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
