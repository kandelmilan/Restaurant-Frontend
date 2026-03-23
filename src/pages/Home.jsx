import { Link } from "react-router-dom";
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

export default function Home() {
    return (
        <>
            <Navbar />

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

                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            </section>

            <OurStory />
            <Footer />
        </>
    );
}