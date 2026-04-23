import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReservationForm from "./ReservationForm";

export default function CallToAction() {
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            {/* CTA SECTION */}
            <section className="px-4 md:px-6 mt-16 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 dark:from-orange-600 dark:via-orange-700 dark:to-red-700 py-14 px-6 md:px-16 text-center transition-colors duration-300"
                >

                    {/* Background glow */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="font-serif italic text-2xl md:text-5xl text-white mb-4"
                        >
                            {t('cta.ready')}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-white/90 text-sm md:text-base max-w-xl mx-auto mb-8"
                        >
                            {t('cta.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >

                            <Link to="/menu">
                                <button className="bg-white hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-lg">
                                    {t('cta.browseMenu')}
                                </button>
                            </Link>

                            <button
                                onClick={() => setShowModal(true)}
                                className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 dark:hover:bg-gray-100"
                            >
                                {t('cta.reserveTable')}
                            </button>

                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* RESERVATION MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-colors duration-300"
                    onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                >
                    <ReservationForm onClose={() => setShowModal(false)} />
                </div>
            )}
        </>
    );
}