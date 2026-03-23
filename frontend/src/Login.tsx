import { useState } from "react";
import {createClient} from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface LoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const [loginFormData, setLoginFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const { email, password } = loginFormData;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (data.user) {
            const { error: userInsertError } = await supabase
                .from("users")
                .upsert([
                    {
                        id: data.user.id,
                        email: data.user.email,
                    }
                ]);

            if (userInsertError) {
                setErrorMessage(userInsertError.message);
                setLoading(false);
                return;
            }
        }

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
        navigate("/form");
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-50 to-cyan-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-7 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Log In</h2>
                <p className="text-sm text-gray-500 mb-5">
                    Log in to view and manage your bread orders.
                </p>

                <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={loginFormData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            required
                            id="password"
                            name="password"
                            type="password"
                            value={loginFormData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {errorMessage && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
};