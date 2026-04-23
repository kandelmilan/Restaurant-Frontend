import React from "react";
import { useCart } from "../assets/CartContext";

export default function FoodCard({ item }) {
    const { addToCart, cartItems } = useCart();
    const currentItem = cartItems.find((i) => i.id === item.id);

    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-transparent dark:border-gray-700">
            <div className="overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.desc}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-medium text-gray-800 dark:text-gray-200">¥{item.price}</span>
                    {currentItem ? (
                        <span className="text-green-600 dark:text-green-400 font-medium text-sm">Added ({currentItem.quantity})</span>
                    ) : (
                        <button
                            onClick={() => addToCart({ ...item, price: Number(item.price.toString().replace("¥", "")) })}
                            className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 hover:scale-105 transition duration-200"
                        >
                            + Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}