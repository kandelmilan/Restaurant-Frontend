import React from "react";
import { useCart } from "../assets/CartContext";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-[#f8f5f2]">
            <Navbar />

            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-serif mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty 🛒</p>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm"
                                >
                                    {/* LEFT */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />

                                        <div>
                                            <h2 className="font-semibold">{item.name}</h2>

                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="px-2 bg-gray-200 rounded"
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="px-2 bg-gray-200 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ¥{item.price * item.quantity}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-10 flex justify-between items-center border-t pt-6">
                            <p className="text-xl font-bold">
                                Total: ¥{totalPrice}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={clearCart}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Clear Cart
                                </button>

                                <button className="bg-orange-500 text-white px-6 py-2 rounded">
                                    Checkout
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