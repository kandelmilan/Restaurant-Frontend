import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export default function Hero() {
    return (
        <section className="relative bg-[#f8f5f2] overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-transparent to-red-100/30 pointer-events-none" />

            {/* HERO */}
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
                                EST. 2019 • TOKYO
                            </p>

                            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-gray-900">
                                Indian Soul, <br />
                                <span className="text-orange-500">
                                    Japanese Heart.
                                </span>
                            </h1>

                            <p className="mt-5 text-gray-600 leading-relaxed">
                                Hand-ground spices meet seasonal Japanese produce.
                                A quiet revolution of flavor in the heart of Tokyo.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-7">
                                <button className="bg-orange-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition duration-300">
                                    View Menu →
                                </button>

                                <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
                                    Order Now
                                </button>
                            </div>
                        </motion.div>

                        {/* RIGHT IMAGE - BIG & DOMINANT */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.3, ease }}
                            className="w-full h-full flex justify-center md:justify-end"
                        >
                            <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]">

                                <img
                                    src="https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg"
                                    alt="Food"
                                    className="w-full h-full object-cover rounded-2xl"
                                />

                                {/* Soft overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="border-t border-gray-200 py-12 px-6 md:px-10 bg-white/60 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    {[
                        { value: "500+", label: "HAPPY GUESTS" },
                        { value: "48", label: "SIGNATURE DISHES" },
                        { value: "5★", label: "GOOGLE RATING" },
                        { value: "6", label: "YEARS IN TOKYO" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease }}
                        >
                            <h3 className="text-3xl md:text-4xl font-serif text-[#c97a2b]">
                                {item.value}
                            </h3>
                            <p className="text-xs tracking-widest text-gray-500 mt-2">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}