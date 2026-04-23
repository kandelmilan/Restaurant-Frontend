import React, { useState } from "react";
import axios from "axios";
import { X, User, Mail, Phone, Calendar, Clock, Users } from "lucide-react";
import SuccessModal from "./SuccessModal";

const API = "http://127.0.0.1:8000/api/reservation";

const inputStyle =
    "w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none transition";

export default function ReservationForm({ onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        seating: "",
        occasion: "",
        dietary: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.post(API, form);
            setSuccess(true);
        } catch (err) {
            alert("Reservation failed. Check backend.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // SUCCESS SCREEN
    if (success) {
        return <SuccessModal onClose={onClose} />;
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 flex justify-between items-center">
                    <h2 className="text-white text-xl font-semibold">
                        Reserve a Table
                    </h2>
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
                >
                    {/* GRID */}
                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="name"
                                placeholder="Full Name *"
                                className={inputStyle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="email"
                                placeholder="Email *"
                                className={inputStyle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative md:col-span-2">
                            <Phone className="absolute left-3 top-3 text-gray-400" />
                            <input
                                name="phone"
                                placeholder="Phone *"
                                className={inputStyle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="date"
                                name="date"
                                className={inputStyle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Clock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="time"
                                name="time"
                                className={inputStyle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Users className="absolute left-3 top-3 text-gray-400" />
                            <select
                                name="guests"
                                className={inputStyle}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6].map((n) => (
                                    <option key={n}>{n} Guests</option>
                                ))}
                            </select>
                        </div>

                        {/* OPTIONAL FIELDS */}
                        <input
                            name="seating"
                            placeholder="Seating (optional)"
                            className={inputStyle}
                            onChange={handleChange}
                        />

                        <input
                            name="occasion"
                            placeholder="Occasion (optional)"
                            className={inputStyle}
                            onChange={handleChange}
                        />

                        <input
                            name="dietary"
                            placeholder="Dietary (optional)"
                            className={inputStyle}
                            onChange={handleChange}
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Message (optional)"
                        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                        rows="3"
                        onChange={handleChange}
                    />

                    {/* BUTTONS */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/3 py-3 rounded-xl border dark:border-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
                        >
                            {loading ? "Booking..." : "Confirm Reservation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}