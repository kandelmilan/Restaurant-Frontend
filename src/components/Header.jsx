import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white p-5 sticky top-0 z-50 shadow-md backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl italic text-primary">
          Masala Zen
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center font-body text-sm uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-2 px-5 pb-4 bg-black flex flex-col gap-4 font-body text-sm uppercase tracking-widest">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </header>
  );
}