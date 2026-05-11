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
    inserted_at?: string;
    updated_at?: string;
    status: string;
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
            .from("orders")
            .select("*")
            .order("inserted_at", { ascending: false });

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

    setTimeout(handleLogout, 600000);

    useEffect(() => {
        fetchOrders();
    }, []);

    const updatedStatus = async (orderId: number) => {
        const newOrders = orders.map((order)=> {
            if(orderId === order.id)
            return {...order, status: "Active"};
            return order;
        })
        setOrders(newOrders);

        const {data} = await supabase
            .from("orders")
            .update({status: "Confirmed"})
            .eq('id', orderId)
        console.log(data);
    }

    const status = [
        {label: "Confirmed", value: "Confirmed"},
        {label: "Pending", value: "Pending"},
    ]



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
                                <th className="border-b px-4 py-3 text-left">Status</th>
                                <th className="border-b px-4 py-3 text-left">Created</th>
                                <th className="border-b px-4 py-3 text-left">Updated At</th>

                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="border-b px-4 py-3">{order.id}</td>
                                    <td className="border-b px-4 py-3">{order.name}</td>
                                    <td className="border-b px-4 py-3">
                                        <a target="_blank" href={`mailto:${order.email}`}> {order.email}
                                        </a>
                                    </td>
                                    <td className="border-b px-4 py-3">{order.phone}</td>
                                    <td className="border-b px-4 py-3">{order.quantity}</td>
                                    <td className="border-b px-4 py-3">
                                        <select className="border-b px-4 py-3"
                                                onChange={()=>updatedStatus(order.id)}>
                                            <option key={order.status} value={order.status}>{order.status}</option>
                                            {order.status !== "confirmed" && <option key={status[0].label} value={status[0].value}>{status[0].label}</option>}
                                            {order.status === 'Confirmed' && <option key={status[1].label} value={status[1].value}>{status[1].label}</option>}
                                        </select>
                                    </td>
                                    <td className="border-b px-4 py-3">
                                        {order.inserted_at
                                            ? new Date(order.inserted_at).toLocaleString()
                                            : "-"}
                                    </td>
                                    <td className="border-b px-4 py-3">
                                        {order.updated_at
                                            ? new Date(order.updated_at).toLocaleString()
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