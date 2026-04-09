import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

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

    // ✅ FETCH STORY
    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await axios.get(API);

                // If multiple stories → take latest
                setStory(res.data[0]);
            } catch (err) {
                console.error("Error fetching story", err);
            }
        };

        fetchStory();
    }, []);

    // ⛔ Prevent crash before data loads
    if (!story) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-24">

            {/* Background Mandala */}
            <MandalaDecor
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.06] pointer-events-none"
                size={500}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Story Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3"
                    >
                        {story.subtitle}
                    </motion.p>

                    <motion.h2
                        variants={fadeSlideUp}
                        className="font-display italic text-3xl md:text-4xl text-foreground mb-4"
                    >
                        {story.title}
                    </motion.h2>

                    <motion.div variants={fadeSlideUp}>
                        <IndianPattern
                            className="w-48 mx-auto mb-8 text-primary"
                            color="hsl(37 90% 44%)"
                        />
                    </motion.div>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-base text-muted-foreground leading-relaxed mb-6"
                    >
                        {story.content}
                    </motion.p>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-xs text-muted-foreground tracking-wide"
                    >
                        {story.highlight}
                    </motion.p>
                </motion.div>
            </div>

            {/* Testimonials */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={containerVariants}
                className="mt-16 pt-12"
            >
                <motion.div variants={fadeSlideUp}>
                    <Testimonials />
                </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ ease: bentoEase, duration: 0.8 }}
                className="mt-8 pt-6"
            >
                <CallToAction />
            </motion.div>
        </section>
    );
}