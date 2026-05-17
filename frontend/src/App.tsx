import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {InputForm} from "./InputForm";
import {AdminLogin} from "./AdminLogin";
import {AdminDashboard} from "./AdminDashboard";
import {Analytics} from "@vercel/analytics/react";
import {SignUp} from "./SignUp";
import {Login} from "./Login";
import {useEffect, useState} from "react";
import type {Session} from "@supabase/supabase-js";
import {createClient} from "@supabase/supabase-js";
import {OurStoryPage} from "./OurStoryPage";
import {UserHistory} from "./UserHistory";
import {WelcomePage} from "./WelcomePage";

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

    const [aFlag, setAFlag] = useState<boolean>(false)
    const [loginFlag, setLoginFlag] = useState<boolean>(false)

    return (
        <div className="bg-red">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/*/!* LEFT *!/*/}
                {/*<div className="flex items-center gap-3">*/}
                {/*    <img*/}
                {/*        src="/sourdoughlogo.PNG"*/}
                {/*        alt="Sourdough logo"*/}
                {/*        className="w-12 h-12 object-contain shrink-0"*/}
                {/*    />*/}

                {/*    <div className="flex flex-col">*/}
                {/*            <span className="font-semibold text-gray-800">*/}
                {/*              Sourdough*/}
                {/*            </span>*/}
                {/*            <span className="text-xs text-gray-500">*/}
                {/*                Homemade Bread*/}
                {/*            </span>*/}


                {/*        /!* CENTER / TITLE *!/*/}
                {/*        <div className="text-center sm:flex-1">*/}
                {/*              <span className="italic underline text-xl sm:text-2xl md:text-3xl text-gray-800">*/}
                {/*                Homemade Sourdough Bread*/}
                {/*              </span>*/}
                {/*        </div>*/}

                {/*        /!* RIGHT SPACER *!/*/}
                {/*        <div className="hidden sm:block w-[180px]"/>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="flex flex-colflex align-end gap-3">*/}
                {/*    {session ?*/}
                {/*        <>*/}
                {/*        </> :*/}
                {/*        <>*/}

                {/*            {!loginFlag && <Link*/}
                {/*                to="/signup"*/}
                {/*                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"*/}
                {/*                onClick={() => setLoginFlag(true)}*/}
                {/*            >*/}
                {/*                Sign-Up*/}
                {/*            </Link>}*/}

                {/*            {loginFlag &&*/}
                {/*                <Link*/}
                {/*                    to="/login"*/}
                {/*                    className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"*/}
                {/*                    onClick={() => setLoginFlag(false)}*/}
                {/*                >*/}
                {/*                    Login*/}
                {/*                </Link>*/}
                {/*            }*/}
                {/*            <Link*/}
                {/*                to="/home"*/}
                {/*                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"*/}
                {/*                onClick={() => setLoginFlag(false)}*/}
                {/*            >*/}
                {/*                Home*/}
                {/*            </Link>*/}
                {/*        </>*/}
                {/*    }*/}
                {/*</div>*/}

                {
                    session && (

                        <div className="flex justify-end gap-3">
                            {!aFlag && <Link
                                to="/history"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                                onClick={() => setAFlag(true)}
                            >
                                History
                            </Link>}

                            {aFlag && <Link
                                to="/form"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                                onClick={() => setAFlag(false)}
                            >
                                Place An Order
                            </Link>}


                            <button
                                onClick={handleLogout}
                                className="rounded-xl bg-red-800 px-4 py-2 text-white font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )
                }
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
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/about" element={<OurStoryPage session={session}/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="/form"
                    element={session ? <InputForm session={session}/> : <Navigate to="/" replace/>}
                />
                <Route
                    path="/history"
                    element={<UserHistory/>}
                />
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/dashboard" element={<AdminDashboard/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <Analytics/>
        </div>
    )
}

export default App;