import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API = "http://127.0.0.1:8000/api/footers";

export default function Footer() {
    const { t } = useTranslation();
    const [footer, setFooter] = useState(null);

    useEffect(() => {
        const fetchFooter = async () => {
            try {
                const res = await axios.get(API);
                if (res.data.length > 0) {
                    setFooter(res.data[0]);
                }
            } catch (err) {
                console.error("Error fetching footer:", err);
            }
        };
        fetchFooter();
    }, []);

    // Fallback data if API fails
    const footerData = footer || {
        description: "Hand-ground spices meet seasonal Japanese produce. A quiet revolution of flavor.",
        address: "2-14-5 Minami-Aoyama, Minato-ku, Tokyo",
        phone: "+81 3-1234-5678",
        email: "hello@masalazen.jp",
        lunch: "11:30 — 14:30",
        dinner: "17:30 — 22:00",
        closed: "Closed on Tuesdays",
        instagram: "#",
    };

    return (
        <footer className="relative bg-stone-950 dark:bg-gray-950 text-stone-300 dark:text-gray-400 pt-16 pb-8 overflow-hidden transition-colors duration-300">
            {/* Decorative mandalas */}
            <MandalaDecor className="absolute top-0 right-0 text-stone-700 dark:text-gray-800 opacity-20 pointer-events-none" size={200} />
            <MandalaDecor className="absolute bottom-0 left-0 text-stone-700 dark:text-gray-800 opacity-10 pointer-events-none" size={160} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Logo & description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-orange-500 text-xl">🕉️</span>
                            <h3 className="font-serif text-2xl italic text-stone-100 dark:text-white">Masala Zen</h3>
                        </div>
                        <IndianPattern className="w-32 mb-4" color="hsl(37 90% 44%)" />
                        <p className="text-sm text-stone-400 dark:text-gray-500 leading-relaxed">
                            {footerData.description}
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-stone-100 dark:text-gray-200 mb-4">
                            {t('footer.contact')}
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-stone-400 dark:text-gray-500">
                                <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span>{footerData.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-stone-400 dark:text-gray-500">
                                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                <a href={`tel:${footerData.phone}`} className="hover:text-orange-500 transition-colors">
                                    {footerData.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-stone-400 dark:text-gray-500">
                                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                <a href={`mailto:${footerData.email}`} className="hover:text-orange-500 transition-colors">
                                    {footerData.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours & Social */}
                    <div>
                        <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-stone-100 dark:text-gray-200 mb-4">
                            {t('footer.about')}
                        </h4>
                        <ul className="space-y-2 text-sm text-stone-400 dark:text-gray-500">
                            <li>
                                <span className="text-orange-500 font-semibold">{t('reservation.lunch')}:</span> {footerData.lunch}
                            </li>
                            <li>
                                <span className="text-orange-500 font-semibold">{t('reservation.dinner')}:</span> {footerData.dinner}
                            </li>
                            <li className="text-stone-500 dark:text-gray-600">
                                {footerData.closed}
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <a
                                href={footerData.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-stone-800 dark:border-gray-800 mt-12 pt-8 text-center text-xs text-stone-500 dark:text-gray-600">
                    © 2026 Masala Zen. {t('footer.privacy')} | {t('footer.terms')}
                </div>
            </div>
        </footer >
    );
}