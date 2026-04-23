import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const API = "http://127.0.0.1:8000/api/testimonial";
const ease = [0.25, 0.1, 0.25, 1];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
};

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(API).then((res) => setTestimonials(res.data)).catch(console.error);
    }, []);

    return (
        <section className="bg-[#fdfaf7] dark:bg-gray-900 py-16 px-6 md:px-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <p className="text-sm text-orange-500 tracking-widest font-semibold mb-2">{t('testimonials.testimonials')}</p>
                <h2 className="font-serif text-4xl italic text-gray-900 dark:text-white">{t('testimonials.voices')}</h2>
                <div className="mt-3 flex justify-center items-center gap-3 text-orange-500">
                    <span>◦</span><span className="text-2xl">⚛︎</span><span>◦</span>
                </div>
            </div>

            <motion.div
                className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                {testimonials.map(({ id, rating, text, author }) => (
                    <motion.div
                        key={id}
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-md border border-transparent hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300"
                    >
                        <div className="flex mb-4 text-orange-500">
                            {[...Array(rating)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.538 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.783.57-1.838-.196-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.037 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                </svg>
                            ))}
                        </div>
                        <blockquote className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm md:text-base">"{text}"</blockquote>
                        <p className="font-bold text-gray-900 dark:text-white">{author}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}