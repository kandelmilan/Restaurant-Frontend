import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ease = [0.25, 0.1, 0.25, 1];
const API = "http://127.0.0.1:8000/api/heroes";

export default function Hero() {
    const [hero, setHero] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(API);
                if (res.data.length === 0) return;
                const sorted = res.data.sort((a, b) =>
                    String(b.id).localeCompare(String(a.id), undefined, { numeric: true })
                );
                setHero(sorted[0]);
            } catch (err) {
                console.error("Error fetching hero:", err);
            }
        };
        fetchHero();
    }, []);

    if (!hero) return null;

    return (
        <section className="relative bg-[#f8f5f2] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-transparent to-red-100/30 dark:from-orange-900/20 dark:to-red-900/10 pointer-events-none" />

            <div className="min-h-[90vh] flex items-center py-12 md:py-16 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">

                        {/* LEFT */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, ease }}
                            className="max-w-xl"
                        >
                            <p className="text-xs md:text-sm tracking-[0.25em] text-orange-500 mb-3">
                                {hero.tagline}
                            </p>
                            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-gray-900 dark:text-white">
                                {hero.title} <br />
                                <span className="text-orange-500">{hero.highlight}</span>
                            </h1>
                            <p className="mt-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                                {hero.description}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-7">
                                <Link to="/menu">
                                    <button className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-orange-600 transition duration-300">
                                        {t('hero.orderNow')}
                                    </button>
                                </Link>
                                <button className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300">
                                    {t('hero.learnMore')}
                                </button>
                            </div>
                        </motion.div>

                        {/* RIGHT IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.3, ease }}
                            className="w-full flex justify-center md:justify-end"
                        >
                            <div className="relative w-full h-[320px] md:h-[520px] lg:h-[600px]">
                                <img
                                    src={hero.image}
                                    alt="Food"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}