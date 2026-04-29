import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Moon, Sun, Menu, X, Globe } from "lucide-react";
import { useCart } from "../assets/CartContext";
import { useDarkMode } from "../RequiredComponents/DarkModeContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
    const { cartItems } = useCart();
    const { darkMode, toggleDark } = useDarkMode();
    const { t, i18n } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setLangOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#f8f5f2] dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="flex justify-between items-center px-6 md:px-16 py-4">

                {/* Logo */}
                <h1 className="font-serif text-xl text-orange-500">
                    <Link to="/">🕉️ {t('navbar.masalaZen')}</Link>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <Link to="/" className="hover:text-orange-500 dark:hover:text-orange-400 transition">{t('common.home')}</Link>
                    <Link to="/menu" className="hover:text-orange-500 dark:hover:text-orange-400 transition">{t('common.menu')}</Link>
                    {/* <Link to="/about" className="hover:text-orange-500 dark:hover:text-orange-400 transition">{t('common.about')}</Link> */}

                    {/* Language Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
                        >
                            <Globe size={18} />
                            <span className="font-semibold text-xs">{i18n.language.toUpperCase()}</span>
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`w-full text-left px-4 py-2 text-sm transition ${i18n.language === 'en'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    🇬🇧 English
                                </button>
                                <button
                                    onClick={() => changeLanguage('ja')}
                                    className={`w-full text-left px-4 py-2 text-sm transition ${i18n.language === 'ja'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    🇯🇵 日本語
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-500" />}
                    </button>

                    {/* Cart */}
                    <Link to="/cart" className="relative">
                        <ShoppingBag size={20} className="text-gray-700 dark:text-gray-300" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Mobile right side */}
                <div className="flex md:hidden items-center gap-2">
                    {/* Language dropdown mobile */}
                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 text-xs font-semibold"
                        >
                            <Globe size={16} />
                            {i18n.language.toUpperCase()}
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`w-full text-left px-3 py-2 text-xs transition ${i18n.language === 'en'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    🇬🇧 EN
                                </button>
                                <button
                                    onClick={() => changeLanguage('ja')}
                                    className={`w-full text-left px-3 py-2 text-xs transition ${i18n.language === 'ja'
                                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    🇯🇵 JA
                                </button>
                            </div>
                        )}
                    </div>

                    <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-500" />}
                    </button>

                    <Link to="/cart" className="relative">
                        <ShoppingBag size={20} className="text-gray-700 dark:text-gray-300" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-gray-700 dark:text-gray-300">
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {mobileOpen && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm bg-[#f8f5f2] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <Link to="/" onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition py-1">{t('common.home')}</Link>
                    <Link to="/menu" onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition py-1">{t('common.menu')}</Link>
                    {/* <Link to="/about" onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition py-1">{t('common.about')}</Link> */}
                </div>
            )}
        </header>
    );
}