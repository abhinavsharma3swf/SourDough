import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface InputFormType {
    name: string;
    email: string;
    phone: string;
    quantity: number;
}

export const InputForm = () => {
    const [formData, setFormData] = useState<InputFormType>({
        name: "",
        email: "",
        phone: "",
        quantity: 1,
    });

    const [submitted, setSubmitted] = useState<InputFormType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     setSubmitted(formData);
    // };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("instruments") // make sure this matches your table name EXACTLY
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    quantity: formData.quantity,
                },
            ])
            .select();

        if (error) {
            console.error("Insert error:", error);
            return;
        }

        console.log("Inserted:", data);

        setSubmitted(formData);

        // optional: reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            quantity: 1,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-50 to-cyan-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-7 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800">Order Form</h2>
                <p className="text-sm text-gray-500 mt-2 mb-6">
                    Fill in your details below.
                </p>

                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            min={1}
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        Submit
                    </button>

                </form>

                {submitted && (
                    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <h3 className="font-bold text-gray-800 mb-2">Submitted Data</h3>
                        <p><strong>Name:</strong> {submitted.name}</p>
                        <p><strong>Email:</strong> {submitted.email}</p>
                        <p><strong>Phone:</strong> {submitted.phone}</p>
                        <p><strong>Quantity:</strong> {submitted.quantity}</p>
                    </div>
                )}
            </div>
        </div>
    );
};