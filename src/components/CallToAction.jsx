import React from "react";
import { motion } from "framer-motion";

export default function CallToAction() {
    const ease = [0.2, 0, 0, 1];

    return (
        <section className="px-6 mt-24">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 py-16 px-8 md:px-16 text-center"
            >
                {/* subtle background glow */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]"></div>

                {/* Content */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-display italic text-3xl md:text-5xl text-white mb-4"
                >
                    Ready to Begin Your Journey?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-white/90 text-sm md:text-base max-w-xl mx-auto mb-8"
                >
                    Reserve your table or order for delivery. Experience the harmony of
                    two ancient cuisines.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    {/* Browse Menu */}
                    <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-md">
                        Browse Menu
                    </button>

                    {/* Call to Reserve */}
                    <button className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300">
                        Call to Reserve
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}