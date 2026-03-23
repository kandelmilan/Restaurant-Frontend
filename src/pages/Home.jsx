import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const items = [
    {
        id: "1",
        name: "Butter Chicken",
        nameJa: "バターチキン",
        desc: "Creamy tomato curry",
        price: 1450,
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
        spiceLevel: 2,
        isFeatured: true,
    },
    {
        id: "2",
        name: "Palak Paneer",
        nameJa: "パラクパニール",
        desc: "Spinach with paneer",
        price: 1250,
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
        spiceLevel: 1,
        isFeatured: true,
    },
    {
        id: "3",
        name: "Biryani",
        nameJa: "ビリヤニ",
        desc: "Spiced rice with chicken",
        price: 1650,
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
        spiceLevel: 3,
        isFeatured: true,
    },
];

// Animation variants for featured cards
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <Hero />

            {/* Featured Section */}
            <section className="px-6 md:px-16 py-16 bg-[#f8f5f2]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-3xl">Guest Favorites</h2>
                    <Link
                        to="/menu"
                        className="text-orange-500 font-semibold hover:underline"
                    >
                        See Full Menu →
                    </Link>
                </div>

                {/* Animated grid */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {items.map((item) => (
                        <motion.div key={item.id} variants={cardVariants}>
                            <MenuCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* OurStory (already has animations internally) */}
            <OurStory />

            {/* Footer with subtle fade-in */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Footer />
            </motion.div>
        </>
    );
}