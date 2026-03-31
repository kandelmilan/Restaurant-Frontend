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

];

// Animation variants
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
            <section
                className="relative px-6 md:px-16 py-20 bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: `
            linear-gradient(
                to right,
                #f8f5f2 0%,
                rgba(248,245,242,0.95) 30%,
                rgba(248,245,242,0.7) 55%,
                rgba(248,245,242,0.2) 75%,
                rgba(248,245,242,0) 100%
            ),
            url('https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg')
        `,
                }}
            >
                <div className="max-w-6xl">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl">
                            Guest Favorites
                        </h2>

                        <Link
                            to="/menu"
                            className="text-orange-500 font-semibold hover:underline"
                        >
                            See Full Menu →
                        </Link>
                    </div>

                    {/* Cards */}
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
                </div>
            </section>

            {/* Story Section */}
            <OurStory />

            {/* Footer */}
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