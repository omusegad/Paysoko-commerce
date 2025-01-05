"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema using yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const response = await api.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                data
            );
            localStorage.setItem("token", response.data.token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
                <h1 className="mb-6 text-3xl font-extrabold text-center text-gray-800">
                    Login
                </h1>
                {error && (
                    <p className="mb-4 text-sm font-semibold text-center text-red-500">
                        {error}
                    </p>
                )}
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password")}
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="mt-6 text-sm text-center text-gray-500">
                    Don't have an account?
                    <a
                        href="/register"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
