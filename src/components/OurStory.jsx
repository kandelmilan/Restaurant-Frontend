import React from "react";
import { motion } from "framer-motion";
import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";

const bentoEase = [0.2, 0, 0, 1];

// Variants for fade + slide up
const fadeSlideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: bentoEase, duration: 0.6 } },
};

export default function OurStory() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-24">
            <MandalaDecor
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-[0.06] pointer-events-none"
                size={500}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Main content fade + slide */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeSlideUp}
                    className="max-w-2xl mx-auto text-center"
                >
                    <p className="font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                        Our Journey
                    </p>
                    <h2 className="font-display italic text-3xl md:text-4xl text-foreground mb-4">
                        Our Story
                    </h2>
                    <IndianPattern
                        className="w-48 mx-auto mb-8 text-primary"
                        color="hsl(37 90% 44%)"
                    />

                    <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                        Born from a shared dream between a spice merchant from Jaipur and a
                        kaiseki chef from Kyoto, Masala Zen bridges two ancient culinary
                        traditions. Every dish honors the depth of Indian spices while
                        embracing the seasonal precision of Japanese cooking.
                    </p>
                    <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                        Nestled in the quiet streets of Minami-Aoyama, our space reflects
                        this duality — warm copper and earthy tones meet clean lines and
                        natural light. Here, dining is not just a meal; it's a meditation.
                    </p>

                    {/* Features line */}
                    <p className="font-body text-xs text-muted-foreground tracking-wide">
                        🕉️ Authentic Spices | 🎌 Japanese Craft | 🌿 Seasonal Produce
                    </p>
                </motion.div>
            </div>

            {/* Testimonials with fade */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeSlideUp}
                className="mt-16 pt-12"
            >
                <Testimonials />
            </motion.div>


            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ease: bentoEase, duration: 0.6 }}
                className="mt-8 pt-6"
            >
                <CallToAction />
            </motion.div>
        </section>
    );
}