import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {useNavigate, Link} from "react-router-dom";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface OrderRow {
    id: number;
    name: string;
    email: string;
    phone: string;
    quantity: number;
    created_at?: string;
}

export const AdminDashboard = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase
            .from("Order_Table")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        setOrders(data ?? []);
        setLoading(false);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            return;
        }

        navigate("/");
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">All customer orders</p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to="/"
                            className="rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold"
                        >
                            Home
                        </Link>

                        <button
                            onClick={fetchOrders}
                            className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold"
                        >
                            Refresh
                        </button>

                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-gray-800 px-4 py-2 text-white font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p>Loading orders...</p>
                ) : errorMessage ? (
                    <p className="text-red-600">{errorMessage}</p>
                ) : orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b px-4 py-3 text-left">ID</th>
                                <th className="border-b px-4 py-3 text-left">Name</th>
                                <th className="border-b px-4 py-3 text-left">Email</th>
                                <th className="border-b px-4 py-3 text-left">Phone</th>
                                <th className="border-b px-4 py-3 text-left">Quantity</th>
                                <th className="border-b px-4 py-3 text-left">Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border-b px-4 py-3">{order.id}</td>
                                    <td className="border-b px-4 py-3">{order.name}</td>
                                    <td className="border-b px-4 py-3">{order.email}</td>
                                    <td className="border-b px-4 py-3">{order.phone}</td>
                                    <td className="border-b px-4 py-3">{order.quantity}</td>
                                    <td className="border-b px-4 py-3">
                                        {order.created_at
                                            ? new Date(order.created_at).toLocaleString()
                                            : "-"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};