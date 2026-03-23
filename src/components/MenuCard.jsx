import React from "react";
import { motion } from "framer-motion";
import SpiceLevel from "../components/SpiceLevel";

const MenuCard = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Veg / Non-Veg Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${item.isVeg
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
            }`}
        >
          {item.isVeg ? "VEG" : "NON-VEG"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-semibold text-lg">{item.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {item.desc}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          {/* Price */}
          <p className="font-semibold text-base">
            ¥{item.price}
          </p>

          {/* Add Button */}
          <button className="bg-primary text-white px-4 py-1.5 rounded-full text-sm hover:scale-105 transition">
            + Add
          </button>
        </div>

        {/* Spice Level */}
        <div className="mt-2">
          <SpiceLevel level={item.spiceLevel} />
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;