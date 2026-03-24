import React from "react";
import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

export default function Hero() {
    return (
        <section className="relative bg-[#f8f5f2] overflow-hidden">

            {/* Soft Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-transparent to-red-100/30 pointer-events-none" />

            {/* HERO */}
            <div className="min-h-[90vh] flex items-center px-6 md:px-16 pt-10 pb-16 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease }}
                    >
                        <p className="text-sm tracking-[0.2em] text-orange-500 mb-4">
                            EST. 2019 • TOKYO
                        </p>

                        <h1 className="font-serif text-4xl md:text-6xl leading-tight text-gray-900">
                            Indian Soul, <br />
                            <span className="text-orange-500">Japanese Heart.</span>
                        </h1>

                        <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
                            Hand-ground spices meet seasonal Japanese produce.
                            A quiet revolution of flavor in the heart of Tokyo.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-4 mt-8">
                            <button className="bg-orange-500 text-white px-7 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
                                View Menu →
                            </button>

                            <button className="border border-gray-300 px-7 py-3 rounded-full hover:bg-gray-100 hover:shadow-md transition duration-300">
                                Order Now
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, ease }}
                        className="flex justify-center md:justify-end"
                    >
                        <div className="relative w-full max-w-md md:max-w-lg rounded-3xl overflow-hidden shadow-2xl">

                            {/* Image */}
                            <img
                                src="https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg"
                                alt="Food"
                                className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition duration-700"
                            />

                            {/* Overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* STATS */}
            <div className="border-t border-gray-200 py-14 px-6 md:px-16 bg-white/60 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                    {[
                        { value: "500+", label: "HAPPY GUESTS" },
                        { value: "48", label: "SIGNATURE DISHES" },
                        { value: "5★", label: "GOOGLE RATING" },
                        { value: "6", label: "YEARS IN TOKYO" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, delay: i * 0.2, ease }}
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