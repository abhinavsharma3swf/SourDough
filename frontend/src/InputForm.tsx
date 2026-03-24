import React, {useState} from "react";
import {createClient} from "@supabase/supabase-js";
// import type {Session} from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface InputFormType {
    name: string;
    phone: string;
    email: string;
    quantity: number;
    size: string;
    status: string;
}

export const InputForm = ({session}: any) => {

    const [formData, setFormData] = useState<InputFormType>({
        name: "",
        phone: "",
        email: "",
        quantity: 1,
        size: "",
        status: "",
    });

    const [submitted, setSubmitted] = useState<InputFormType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {error} = await supabase
            .from("orders") // make sure this matches your table name EXACTLY
            .insert([
                {
                    name: formData.name,
                    email: session?.user?.email,
                    phone: formData.phone || null,
                    quantity: formData.quantity,
                    user_id: session?.user?.id,
                    size: formData.size,
                    status: 'Pending',
                },
            ])
            .select();

        if (error) {
            console.error("Insert error:", error);
            return;
        }
        setSubmitted(formData);
        // optional: reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            quantity: 1,
            size: "",
            status: "",
        });
    };

    const options = [
        { label: "Small (300 Grams approx) ", value: "Small" },
        { label: "Medium (500 Grams aprox) ", value: "Medium" },
        { label: "Large (700 Grams aprrox) ", value: "Large" },
    ]


    return (
        <div
            className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-50 to-cyan-100 flex items-center justify-center p-6">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl p-7 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800">Order Form</h2>
                <p className="text-sm text-gray-500 mt-2 mb-6">
                    Fill in your details below.
                </p>

                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Name (Required)
                        </label>
                        <input
                            required
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
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
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Choose the loaf size
                        <select
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleOptionChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                            >

                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-1">
                            Quantity (Required)
                        </label>
                        <input
                            required
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

                    <p className="text-xs text-gray-500 mt-2 mb-2 leading-relaxed space-y-3">
                        <span className="block font-medium text-gray-700">
                            Disclaimer
                        </span>

                        <span className="block">
                            By submitting this form and consuming this bread, you acknowledge and agree to the following:
                        </span>

                        <span className="block">
                            This product is homemade and is not prepared, inspected, or certified by any local, state, or federal health department or food safety authority. It may have been produced in a home kitchen that is not subject to regulatory inspection.
                        </span>

                        <span className="block">
                            By proceeding with your request, you voluntarily assume all risks associated with consumption, including but not limited to foodborne illness, allergic reactions, or other adverse effects.
                        </span>

                        <span className="block">
                            You agree to release, waive, and hold harmless the bread baker from any and all liability, claims, damages, or expenses arising from or related to the consumption of this product.
                        </span>

                        <span className="block">
                            If you have food allergies or dietary concerns, it is your responsibility to inquire about ingredients prior to consumption.
                        </span>

                        <span className="block">
                            Please allow 24-48 hours for your specially ordered loaf to be ready.
                        </span>
                    </p>

                    <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-white font-semibold shadow-lg hover:scale-[1.10] transition"
                    >
                        Submit
                    </button>

                </form>

                {submitted && (
                    <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-2">
                        <h3 className="font-bold text-gray-800 mb-2">Submitted Data</h3>
                        <p><strong>Name:</strong> {submitted.name}</p>
                        {/*<p><strong>Email:</strong> {submitted.email}</p>*/}
                        <p><strong>Phone:</strong> {submitted.phone}</p>
                        <p><strong>Quantity:</strong> {submitted.quantity}</p>
                    </div>
                )}
            </div>
        </div>
    );
};