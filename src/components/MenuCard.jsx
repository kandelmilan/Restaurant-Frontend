import React, { useState, useCallback, memo } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    useSpring,
} from "framer-motion";
import SpiceLevel from "../components/SpiceLevel";
import { useCart } from "../assets/CartContext";
import { useTranslation } from "react-i18next";

const ease = [0.23, 1, 0.32, 1];

/* ═══════════════════════════════════════════════
   VEG BADGE  — matches Hero tagline chip style
═══════════════════════════════════════════════ */
const VegBadge = memo(({ isVeg }) => (
    <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase backdrop-blur-md"
        style={{
            background: isVeg
                ? "rgba(209,250,229,0.92)"
                : "rgba(255,228,230,0.92)",
            border: isVeg
                ? "1px solid rgba(52,211,153,0.35)"
                : "1px solid rgba(251,113,133,0.35)",
            color: isVeg ? "#065F46" : "#9F1239",
        }}
    >
        <span
            style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isVeg ? "#10B981" : "#F43F5E",
                flexShrink: 0,
                boxShadow: isVeg
                    ? "0 0 5px rgba(16,185,129,0.6)"
                    : "0 0 5px rgba(244,63,94,0.6)",
            }}
        />
        {isVeg ? "Veg" : "Non-Veg"}
    </div>
));

/* ═══════════════════════════════════════════════
   CHEF BADGE  — amber gradient, matching Hero CTA glow
═══════════════════════════════════════════════ */
const ChefBadge = memo(() => (
    <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease }}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase"
        style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#fff",
            boxShadow: "0 2px 10px rgba(217,119,6,0.45)",
        }}
    >
        ✦ Chef's Special
    </motion.div>
));

/* ═══════════════════════════════════════════════
   FAVOURITE BUTTON
═══════════════════════════════════════════════ */
const FavoriteButton = memo(({ isFav, onToggle }) => (
    <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.75 }}
        whileHover={{ scale: 1.1 }}
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
            border: "1px solid rgba(255,255,255,0.6)",
        }}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
    >
        <motion.svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            animate={{ scale: isFav ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.35, ease }}
        >
            <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill={isFav ? "#F43F5E" : "none"}
                stroke={isFav ? "#F43F5E" : "rgba(255,255,255,0.9)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </motion.svg>
    </motion.button>
));

/* ═══════════════════════════════════════════════
   QUANTITY STEPPER
═══════════════════════════════════════════════ */
const QuantityStepper = memo(({ quantity, onAdd, onRemove }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ type: "spring", stiffness: 480, damping: 24 }}
        className="flex items-center rounded-full overflow-hidden"
        style={{
            border: "1.5px solid rgba(251,146,60,0.4)",
            background: "rgba(255,247,237,0.95)",
        }}
    >
        <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center text-orange-500 text-base font-bold hover:bg-orange-50 transition-colors"
        >
            −
        </motion.button>
        <span
            className="w-6 text-center text-sm font-bold tabular-nums"
            style={{ color: "#EA580C", fontFamily: "'DM Sans', sans-serif" }}
        >
            {quantity}
        </span>
        <motion.button
            whileTap={{ scale: 0.82 }}
            onClick={onAdd}
            className="w-8 h-8 flex items-center justify-center text-base font-bold"
            style={{
                background: "linear-gradient(135deg, #FB923C, #EA580C)",
                color: "#fff",
            }}
        >
            +
        </motion.button>
    </motion.div>
));

/* ═══════════════════════════════════════════════
   ADD BUTTON — shimmer + Hero-matched gradient
═══════════════════════════════════════════════ */
const AddButton = memo(({ onAdd, label }) => (
    <motion.button
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
        transition={{ type: "spring", stiffness: 480, damping: 24 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(234,88,12,0.42)" }}
        whileTap={{ scale: 0.93 }}
        onClick={onAdd}
        className="relative overflow-hidden flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white"
        style={{
            background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
            boxShadow: "0 4px 16px rgba(234,88,12,0.32)",
            fontFamily: "'DM Sans', sans-serif",
        }}
    >
        {/* Shimmer sweep — same as Hero "Order Now" */}
        <motion.span
            className="absolute inset-0 -skew-x-12 pointer-events-none"
            style={{
                background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
            }}
            initial={{ x: "-130%" }}
            whileHover={{ x: "130%" }}
            transition={{ duration: 0.52, ease: "easeInOut" }}
        />
        <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
        >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        {label}
    </motion.button>
));

/* ═══════════════════════════════════════════════
   SKELETON  — warm tones, matches card bg
═══════════════════════════════════════════════ */
export const MenuCardSkeleton = () => (
    <div
        className="rounded-3xl overflow-hidden"
        style={{
            background: "#FFFAF6",
            border: "1px solid rgba(251,146,60,0.12)",
        }}
    >
        <div
            className="h-[214px] animate-pulse"
            style={{ background: "rgba(251,146,60,0.08)" }}
        />
        <div className="p-4 space-y-3">
            <div
                className="h-4 w-3/4 rounded-full animate-pulse"
                style={{ background: "rgba(251,146,60,0.1)" }}
            />
            <div
                className="h-3 w-full rounded-full animate-pulse"
                style={{ background: "rgba(251,146,60,0.08)" }}
            />
            <div
                className="h-3 w-2/3 rounded-full animate-pulse"
                style={{ background: "rgba(251,146,60,0.08)" }}
            />
            <div className="flex justify-between items-center pt-2">
                <div
                    className="h-6 w-16 rounded-full animate-pulse"
                    style={{ background: "rgba(251,146,60,0.1)" }}
                />
                <div
                    className="h-8 w-20 rounded-full animate-pulse"
                    style={{ background: "rgba(251,146,60,0.1)" }}
                />
            </div>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════
   QUICK PREVIEW MODAL  — dark mode aware
═══════════════════════════════════════════════ */
const QuickPreviewModal = memo(({ item, description, spiceLevel, onClose, onAdd }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        style={{ background: "rgba(10,4,0,0.65)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
    >
        <motion.div
            initial={{ opacity: 0, y: 56, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 56, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="w-full max-w-sm rounded-3xl overflow-hidden dark:bg-[#1C1007] bg-[#FFFAF6]"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.38)" }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Modal image */}
            <div className="relative h-56">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(18,6,0,0.78) 0%, transparent 55%)",
                    }}
                />
                <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={onClose}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        stroke="#374151"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </motion.button>
                <div className="absolute bottom-3 left-4 right-4">
                    <p
                        className="text-white font-bold text-xl leading-tight"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        {item.name}
                    </p>
                </div>
            </div>

            {/* Modal body */}
            <div className="p-5 space-y-4">
                <p
                    className="text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    {description}
                </p>
                {spiceLevel != null && <SpiceLevel level={spiceLevel} />}

                <div
                    style={{
                        height: 1,
                        background:
                            "linear-gradient(90deg, rgba(251,146,60,0.25), transparent)",
                    }}
                />

                <div className="flex items-center justify-between">
                    <div>
                        <p
                            className="font-extrabold leading-none"
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 24,
                                background: "linear-gradient(135deg, #EA580C, #C2410C)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {item.price}
                        </p>
                        {item.originalPrice && (
                            <p className="text-xs text-gray-400 line-through mt-0.5">
                                {item.originalPrice}
                            </p>
                        )}
                    </div>
                    <AddButton onAdd={onAdd} label="Add to Cart" />
                </div>
            </div>
        </motion.div>
    </motion.div>
));

/* ═══════════════════════════════════════════════
   MAIN  MenuCard
═══════════════════════════════════════════════ */
const MenuCard = ({
    item,
    isChefSpecial = false,
    rating = null,
    isLoading = false,
}) => {
    const { addToCart, removeFromCart, cartItems } = useCart();
    const { t } = useTranslation();

    const [isFav, setIsFav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imgError, setImgError] = useState(false);

    const currentItem = cartItems.find((i) => i.id === item.id);
    const isVeg = item.is_veg === 1 || item.is_veg === true || item.isVeg;
    const spiceLevel = item.spice_level ?? item.spiceLevel;
    const description = item.description ?? item.desc;

    /* 3-D tilt */
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
        stiffness: 180,
        damping: 22,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
        stiffness: 180,
        damping: 22,
    });

    const handleMouseMove = useCallback((e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
        mouseY.set((e.clientY - r.top) / r.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    const handleAdd = useCallback(() => addToCart(item), [addToCart, item]);
    const handleRemove = useCallback(() => removeFromCart(item), [removeFromCart, item]);
    const toggleFav = useCallback((e) => { e.stopPropagation(); setIsFav((p) => !p); }, []);
    const openModal = useCallback(() => setShowModal(true), []);
    const closeModal = useCallback(() => setShowModal(false), []);

    if (isLoading) return <MenuCardSkeleton />;

    return (
        <>
            <motion.article
                className="relative flex flex-col cursor-pointer select-none
                   bg-[#FFFAF6] dark:bg-[#1C1007]"
                style={{
                    borderRadius: 26,
                    border: "1px solid rgba(251,146,60,0.15)",
                    boxShadow: "0 2px 18px rgba(0,0,0,0.06)",
                    rotateX,
                    rotateY,
                    transformPerspective: 900,
                    willChange: "transform",
                }}
                whileHover={{
                    y: -7,
                    boxShadow: "0 22px 52px rgba(234,88,12,0.16), 0 4px 18px rgba(0,0,0,0.09)",
                    transition: { duration: 0.32, ease },
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-44px" }}
                transition={{ duration: 0.48, ease }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={openModal}
            >
                {/* ══ IMAGE ══ */}
                <div
                    className="relative overflow-hidden"
                    style={{ height: 214, borderRadius: "26px 26px 0 0" }}
                >
                    {/* Ambient glow behind image */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-60"
                        style={{
                            background:
                                "radial-gradient(ellipse at 60% 35%, rgba(251,146,60,0.22), transparent 68%)",
                        }}
                    />

                    <motion.img
                        src={imgError ? "/placeholder-food.jpg" : item.image}
                        alt={item.name}
                        className="w-full h-full object-cover relative z-[1]"
                        onError={() => setImgError(true)}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.58, ease }}
                        loading="lazy"
                    />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 z-[2] pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(175deg, transparent 38%, rgba(18,6,0,0.58) 100%)",
                        }}
                    />

                    {/* Badges top-left */}
                    <div className="absolute top-3 left-3 z-[3] flex flex-col gap-1.5">
                        <VegBadge isVeg={isVeg} />
                        {isChefSpecial && <ChefBadge />}
                    </div>

                    {/* Fav top-right */}
                    <div className="absolute top-3 right-3 z-[3]">
                        <FavoriteButton isFav={isFav} onToggle={toggleFav} />
                    </div>

                    {/* Cart bubble bottom-left */}
                    <AnimatePresence>
                        {currentItem && (
                            <motion.div
                                key="cart-bubble"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 520, damping: 26 }}
                                className="absolute bottom-3 left-3 z-[3] flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white"
                                style={{
                                    background: "linear-gradient(135deg, #FB923C, #EA580C)",
                                    boxShadow: "0 3px 10px rgba(234,88,12,0.45)",
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

                    {/* Rating bottom-right */}
                    {rating && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4, ease }}
                            className="absolute bottom-3 right-3 z-[3] flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                            style={{
                                background: "rgba(255,250,246,0.92)",
                                backdropFilter: "blur(10px)",
                                color: "#92400E",
                                border: "1px solid rgba(251,146,60,0.22)",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" width="10" height="10" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {rating.toFixed(1)}
                        </motion.div>
                    )}
                </div>

                {/* ══ CONTENT ══ */}
                <div className="flex flex-col flex-1 p-4 gap-[9px]">

                    {/* Name */}
                    <h3
                        className="font-bold leading-tight line-clamp-1 text-gray-900 dark:text-white"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 17,
                            letterSpacing: "-0.022em",
                        }}
                    >
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p
                        className="line-clamp-2 text-gray-500 dark:text-gray-400"
                        style={{ fontSize: 13, lineHeight: 1.62, fontFamily: "'DM Sans', sans-serif" }}
                    >
                        {description}
                    </p>

                    {/* Spice */}
                    {spiceLevel != null && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <SpiceLevel level={spiceLevel} />
                        </div>
                    )}

                    {/* Divider — matches Hero wave accent colour */}
                    <div
                        style={{
                            height: 1,
                            background:
                                "linear-gradient(90deg, rgba(251,146,60,0.3) 0%, rgba(251,146,60,0.06) 60%, transparent 100%)",
                        }}
                    />

                    {/* Price + CTA */}
                    <div
                        className="flex items-center justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            {/* Price — 3-stop gradient identical to Hero headline highlight */}
                            <p
                                className="font-extrabold leading-none"
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: 22,
                                    background:
                                        "linear-gradient(135deg, #FB923C 0%, #EA580C 60%, #C2410C 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {item.price}
                            </p>
                            {item.originalPrice && (
                                <p
                                    className="text-[11px] text-gray-400 line-through mt-0.5"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {item.originalPrice}
                                </p>
                            )}
                        </div>

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

                {/* Dark-mode bottom inner glow */}
                <div
                    className="absolute bottom-0 left-0 right-0 pointer-events-none rounded-b-[26px] opacity-0 dark:opacity-100"
                    style={{
                        height: 64,
                        background: "linear-gradient(to top, rgba(251,146,60,0.07), transparent)",
                    }}
                />
            </motion.article>

            <AnimatePresence>
                {showModal && (
                    <QuickPreviewModal
                        key="modal"
                        item={item}
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