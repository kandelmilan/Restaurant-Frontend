import React from "react";

export default function Hero() {
    return (
        <section className="min-h-[85vh] flex items-center bg-[#f8f5f2] px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">

                {/* LEFT CONTENT */}
                <div>
                    <p className="text-sm tracking-widest text-orange-500 mb-4">
                        EST. 2019 • TOKYO
                    </p>

                    <h1 className="font-serif text-4xl md:text-6xl leading-tight text-gray-900">
                        Indian Soul, <br />
                        <span className="text-orange-500">Japanese Heart.</span>
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-md">
                        Hand-ground spices meet seasonal Japanese produce.
                        A quiet revolution of flavor in the heart of Tokyo.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-4 mt-8">
                        <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:scale-105 transition duration-300 shadow-md">
                            View Menu →
                        </button>

                        <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
                            Order Now
                        </button>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src="https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg"
                        alt="Food"
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                </div>

            </div>
        </section>
    );
}