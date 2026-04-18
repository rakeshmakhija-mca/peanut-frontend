import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // 🔥 SIMPLE FRONTEND AUTH (demo)
        if (email === "admin@qrcode.com" && password === "123456") {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}