import React from "react";
import { useCart } from "../assets/CartContext";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
    const { t } = useTranslation();
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    return (
        <div className="min-h-screen bg-[#f8f5f2] dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 md:px-6 py-12">
                <h1 className="text-3xl font-serif mb-8 text-gray-900 dark:text-white">{t('cart.yourCart')}</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t('cart.empty')}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <img src={item.image} alt={item.name} className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0" />
                                        <div>
                                            <h2 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">{item.name}</h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">−</button>
                                                <span className="text-gray-900 dark:text-white font-medium w-5 text-center">{item.quantity}</span>
                                                <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">+</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">¥{item.price * item.quantity}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 dark:text-red-400 text-sm hover:underline mt-1">{t('cart.remove')}</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{t('cart.total')}: ¥{totalPrice}</p>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button onClick={clearCart} className="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    {t('cart.clearCart')}
                                </button>
                                <button className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">
                                    {t('cart.checkout')}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;