import { Link, Routes, Route, Navigate } from "react-router-dom";
import { InputForm } from "./InputForm";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";
import { WelcomePage } from "./WelcomePage";
import { Analytics } from '@vercel/analytics/react';
function App() {
    return (
        <div>
            <div className="flex justify-center gap-4 p-4 bg-white border-b">
                <Link
                    to="/"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                >
                    Home
                </Link>

                <Link
                    to="/form"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold"
                >
                    Customer Form
                </Link>

                <Link
                    to="/admin"
                    className="rounded-lg bg-gray-800 px-4 py-2 text-white font-semibold"
                >
                    Admin
                </Link>
            </div>

            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/form" element={<InputForm />} />
                <Route
                    path="/admin"
                    element={<AdminLogin />}
                />
                <Route
                    path="/dashboard"
                    element={<AdminDashboard />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Analytics />
        </div>
    );
}

export default App;