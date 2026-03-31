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
    {
        id: "4",
        name: "Chicken Katsu Curry",
        nameJa: "チキンカツカレー",
        desc: "Crispy chicken with spiced curry sauce",
        price: 1550,
        image: "https://images.unsplash.com/photo-1604908176997-431c4c4b0f1f",
        spiceLevel: 2,
        isFeatured: true,
    },
    {
        id: "5",
        name: "Tandoori Chicken",
        nameJa: "タンドリーチキン",
        desc: "Charred yogurt-marinated chicken",
        price: 1700,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        spiceLevel: 3,
        isFeatured: false,
    },
    {
        id: "6",
        name: "Paneer Tikka Skewers",
        nameJa: "パニールティッカ",
        desc: "Grilled paneer with spices",
        price: 1350,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
        spiceLevel: 2,
        isFeatured: false,
    },
    {
        id: "7",
        name: "Masala Ramen",
        nameJa: "マサララーメン",
        desc: "Fusion ramen with spiced broth",
        price: 1500,
        image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e",
        spiceLevel: 2,
        isFeatured: true,
    },
    {
        id: "8",
        name: "Samosa Plate",
        nameJa: "サモサ",
        desc: "Crispy pastry with spiced potatoes",
        price: 750,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        spiceLevel: 1,
        isFeatured: false,
    },
    {
        id: "9",
        name: "Garlic Naan",
        nameJa: "ガーリックナン",
        desc: "Soft naan with garlic butter",
        price: 450,
        image: "https://images.unsplash.com/photo-1604908177522-4022f1e0f6e3",
        spiceLevel: 0,
        isFeatured: false,
    },
    {
        id: "10",
        name: "Matcha Kulfi",
        nameJa: "抹茶クルフィ",
        desc: "Indian ice cream with matcha twist",
        price: 650,
        image: "https://images.unsplash.com/photo-1627308595171-d1b5d1b2e1c1",
        spiceLevel: 0,
        isFeatured: true,
    },
    {
        id: "11",
        name: "Lamb Rogan Josh",
        nameJa: "ラムローガンジョシュ",
        desc: "Slow-cooked lamb curry",
        price: 1850,
        image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143",
        spiceLevel: 3,
        isFeatured: false,
    },
    {
        id: "12",
        name: "Yuzu Mango Lassi",
        nameJa: "ゆずマンゴーラッシー",
        desc: "Refreshing yogurt drink with citrus",
        price: 700,
        image: "https://images.unsplash.com/photo-1625944230695-8c9c2d2a6d2e",
        spiceLevel: 0,
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