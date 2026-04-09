import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ease = [0.25, 0.1, 0.25, 1];
const API = "http://127.0.0.1:8000/api/heroes";

export default function Hero() {
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await axios.get(API);
                if (res.data.length === 0) return;

                const sorted = res.data.sort((a, b) => {
                    const idA = String(a.id);
                    const idB = String(b.id);
                    return idB.localeCompare(idA, undefined, { numeric: true });
                });

                setHero(sorted[0]);
            } catch (err) {
                console.error("Error fetching hero:", err);
            }
        };
        fetchHero();
    }, []);

    if (!hero) return null;

    return (
        <section className="relative bg-[#f8f5f2] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-transparent to-red-100/30 pointer-events-none" />

            <div className="min-h-[90vh] flex items-center py-12 md:py-16 relative z-10">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">

                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, ease }}
                            className="max-w-xl"
                        >
                            <p className="text-xs md:text-sm tracking-[0.25em] text-orange-500 mb-3">
                                {hero.tagline}
                            </p>

                            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-gray-900">
                                {hero.title} <br />
                                <span className="text-orange-500">{hero.highlight}</span>
                            </h1>

                            <p className="mt-5 text-gray-600 leading-relaxed">
                                {hero.description}
                            </p>

                            {/* Static Buttons */}
                            <div className="flex flex-wrap gap-4 mt-7">
                                <button className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition duration-300">
                                    Order Now →
                                </button>
                                <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>

                        {/* RIGHT IMAGE */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.3, ease }}
                            className="w-full h-full flex justify-center md:justify-end"
                        >
                            <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]">
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