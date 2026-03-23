import React from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import IndianPattern from "./IndianPattern";
import MandalaDecor from "./MandalaDecor";

export default function Footer() {
    return (
        <footer className="relative bg-stone-950 text-stone-300 pt-16 pb-8 overflow-hidden">
            {/* Decorative mandalas */}
            <MandalaDecor className="absolute top-0 right-0 text-stone-700 opacity-20 pointer-events-none" size={200} />
            <MandalaDecor className="absolute bottom-0 left-0 text-stone-700 opacity-10 pointer-events-none" size={160} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Logo & description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-primary text-xl">🕉️</span>
                            <h3 className="font-display text-2xl italic text-stone-100">Masala Zen</h3>
                        </div>
                        <IndianPattern className="w-32 mb-4" color="hsl(37 90% 44%)" />
                        <p className="text-sm text-stone-400 leading-relaxed">
                            Hand-ground spices meet seasonal Japanese produce. A quiet revolution of flavor.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                2-14-5 Minami-Aoyama, Minato-ku, Tokyo
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                +81 3-1234-5678
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                hello@masalazen.jp
                            </li>
                        </ul>
                    </div>

                    {/* Hours & Social */}
                    <div>
                        <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">Hours</h4>
                        <ul className="space-y-2 text-sm text-stone-400">
                            <li>Lunch: 11:30 — 14:30</li>
                            <li>Dinner: 17:30 — 22:00</li>
                            <li className="text-stone-500">Closed on Tuesdays</li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-stone-400 hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-500">
                    © 2026 Masala Zen. All rights reserved.
                </div>
            </div>
        </footer>
    );
}