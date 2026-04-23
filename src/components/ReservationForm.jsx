import React, { useState } from "react";
import axios from "axios";
import { X, User, Mail, Phone, Calendar, Clock, Users, Utensils } from "lucide-react";
import { useTranslation } from "react-i18next";
import SuccessModal from "./SuccessModal";

const API = "http://127.0.0.1:8000/api/reservation";

const inputStyle = "w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none transition";

export default function ReservationForm({ onClose }) {
    const { t } = useTranslation();
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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = t('reservation.fullName');
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = t('reservation.email');
        if (!form.phone.trim()) e.phone = t('reservation.phoneNumber');
        if (!form.date) e.date = t('reservation.date');
        if (!form.time) e.time = t('reservation.time');
        if (!form.guests) e.guests = t('reservation.guests');
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        try {
            setLoading(true);
            await axios.post(API, form);
            setSuccess(true);
        } catch (err) {
            alert(t('reservation.failed'));
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // SUCCESS SCREEN
    if (success) {
        return <SuccessModal onClose={onClose} />;
    }

    const today = new Date().toISOString().split("T")[0];

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300"
            >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 p-5 md:p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-xl md:text-2xl font-semibold">
                            {t('reservation.reserveTable')}
                        </h2>
                        <p className="text-white/80 text-sm mt-0.5">
                            {t('reservation.confirmation')}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 md:p-8 space-y-5 max-h-[80vh] overflow-y-auto"
                >
                    {/* Personal Info */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
                            {t('reservation.personalInfo')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <input
                                    name="name"
                                    placeholder={t('reservation.fullName')}
                                    className={inputStyle}
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder={t('reservation.email')}
                                    className={inputStyle}
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="relative md:col-span-2">
                                <Phone className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <input
                                    name="phone"
                                    placeholder={t('reservation.phoneNumber')}
                                    className={inputStyle}
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
                            {t('reservation.bookingDetails')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <input
                                    type="date"
                                    name="date"
                                    min={today}
                                    className={inputStyle}
                                    value={form.date}
                                    onChange={handleChange}
                                />
                                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                            </div>

                            <div className="relative">
                                <Clock className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <select
                                    name="time"
                                    className={inputStyle}
                                    value={form.time}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('reservation.selectTime')}</option>
                                    <optgroup label={t('reservation.lunch')}>
                                        {["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label={t('reservation.dinner')}>
                                        {["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </optgroup>
                                </select>
                                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                            </div>

                            <div className="relative">
                                <Users className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <select
                                    name="guests"
                                    className={inputStyle}
                                    value={form.guests}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                        <option key={n} value={n}>
                                            {n} {n === 1 ? t('reservation.guest') : t('reservation.guests')}
                                        </option>
                                    ))}
                                    <option value="9+">{t('reservation.largeParty')}</option>
                                </select>
                                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-3">
                            {t('reservation.preferences')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select
                                    name="seating"
                                    className={inputStyle}
                                    value={form.seating}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('reservation.noPreference')}</option>
                                    <option value="Indoor">{t('reservation.indoor')}</option>
                                    <option value="Outdoor">{t('reservation.outdoor')}</option>
                                    <option value="Private Room">{t('reservation.privateRoom')}</option>
                                    <option value="Bar Seating">{t('reservation.barSeating')}</option>
                                    <option value="Window Seat">{t('reservation.windowSeat')}</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    name="occasion"
                                    className={inputStyle}
                                    value={form.occasion}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('reservation.none')}</option>
                                    <option value="Birthday">{t('reservation.birthday')}</option>
                                    <option value="Anniversary">{t('reservation.anniversary')}</option>
                                    <option value="Business Dinner">{t('reservation.businessDinner')}</option>
                                    <option value="Date Night">{t('reservation.dateNight')}</option>
                                    <option value="Family Gathering">{t('reservation.familyGathering')}</option>
                                    <option value="Other">{t('reservation.other')}</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 relative">
                                <Utensils className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
                                <select
                                    name="dietary"
                                    className={inputStyle}
                                    value={form.dietary}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('reservation.none')}</option>
                                    <option value="Vegetarian">{t('reservation.vegetarian')}</option>
                                    <option value="Vegan">{t('reservation.vegan')}</option>
                                    <option value="Gluten-Free">{t('reservation.glutenFree')}</option>
                                    <option value="Nut Allergy">{t('reservation.nutAllergy')}</option>
                                    <option value="Halal">{t('reservation.halal')}</option>
                                    <option value="Jain">{t('reservation.jain')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <textarea
                            name="message"
                            placeholder={t('reservation.anySpecialRequests')}
                            className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
                            rows="3"
                            value={form.message}
                            onChange={handleChange}
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/3 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium"
                        >
                            {t('reservation.cancel')}
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
                        >
                            {loading ? `${t('reservation.sending')}...` : t('reservation.confirmReservation')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}