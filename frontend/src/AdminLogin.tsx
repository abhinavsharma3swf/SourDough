import React, { useState } from "react";
import {createClient} from "@supabase/supabase-js";
import {useNavigate, Link} from "react-router-dom";


export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setMessage(error.message);
            return;
        }

        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-7 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>

                <form className="grid gap-4 mt-6" onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Admin email"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Admin password"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-black px-4 py-3 text-white font-semibold disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

                <div className="mt-4">
                    <Link to="/" className="text-sm text-blue-600 underline">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};