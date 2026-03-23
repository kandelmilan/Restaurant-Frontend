import React from "react";
import { useCart } from "../assets/CartContext"; // only import useCart
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const CartPage = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-[#f8f5f2]">
            <Navbar />

            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-serif mb-6">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-muted-foreground">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded shadow">
                                    <div>
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold">¥{item.price * item.quantity}</p>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <p className="font-bold text-xl">Total: ¥{totalPrice}</p>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;