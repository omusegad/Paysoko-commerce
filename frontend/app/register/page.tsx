import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
});

export default function Register() {
    const [successMessage, setSuccessMessage] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        setSuccessMessage("Registration successful! 🎉");
        // Simulate a real API call here
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Register
                </h1>
                {successMessage && (
                    <p className="text-green-500 font-medium mb-4 text-center">
                        {successMessage}
                    </p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className={`w-full px-4 py-2 border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full px-4 py-2 border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password")}
                        className={`w-full px-4 py-2 border ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        {...register("password_confirmation")}
                        className={`w-full px-4 py-2 border ${
                            errors.password_confirmation
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        placeholder="Confirm your password"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition duration-300 ease-in-out"
                >
                    Register
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
