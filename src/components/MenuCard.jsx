import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import SpiceLevel from "../components/SpiceLevel";
import { useCart } from "../assets/CartContext";
import { useTranslation } from "react-i18next";

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

const VegBadge = memo(({ isVeg }) => (
    <div
        className={`
      flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold
      backdrop-blur-md border tracking-wide uppercase
      ${isVeg
                ? "bg-emerald-50/90 text-emerald-700 border-emerald-200/60"
                : "bg-rose-50/90 text-rose-600 border-rose-200/60"
            }
    `}
    >
        <span
            className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${isVeg ? "bg-emerald-500" : "bg-rose-500"}`}
        />
        {isVeg ? "Veg" : "Non-Veg"}
    </div>
));

const ChefBadge = memo(() => (
    <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide"
        style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(217,119,6,0.4)",
        }}
    >
        ✦ Chef's Special
    </motion.div>
));

const FavoriteButton = memo(({ isFav, onToggle }) => (
    <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.8 }}
        className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
        style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
    >
        <motion.svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            animate={{ scale: isFav ? [1, 1.35, 1] : 1 }}
            transition={{ duration: 0.3 }}
        >
            <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={isFav ? "#F43F5E" : "none"}
                stroke={isFav ? "#F43F5E" : "#94A3B8"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    </motion.button>
));

const QuantityStepper = memo(({ quantity, onAdd, onRemove }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
        className="flex items-center gap-0 rounded-full overflow-hidden"
        style={{
            border: "1.5px solid rgba(251,146,60,0.35)",
            background: "rgba(255,247,237,0.9)",
        }}
    >
        <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center text-orange-500 font-bold text-base hover:bg-orange-50 transition-colors"
        >
            −
        </motion.button>
        <span className="w-6 text-center text-sm font-bold text-orange-600 tabular-nums">
            {quantity}
        </span>
        <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={onAdd}
            className="w-8 h-8 flex items-center justify-center font-bold text-base transition-colors"
            style={{ background: "linear-gradient(135deg, #FB923C, #EA580C)", color: "#fff" }}
        >
            +
        </motion.button>
    </motion.div>
));

const AddButton = memo(({ onAdd, label }) => (
    <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 450, damping: 22 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={onAdd}
        className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white"
        style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
            boxShadow: "0 4px 14px rgba(234,88,12,0.35)",
        }}
    >
        {/* Shimmer sweep */}
        <motion.span
            className="absolute inset-0 -skew-x-12 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)" }}
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {label}
    </motion.button>
));

/* ─────────────────────────────────────────────
   SKELETON LOADER
───────────────────────────────────────────── */
export const MenuCardSkeleton = () => (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="h-52 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="h-3 w-2/3 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="flex justify-between items-center pt-2">
                <div className="h-5 w-14 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="h-8 w-20 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   QUICK PREVIEW MODAL
───────────────────────────────────────────── */
const QuickPreviewModal = memo(({ item, isVeg, description, spiceLevel, onClose, onAdd }) => (
    <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-full max-w-sm rounded-3xl overflow-hidden"
            style={{ background: "#FFFAF6", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative h-56">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,8,0,0.7) 0%, transparent 50%)" }} />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{ background: "rgba(255,255,255,0.85)" }}
                >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className="absolute bottom-3 left-4">
                    <p className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.name}</p>
                </div>
            </div>
            <div className="p-5 space-y-4">
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                {spiceLevel != null && <SpiceLevel level={spiceLevel} />}
                <div className="flex items-center justify-between pt-1">
                    <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#C2410C" }}>
                        {item.price}
                    </span>
                    <AddButton onAdd={onAdd} label="Add to Cart" />
                </div>
            </div>
        </motion.div>
    </motion.div>
));

/* ─────────────────────────────────────────────
   MAIN CARD
───────────────────────────────────────────── */
const MenuCard = ({ item, isChefSpecial = false, rating = null, isLoading = false }) => {
    const { addToCart, removeFromCart, cartItems } = useCart();
    const { t } = useTranslation();

    const [isFav, setIsFav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imgError, setImgError] = useState(false);

    const currentItem = cartItems.find((i) => i.id === item.id);
    const isVeg = item.is_veg === 1 || item.is_veg === true || item.isVeg;
    const spiceLevel = item.spice_level ?? item.spiceLevel;
    const description = item.description ?? item.desc;

    // Subtle 3-D tilt on hover
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 20 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    const handleAdd = useCallback(() => addToCart(item), [addToCart, item]);
    const handleRemove = useCallback(() => removeFromCart(item), [removeFromCart, item]);
    const toggleFav = useCallback((e) => { e.stopPropagation(); setIsFav(p => !p); }, []);
    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    if (isLoading) return <MenuCardSkeleton />;

    return (
        <>
            <motion.article
                className="relative flex flex-col cursor-pointer select-none"
                style={{
                    borderRadius: "24px",
                    background: "#FFFAF6",
                    border: "1px solid rgba(251,146,60,0.15)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 0 transparent",
                    rotateX,
                    rotateY,
                    transformPerspective: 800,
                    willChange: "transform",
                }}
                whileHover={{
                    y: -6,
                    boxShadow: "0 20px 50px rgba(234,88,12,0.15), 0 4px 16px rgba(0,0,0,0.08)",
                    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={openModal}
            >
                {/* ── IMAGE ZONE ── */}
                <div className="relative overflow-hidden" style={{ height: "210px", borderRadius: "24px 24px 0 0" }}>
                    <motion.img
                        src={imgError ? "/placeholder-food.jpg" : item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                        loading="lazy"
                    />

                    {/* Gradient */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(to top, rgba(20,6,0,0.52) 0%, rgba(0,0,0,0.08) 45%, transparent 70%)",
                        }}
                    />

                    {/* Top-left badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <VegBadge isVeg={isVeg} />
                        {isChefSpecial && <ChefBadge />}
                    </div>

                    {/* Top-right: fav */}
                    <div className="absolute top-3 right-3">
                        <FavoriteButton isFav={isFav} onToggle={toggleFav} />
                    </div>

                    {/* Cart count bubble */}
                    <AnimatePresence>
                        {currentItem && (
                            <motion.div
                                key="cart-bubble"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 24 }}
                                className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                                style={{
                                    background: "linear-gradient(135deg, #FB923C, #EA580C)",
                                    boxShadow: "0 2px 8px rgba(234,88,12,0.4)",
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                {currentItem.quantity} in cart
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Rating pill */}
                    {rating && (
                        <div
                            className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                            style={{ background: "rgba(255,255,255,0.88)", color: "#92400E" }}
                        >
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {rating.toFixed(1)}
                        </div>
                    )}
                </div>

                {/* ── CONTENT ZONE ── */}
                <div className="flex flex-col flex-1 p-4" style={{ gap: "10px" }}>

                    {/* Name */}
                    <h3
                        className="font-bold leading-tight line-clamp-1 text-gray-900 dark:text-white"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "17px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p
                        className="text-gray-500 dark:text-gray-400 line-clamp-2"
                        style={{ fontSize: "13px", lineHeight: "1.6", fontFamily: "'DM Sans', sans-serif" }}
                    >
                        {description}
                    </p>

                    {/* Spice level */}
                    {spiceLevel != null && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <SpiceLevel level={spiceLevel} />
                        </div>
                    )}

                    {/* Separator */}
                    <div
                        className="w-full"
                        style={{ height: "1px", background: "linear-gradient(90deg, rgba(251,146,60,0.2), transparent)" }}
                    />

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        {/* Price */}
                        <div>
                            <p
                                className="font-extrabold leading-none"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: "22px",
                                    background: "linear-gradient(135deg, #EA580C, #C2410C)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {item.price}
                            </p>
                            {item.originalPrice && (
                                <p className="text-xs text-gray-400 line-through mt-0.5">{item.originalPrice}</p>
                            )}
                        </div>

                        {/* CTA */}
                        <AnimatePresence mode="wait">
                            {currentItem ? (
                                <QuantityStepper
                                    key="stepper"
                                    quantity={currentItem.quantity}
                                    onAdd={handleAdd}
                                    onRemove={handleRemove}
                                />
                            ) : (
                                <AddButton
                                    key="add"
                                    onAdd={handleAdd}
                                    label={t("menuCard.add", "Add")}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.article>

            {/* Quick Preview Modal */}
            <AnimatePresence>
                {showModal && (
                    <QuickPreviewModal
                        key="quick-preview"
                        item={item}
                        isVeg={isVeg}
                        description={description}
                        spiceLevel={spiceLevel}
                        onClose={closeModal}
                        onAdd={() => { handleAdd(); closeModal(); }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(MenuCard);