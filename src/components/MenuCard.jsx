import React from "react";
import { motion } from "framer-motion";
import SpiceLevel from "../components/SpiceLevel";
import { useCart } from "../assets/CartContext";

const MenuCard = ({ item }) => {
  const { addToCart, cartItems } = useCart();
  const currentItem = cartItems.find((i) => i.id === item.id);
  const isVeg = item.is_veg === 1 || item.is_veg === true || item.isVeg;
  const spiceLevel = item.spice_level ?? item.spiceLevel;
  const description = item.description ?? item.desc;

  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col border border-transparent dark:border-gray-700 transition-colors duration-300">
      <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isVeg ? "bg-green-500" : "bg-red-500"}`} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{description}</p>
        <div className="mt-auto flex justify-between items-center pt-3">
          <p className="font-semibold text-gray-900 dark:text-white">{item.price}</p>
          {currentItem ? (
            <span className="text-green-600 dark:text-green-400 text-sm">Added ({currentItem.quantity})</span>
          ) : (
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 hover:scale-105 transition duration-200"
              onClick={() => addToCart(item)}
            >
              + Add
            </button>
          )}
        </div>
        <SpiceLevel level={spiceLevel} />
      </div>
    </motion.div>
  );
};

export default MenuCard;