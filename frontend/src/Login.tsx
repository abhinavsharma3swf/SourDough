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
        <div className="flex min-h-screen items-center justify-center bg-[#efbd84] p-6">
            <div className="w-full max-w-md rounded-[2rem] border border-[#f8d39f] bg-[#fff4cf] p-8 shadow-2xl">
                <h2
                    className="mb-2 text-4xl font-black text-[#6b2d05]"
                    style={{ fontFamily: "Cooper Black, serif" }}
                >
                    Log In
                </h2>

                <p className="mb-6 text-sm leading-6 text-[#7a3f16]">
                    Log in to place, view, and manage your sourdough bread orders.
                </p>

                <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-bold text-[#5a2605]"
                        >
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
                            className="w-full rounded-xl border border-[#d89a5f] bg-[#fffaf0] px-4 py-3 text-[#4b2105] outline-none placeholder:text-[#9a6a45] focus:border-[#6b2d05] focus:ring-2 focus:ring-[#9a5a32]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-bold text-[#5a2605]"
                        >
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
                            className="w-full rounded-xl border border-[#d89a5f] bg-[#fffaf0] px-4 py-3 text-[#4b2105] outline-none placeholder:text-[#9a6a45] focus:border-[#6b2d05] focus:ring-2 focus:ring-[#9a5a32]"
                        />
                    </div>

                    {errorMessage && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-full bg-[#6b2d05] px-4 py-3 font-bold text-[#fff4cf] shadow-lg transition hover:bg-[#552304] hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
};