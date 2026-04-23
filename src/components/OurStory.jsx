import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";
import { useTranslation } from "react-i18next";

const API = "http://127.0.0.1:8000/api/story";

const bentoEase = [0.2, 0, 0, 1];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
};

const fadeSlideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ease: bentoEase, duration: 0.8 },
    },
};

export default function OurStory() {
    const [story, setStory] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get(API);
                setStory(res.data[0]);
            } catch (err) {
                console.error("Error fetching story", err);
            }
        };

        fetchStory();
    }, []);

    if (!story) {
        return <div className="text-center py-20 text-gray-500 dark:text-gray-400">{t('ourStory.loading')}</div>;
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-24 dark:bg-gray-900">

            <MandalaDecor
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.06] pointer-events-none"
                size={500}
            />

            <div className="container mx-auto px-6 relative z-10">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-3"
                    >
                        {story.subtitle}
                    </motion.p>

                    <motion.h2
                        variants={fadeSlideUp}
                        className="font-display italic text-3xl md:text-4xl text-black dark:text-white mb-4"
                    >
                        {story.title}
                    </motion.h2>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
                    >
                        {story.content}
                    </motion.p>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-xs text-gray-500 dark:text-gray-400 tracking-wide"
                    >
                        {story.highlight}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}