import React from "react";
import { motion } from "framer-motion";
import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

const bentoEase = [0.2, 0, 0, 1];

// Parent container animation (for stagger effect)
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Child animation (fade + slide)
const fadeSlideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ease: bentoEase, duration: 0.8 },
    },
};

export default function OurStory() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-24">

            {/* Background Mandala */}
            <MandalaDecor
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.06] pointer-events-none"
                size={500}
            />

            <div className="container mx-auto px-6 relative z-10">

                {/* Main Story Content */}
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
                        Our Journey
                    </motion.p>

                    <motion.h2
                        variants={fadeSlideUp}
                        className="font-display italic text-3xl md:text-4xl text-foreground mb-4"
                    >
                        Our Story
                    </motion.h2>

                    <motion.div variants={fadeSlideUp}>
                        <IndianPattern
                            className="w-48 mx-auto mb-8 text-primary"
                            color="hsl(37 90% 44%)"
                        />
                    </motion.div>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-base text-muted-foreground leading-relaxed mb-4"
                    >
                        Born from a shared dream between a spice merchant from Jaipur and a
                        kaiseki chef from Kyoto, Masala Zen bridges two ancient culinary
                        traditions. Every dish honors the depth of Indian spices while
                        embracing the seasonal precision of Japanese cooking.
                    </motion.p>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-base text-muted-foreground leading-relaxed mb-6"
                    >
                        Nestled in the quiet streets of Minami-Aoyama, our space reflects
                        this duality — warm copper and earthy tones meet clean lines and
                        natural light. Here, dining is not just a meal; it's a meditation.
                    </motion.p>

                    <motion.p
                        variants={fadeSlideUp}
                        className="font-body text-xs text-muted-foreground tracking-wide"
                    >
                        🕉️ Authentic Spices | 🎌 Japanese Craft | 🌿 Seasonal Produce
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

            {/* Call To Action */}
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