// src/pages/Index.jsx
import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import FoodCard from "../components/FoodCard";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";

const items = [
    {
        name: "Butter Chicken",
        desc: "Creamy tomato curry",
        price: "¥1450",
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
    {
        name: "Palak Paneer",
        desc: "Spinach with paneer",
        price: "¥1250",
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
    {
        name: "Biryani",
        desc: "Spiced rice with chicken",
        price: "¥1650",
        image: "https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg",
    },
];

const Index = () => {
    return (
        <>
            <Navbar />
            <Hero />

            <section className="px-6 md:px-16 py-16 bg-[#f8f5f2]">
                <h2 className="font-serif text-3xl mb-8">Guest Favorites</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <FoodCard key={i} item={item} />
                    ))}
                </div>
            </section>

            <OurStory />
            <Footer />
        </>
    );
};

export default Index;