import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {InputForm} from "./InputForm";
import {AdminLogin} from "./AdminLogin";
import {AdminDashboard} from "./AdminDashboard";
// import {WelcomePage} from "./WelcomePage";
import {Analytics} from "@vercel/analytics/react";
import {SignUp} from "./SignUp";
import {Login} from "./Login";
import {useEffect, useState} from "react";
import type {Session} from "@supabase/supabase-js";
import {createClient} from "@supabase/supabase-js";
import {OurStoryPage} from "./OurStoryPage";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

function App() {
    const [session, setSession] = useState<Session | null>(null);

    const isAdmin: boolean = session?.user?.email === 'abhinav.sharma3@hotmail.com'


    useEffect(() => {
        const getSession = async () => {
            const {data} = await supabase.auth.getSession();
            setSession(data.session);
        };

        getSession();

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const navigate = useNavigate();

    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            return;
        }
        navigate("/");
    };

    setTimeout(handleLogout, 600000);

    return (
        <div>
            <div
                className="bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-50 relative flex items-center justify-between p-4">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <img
                        src="/sourdoughlogo.PNG"
                        alt="logo"
                        className="w-12 h-12 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">Sourdough</span>
                        <span className="text-xs text-gray-500">Homemade Bread</span>
                    </div>
                </div>

                {/* CENTER (absolute for true centering) */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="italic text-4xl underline">Homemade Sourdough Bread</span>
                </div>


                <div className="flex align-end gap-3">
                    {session ? <></> :
                        <>

                            <Link
                                to="/signup"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                            >
                                Sign-Up
                            </Link>
                            <Link
                                to="/home"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                            >
                                Home
                            </Link>
                        </>
                    }
                </div>

                {session && (
                    <button
                        onClick={handleLogout}
                        className="rounded-xl bg-red-800 px-4 py-2 text-white font-semibold"
                    >
                        Logout
                    </button>
                )}
            </div>

            <div className="flex justify-end gap-3">
                {isAdmin && <Link
                    to="/dashboard"
                    className="rounded-xl bg-green-800 px-4 py-2 text-white font-semibold"
                >
                    Admin Dashboard
                </Link>}
            </div>

            <Routes>
                <Route path="/" element={<OurStoryPage session = {session}/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/form"
                    element={session ? <InputForm session={session}/> : <Navigate to="/" replace/>}
                />
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/dashboard" element={<AdminDashboard/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <Analytics/>
        </div>
    );
}

export default App;