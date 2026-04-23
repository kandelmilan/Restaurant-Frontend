import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationForm from "./ReservationForm";

export default function CallToAction() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* CTA SECTION */}
            <section className="px-4 md:px-6 mt-16 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 py-14 px-6 md:px-16 text-center"
                >

                    {/* Background glow */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="font-serif italic text-2xl md:text-5xl text-white mb-4">
                            Ready to Begin Your Journey?
                        </h2>

                        <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto mb-8">
                            Reserve your table or order for delivery. Experience something special today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                            <Link to="/menu">
                                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
                                    Browse Menu
                                </button>
                            </Link>

                            <button
                                onClick={() => setShowModal(true)}
                                className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
                            >
                                Reserve a Table
                            </button>

                        </div>
                    </div>
                </motion.div>
            </section>

            {/* RESERVATION MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                >
                    <ReservationForm onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    );
}