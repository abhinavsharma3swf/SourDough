import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {useNavigate} from "react-router-dom";

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

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);


export const UserHistory = () => {

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

    console.log(loading, errorMessage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border-b px-4 py-3 text-left">Name</th>
                    <th className="border-b px-4 py-3 text-left">Phone</th>
                    <th className="border-b px-4 py-3 text-left">Quantity</th>
                    <th className="border-b px-4 py-3 text-left">Status</th>
                    <th className="border-b px-4 py-3 text-left">Updated At</th>

                </tr>
                </thead>
                {orders.length > 0 ?
                    <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border-b px-4 py-3">{order.name}</td>
                        <td className="border-b px-4 py-3">{order.phone}</td>
                        <td className="border-b px-4 py-3">{order.quantity}</td>
                        <td className="border-b px-4 py-3">
                            <select className="border-b px-4 py-3">
                                    {/*// onChange={()=>updatedStatus(order.id)}>*/}
                                <option key={order.status} value={order.status}>{order.status}</option>
                                {/*{order.status !== "confirmed" && <option key={status[0].label} value={status[0].value}>{status[0].label}</option>}*/}
                                {/*{order.status === 'Confirmed' && <option key={status[1].label} value={status[1].value}>{status[1].label}</option>}*/}
                            </select>
                        </td>
                        <td className="border-b px-4 py-3">
                            {order.updated_at
                                ? new Date(order.updated_at).toLocaleString()
                                : "-"}
                        </td>
                    </tr>
                ))}
                    </tbody> : <p className="border align-items">No Orders Found</p>}
            </table>
        </div>
    )
}