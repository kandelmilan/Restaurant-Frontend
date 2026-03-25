import React from "react";
import { motion } from "framer-motion";
import SpiceLevel from "../components/SpiceLevel";
import { useCart } from "../assets/CartContext";

const MenuCard = ({ item }) => {
  const { addToCart, cartItems } = useCart();

  const currentItem = cartItems.find((i) => i.id === item.id);

  return (
    <motion.div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">

      <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.desc}</p>

        <div className="mt-auto flex justify-between items-center">
          <p className="font-semibold">{item.price}</p>

          {currentItem ? (
            <span className="text-green-600 text-sm">
              Added ({currentItem.quantity})
            </span>
          ) : (



            <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 hover:scale-105 transition duration-200"
              onClick={() => addToCart(item)}>
              + Add
            </button>
          )}
        </div>

        <SpiceLevel level={item.spiceLevel} />
      </div>
    </motion.div>
  );
};

export default MenuCard;