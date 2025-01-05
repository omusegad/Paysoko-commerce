"use client"
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    // Logout function
    const handleLogout = () => {
        // Clear any session data (localStorage, cookies, etc.)
        localStorage.removeItem("token");

        // Redirect to login page after logout
        router.push("/login");
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">Paysoko</span>
            </div>
            <nav className="space-x-4">
                <button
                    onClick={handleLogout}
                    className="text-blue-100 px-4 py-2 rounded-lg font-semibold"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
