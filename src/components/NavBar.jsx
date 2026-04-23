import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Moon, Sun, Menu, X } from "lucide-react";
import { useCart } from "../assets/CartContext";
import { useDarkMode } from "../RequiredComponents/DarkModeContext";

export default function Navbar() {
    const { cartItems } = useCart();
    const { darkMode, toggleDark } = useDarkMode();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#f8f5f2] dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="flex justify-between items-center px-6 md:px-16 py-4">

                {/* Logo */}
                <h1 className="font-serif text-xl text-orange-500">
                    <Link to="/">Masala Zen</Link>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <Link to="/" className="hover:text-orange-500 dark:hover:text-orange-400 transition">Home</Link>
                    <Link to="/menu" className="hover:text-orange-500 dark:hover:text-orange-400 transition">Menu</Link>

                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleDark}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode
                            ? <Sun size={18} className="text-yellow-400" />
                            : <Moon size={18} className="text-indigo-500" />
                        }
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
                <div className="flex md:hidden items-center gap-3">
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
                    <Link to="/" onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition py-1">Home</Link>
                    <Link to="/menu" onClick={() => setMobileOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition py-1">Menu</Link>
                </div>
            )}
        </header>
    );
}