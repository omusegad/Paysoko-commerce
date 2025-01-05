"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function DashboardPage() {
    const [data, setData] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }

        const fetchData = async () => {
            try {
                const response = await api.get("/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data.items || []);
            } catch (err) {
                console.error(err);
                router.push("/login");
            }
        };

        fetchData();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Your Cart
            </h1>
            {data.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                    No items in the cart.
                </p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {item.product_name}
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit.
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                                        ${item.product_price}
                                    </span>
                                    <button className="text-white bg-blue-500 hover:bg-blue-600 font-medium py-1 px-4 rounded transition-colors duration-300">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
