import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        rating: 5,
        text: `"The butter chicken here rivals anything I've had in Delhi. The atmosphere is pure tranquility."`,
        author: "Yuki T.",
    },
    {
        id: 2,
        rating: 5,
        text: `"Finally, authentic Indian flavors presented with the elegance Tokyo deserves. A gem."`,
        author: "Raj M.",
    },
    {
        id: 3,
        rating: 5,
        text: `"Every dish feels like a meditation. The spice balance is impeccable."`,
        author: "Sakura K.",
    },
];

// Animation variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
    return (
        <section className="bg-[#fdfaf7] py-16 px-6 md:px-16">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <p className="text-sm text-[#c97a2b] tracking-widest font-semibold mb-2">
                    TESTIMONIALS
                </p>
                <h2 className="font-serif text-4xl italic text-gray-900">Voices</h2>
                <div className="mt-3 flex justify-center items-center gap-3 text-[#c97a2b]">
                    <span>◦</span>
                    <span className="text-2xl">⚛︎</span>
                    <span>◦</span>
                </div>
            </div>

            <motion.div
                className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {testimonials.map(({ id, rating, text, author }) => (
                    <motion.div
                        key={id}
                        className="bg-white rounded-2xl p-8 shadow-md border border-transparent hover:border-[#c97a2b] transition"
                        variants={cardVariants}
                    >
                        <div className="flex mb-4 text-[#c97a2b]">
                            {[...Array(rating)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 fill-current"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.538 1.118l-3.39-2.463a1 1 0 00-1.176 0l-3.39 2.463c-.783.57-1.838-.196-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.037 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
                                </svg>
                            ))}
                        </div>
                        <blockquote className="text-gray-600 mb-4">{text}</blockquote>
                        <p className="font-bold text-gray-900">{author}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}