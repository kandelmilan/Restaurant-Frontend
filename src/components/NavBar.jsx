import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../assets/CartContext";

export default function Navbar() {
    const { cartItems } = useCart();

    return (
        <header className="flex justify-between items-center px-6 md:px-16 py-4 bg-[#f8f5f2] shadow-md sticky top-0 z-50">

            {/* Logo */}
            <h1 className="font-serif text-xl text-orange-500">
                <Link to="/">Masala Zen</Link>
            </h1>

            {/* Links */}
            <nav className="flex items-center gap-6 text-sm">
                <Link to="/" className="hover:text-orange-500 transition">Home</Link>
                <Link to="/menu" className="hover:text-orange-500 transition">Menu</Link>

                {/* Cart Icon */}
                <Link to="/cart" className="relative cursor-pointer">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                        {cartItems.length || 0}
                    </span>
                </Link>
            </nav>
        </header>
    );
}