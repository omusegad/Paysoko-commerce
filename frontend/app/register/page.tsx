"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";


// Define validation schema using yup
const schema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Name should be at least 3 characters long"),
    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password should be at least 6 characters long"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
});

type FormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

// Define the registration function to be used with useMutation
const registerUser = async (userData: FormData) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
            userData
        );
        return response.data
    } catch (error:any) {
        console.error(
            "Registration failed:",
            error.response?.data || error.message
        );
    }
};

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Initialize the form with react-hook-form and validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setSuccess(data.message);
            setError("");
            const router = useRouter();
            setTimeout(() => {
                router.push("/login");
            }, 1000); // Redirect after 2 seconds
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || "Registration failed.");
            setSuccess("");
        },
    });

    const onSubmit = async (data: FormData) => {
        await mutateAsync(data); // Use mutateAsync for async submission
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200"
            >
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Register
                </h1>
                {error && (
                    <p className="text-red-500 text-sm font-semibold mb-4 text-center">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-500 text-sm font-semibold mb-4 text-center">
                        {success}
                    </p>
                )}

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 ${
                            errors.password_confirmation
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        {...register("password_confirmation")}
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-sm">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition duration-300 ease-in-out"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <p className="text-gray-500 text-sm mt-6 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
