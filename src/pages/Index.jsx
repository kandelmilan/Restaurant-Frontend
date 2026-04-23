import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { useCart } from "../assets/CartContext";
import { Link } from "react-router-dom";

const items = [
    { id: 1, name: "Butter Chicken", desc: "Creamy tomato curry", price: 1450, image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg" },
    { id: 2, name: "Palak Paneer", desc: "Spinach with paneer", price: 1250, image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg" },
    { id: 3, name: "Biryani", desc: "Spiced rice with chicken", price: 1650, image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg" },
];

const Index = () => {
    const { addToCart, cartItems } = useCart();

    return (
        <div className="bg-[#f8f5f2] dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <Hero />

            {/* Guest Favorites */}
            <section className="px-6 md:px-16 py-16 bg-[#f8f5f2] dark:bg-gray-900 transition-colors duration-300">
                <div className="flex justify-between items-center mb-10 flex-wrap gap-3">
                    <h2 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white">
                        Guest Favorites
                    </h2>
                    <Link to="/menu" className="text-orange-500 font-semibold hover:underline whitespace-nowrap">
                        See Full Menu →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {items.map((item) => {
                        const currentItem = cartItems.find((i) => i.id === item.id);
                        return (
                            <FoodCard key={item.id} item={item}>
                                {currentItem ? (
                                    <span className="text-green-600 font-medium text-sm">Added ({currentItem.quantity})</span>
                                ) : (
                                    <button onClick={() => addToCart(item)} className="bg-orange-500 text-white px-4 py-1.5 rounded hover:scale-105 transition">
                                        + Add
                                    </button>
                                )}
                            </FoodCard>
                        );
                    })}
                </div>
            </section>

            <OurStory />
            <Testimonials />
            <CallToAction />
            <Footer />
        </div>
    );
};

export default Index;