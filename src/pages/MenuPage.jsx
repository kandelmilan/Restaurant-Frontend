import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";
import IndianPattern from "../components/IndianPattern";
import Navbar from "../components/NavBar";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/menu";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dietFilter, setDietFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [spiceFilter, setSpiceFilter] = useState(null);

    // Fetch from backend
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(API_URL);
                setMenuItems(res.data);
            } catch (err) {
                console.error("Failed to fetch menu:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            // DB stores is_veg as 1/0, frontend uses isVeg — handle both
            const isVeg = item.is_veg === 1 || item.is_veg === true;
            const spiceLevel = item.spice_level ?? item.spiceLevel;

            if (dietFilter === "veg" && !isVeg) return false;
            if (dietFilter === "nonveg" && isVeg) return false;
            if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
            if (spiceFilter !== null && spiceLevel !== spiceFilter) return false;
            return true;
        });
    }, [menuItems, dietFilter, categoryFilter, spiceFilter]);

    const pillClass = (active) =>
        `px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${active
            ? "bg-primary text-black shadow-md scale-105 ring-2 ring-primary/30"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                        Explore Dishes
                    </p>
                    <h1 className="text-4xl md:text-5xl font-display italic mb-4">
                        Our Menu
                    </h1>
                    <IndianPattern className="w-48 mb-6" color="hsl(37 90% 44%)" />
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky top-16 z-40 py-4 -mx-6 px-6 bg-gray-50/90 backdrop-blur-lg border-b border-gray-200 mb-10"
                >
                    <div className="flex flex-wrap gap-3 items-center">
                        <button onClick={() => setDietFilter("all")} className={pillClass(dietFilter === "all")}>All</button>
                        <button onClick={() => setDietFilter("veg")} className={pillClass(dietFilter === "veg")}>🌿 Vegetarian</button>
                        <button onClick={() => setDietFilter("nonveg")} className={pillClass(dietFilter === "nonveg")}>🍗 Non-Veg</button>

                        <span className="w-px h-6 bg-gray-300 mx-2" />

                        {["all", "curry", "tandoor", "starters", "sides", "drinks"].map((cat) => (
                            <button key={cat} onClick={() => setCategoryFilter(cat)} className={pillClass(categoryFilter === cat)}>
                                {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}

                        <span className="w-px h-6 bg-gray-300 mx-2" />

                        <button onClick={() => setSpiceFilter(null)} className={pillClass(spiceFilter === null)}>Any Spice</button>
                        {[1, 2, 3].map((s) => (
                            <button key={s} onClick={() => setSpiceFilter(s)} className={pillClass(spiceFilter === s)}>
                                {"🌶️".repeat(s)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Menu Grid */}
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MenuCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-gray-500 text-lg"
                    >
                        😕 No dishes match your filters.
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MenuPage;