import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import MenuCard from "../components/MenuCard";
import IndianPattern from "../components/IndianPattern";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useTranslation } from "react-i18next";

const API_URL = "http://127.0.0.1:8000/api/menu";

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dietFilter, setDietFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [spiceFilter, setSpiceFilter] = useState(null);
    const { t } = useTranslation();

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
        `px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${active
            ? "bg-orange-500 text-white shadow-md scale-105"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('menu.loading')}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8f5f2] dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 md:px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">{t('menu.exploreDishes')}</p>
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-4 text-gray-900 dark:text-white">{t('menu.ourMenu')}</h1>
                    <IndianPattern className="w-48 mb-6" color="hsl(37 90% 44%)" />
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky top-16 z-40 py-3 -mx-4 px-4 md:-mx-6 md:px-6 bg-[#f8f5f2]/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 mb-10"
                >
                    <div className="flex gap-2 items-center overflow-x-auto pb-1 scrollbar-hide flex-nowrap">
                        <button onClick={() => setDietFilter("all")} className={pillClass(dietFilter === "all")}>{t('menu.all')}</button>
                        <button onClick={() => setDietFilter("veg")} className={pillClass(dietFilter === "veg")}>{t('menu.vegetarian')}</button>
                        <button onClick={() => setDietFilter("nonveg")} className={pillClass(dietFilter === "nonveg")}>{t('menu.nonVeg')}</button>

                        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1 flex-shrink-0" />

                        {["all", "curry", "tandoor", "starters", "sides", "drinks"].map((cat) => (
                            <button key={cat} onClick={() => setCategoryFilter(cat)} className={`${pillClass(categoryFilter === cat)} whitespace-nowrap`}>
                                {cat === "all" ? t('menu.allCategories') : t(`menu.${cat}`)}
                            </button>
                        ))}

                        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1 flex-shrink-0" />

                        <button onClick={() => setSpiceFilter(null)} className={`${pillClass(spiceFilter === null)} whitespace-nowrap`}>{t('menu.anySpice')}</button>
                        {[1, 2, 3].map((s) => (
                            <button key={s} onClick={() => setSpiceFilter(s)} className={`${pillClass(spiceFilter === s)} whitespace-nowrap`}>
                                {"🌶️".repeat(s)}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                                <MenuCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
                        {t('menu.noDishesMatch')}
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MenuPage;