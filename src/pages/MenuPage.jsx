import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";
import IndianPattern from "../components/IndianPattern";
import { menuItems } from "../assets/menuData";
import Navbar from "../components/NavBar";

const MenuPage = () => {
    const [dietFilter, setDietFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [spiceFilter, setSpiceFilter] = useState(null);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            if (dietFilter === "veg" && !item.isVeg) return false;
            if (dietFilter === "nonveg" && item.isVeg) return false;
            if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
            if (spiceFilter !== null && item.spiceLevel !== spiceFilter) return false;
            return true;
        });
    }, [dietFilter, categoryFilter, spiceFilter]);

    const pillClass = (active) =>
        `px-4 py-2 rounded-full text-xs font-semibold transition-all ${active ? "bg-primary text-white shadow-sm" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-6 py-12">
                {/* Hero / Title */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: [0.2, 0, 0, 1], duration: 0.4 }}
                >
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Explore Dishes</p>
                    <h1 className="text-4xl md:text-5xl font-display italic mb-4">Our Menu</h1>
                    <IndianPattern className="w-48 mb-6" color="hsl(37 90% 44%)" />
                </motion.div>

                {/* Filters */}
                <div className="sticky top-16 z-40 py-4 -mx-6 px-6 bg-gray-50/80 backdrop-blur-md border-b border-gray-200 mb-8">
                    <div className="flex flex-wrap gap-2 items-center">
                        {/* Diet Filter */}
                        <button onClick={() => setDietFilter("all")} className={pillClass(dietFilter === "all")}>All</button>
                        <button onClick={() => setDietFilter("veg")} className={pillClass(dietFilter === "veg")}>🌿 Vegetarian</button>
                        <button onClick={() => setDietFilter("nonveg")} className={pillClass(dietFilter === "nonveg")}>🍗 Non-Veg</button>

                        <span className="w-px h-6 bg-gray-300 mx-2" />

                        {/* Category Filter */}
                        {["all", "curry", "tandoor", "starters", "sides", "drinks"].map((cat) => (
                            <button key={cat} onClick={() => setCategoryFilter(cat)} className={pillClass(categoryFilter === cat)}>
                                {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}

                        <span className="w-px h-6 bg-gray-300 mx-2" />

                        {/* Spice Filter */}
                        <button onClick={() => setSpiceFilter(null)} className={pillClass(spiceFilter === null)}>Any Spice</button>
                        {[1, 2, 3].map((s) => (
                            <button key={s} onClick={() => setSpiceFilter(s)} className={pillClass(spiceFilter === s)}>
                                {"🌶️".repeat(s)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No dishes match your filters.
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MenuPage;