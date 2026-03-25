// src/pages/Index.jsx
import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";
import { useCart } from "../assets/CartContext"; // ✅ import cart

// IMPORTANT: store price as number
const items = [
    {
        id: 1,
        name: "Butter Chicken",
        desc: "Creamy tomato curry",
        price: 1450, // ✅ number
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
    {
        id: 2,
        name: "Palak Paneer",
        desc: "Spinach with paneer",
        price: 1250,
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
    {
        id: 3,
        name: "Biryani",
        desc: "Spiced rice with chicken",
        price: 1650,
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
];

const Index = () => {
    const { addToCart, cartItems } = useCart();

    return (
        <>
            <Navbar />
            <Hero />

            <section className="px-6 md:px-16 py-16 bg-[#f8f5f2]">
                <h2 className="font-serif text-3xl mb-8">Guest Favorites</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item) => {
                        const currentItem = cartItems.find((i) => i.id === item.id);

                        return (
                            <FoodCard key={item.id} item={item}>
                                {/* Add to Cart button inside FoodCard */}
                                {currentItem ? (
                                    <span className="text-green-600 font-medium text-sm">
                                        Added ({currentItem.quantity})
                                    </span>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-orange-500 text-white px-4 py-1.5 rounded hover:scale-105 transition"
                                    >
                                        + Add
                                    </button>
                                )}
                            </FoodCard>
                        );
                    })}
                </div>
            </section>

            <OurStory />
            <Footer />
        </>
    );
};

export default Index;