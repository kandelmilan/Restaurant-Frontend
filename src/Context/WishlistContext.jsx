import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (item) => {
        setWishlistItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);

            // Prevent duplicates
            if (existing) return prev;

            // Convert price safely (same as cart)
            const priceNumber =
                typeof item.price === "string"
                    ? Number(item.price.replace("¥", ""))
                    : item.price;

            return [
                ...prev,
                {
                    id: item.id,
                    name: item.name,
                    price: priceNumber,
                    image: item.image,
                },
            ];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearWishlist = () => setWishlistItems([]);

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);