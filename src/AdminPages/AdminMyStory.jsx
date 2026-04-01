import React, { useState } from "react";
import { motion } from "framer-motion";
import MandalaDecor from "../components/MandalaDecor";
import IndianPattern from "../components/IndianPattern";
import { Pencil, X } from "lucide-react";

const bentoEase = [0.2, 0, 0, 1];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const fadeSlideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { ease: bentoEase, duration: 0.8 } },
};

export default function AdminMyStory() {
    // Editable story state
    const [story, setStory] = useState({
        title: "Our Story",
        subtitle: "Our Journey",
        content: `Born from a shared dream between a spice merchant from Jaipur and a
      kaiseki chef from Kyoto, Masala Zen bridges two ancient culinary
      traditions. Every dish honors the depth of Indian spices while
      embracing the seasonal precision of Japanese cooking.`,
        highlight: "🕉️ Authentic Spices | 🎌 Japanese Craft | 🌿 Seasonal Produce",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...story });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => {
        setStory({ ...formData });
        setIsEditing(false);
    };
    const handleCancel = () => {
        setFormData({ ...story });
        setIsEditing(false);
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-24 min-h-screen">
            {/* Background Mandala */}
            <MandalaDecor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-10 pointer-events-none" size={500} />

            <div className="container mx-auto px-6 relative z-10 max-w-3xl">

                {/* Admin Edit Button */}
                <div className="flex justify-end mb-4">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                            <Pencil size={18} /> Edit Story
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={handleCancel} className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                                <X size={18} /> Cancel
                            </button>
                            <button onClick={handleSave} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                                Save
                            </button>
                        </div>
                    )}
                </div>

                {/* Story Content */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="text-center">

                    {/* Subtitle */}
                    <motion.p variants={fadeSlideUp} className="font-body text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                        {isEditing ? <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="w-full border border-gray-300 p-1 rounded-lg" /> : story.subtitle}
                    </motion.p>

                    {/* Title */}
                    <motion.h2 variants={fadeSlideUp} className="font-display italic text-3xl md:text-4xl text-foreground mb-4">
                        {isEditing ? <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-1 rounded-lg text-center" /> : story.title}
                    </motion.h2>

                    {/* Decorative Pattern */}
                    <motion.div variants={fadeSlideUp}>
                        <IndianPattern className="w-48 mx-auto mb-8 text-primary" color="hsl(37 90% 44%)" />
                    </motion.div>

                    {/* Content */}
                    <motion.p variants={fadeSlideUp} className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                        {isEditing ? <textarea name="content" value={formData.content} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" rows={5} /> : story.content}
                    </motion.p>

                    {/* Highlight */}
                    <motion.p variants={fadeSlideUp} className="font-body text-xs text-muted-foreground tracking-wide">
                        {isEditing ? <input type="text" name="highlight" value={formData.highlight} onChange={handleChange} className="w-full border border-gray-300 p-1 rounded-lg text-center" /> : story.highlight}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}