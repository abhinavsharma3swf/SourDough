import {useState} from "react";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface SignUpForm {
    email: string;
    password: string;
}

export const SignUp = () => {

    const [signUpFormData, setSignUpFormData] = useState<SignUpForm>({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(signUpFormData, "signUpFormData")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        const { email, password } = signUpFormData;

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        setSuccessMessage("Account created.");
        setSignUpFormData({
            email: "",
            password: "",
        });
        setLoading(false);
    };


    return (
        <div
            className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-50 to-cyan-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-7 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-5">Sign Up Form</h2>

                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email (Required)
                        </label>
                        <input
                            required
                            id="email"
                            name="email"
                            value={signUpFormData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            password (Required)
                        </label>
                        <input
                            required
                            id="password"
                            name="password"
                            type="password"
                            value={signUpFormData.password}
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

                    {successMessage && (
                        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                            {successMessage}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        Sign Up
                    </button>
                    {loading ? "Creating account..." : "Sign Up"}
                </form>
            </div>
        </div>
    )
}