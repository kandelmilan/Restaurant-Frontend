import React from "react";

export default function Hero() {
    return (
        <section className="bg-[#f8f5f2]">

            {/* HERO TOP */}
            <div className="min-h-[85vh] flex items-center px-6 md:px-16 pt-10 pb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">

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
                    <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-md md:max-w-lg rounded-3xl overflow-hidden shadow-xl">
                            <img
                                src="https://masala-zen-fusion-ui.lovable.app/assets/hero-food-CbwyfA_c.jpg"
                                alt="Food"
                                className="w-full h-[350px] md:h-[450px] object-cover hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* SPACE BETWEEN */}
            <div className="h-6 md:h-10" />

            {/* STATS SECTION */}
            <div className="border-t border-gray-200 py-12 px-6 md:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                    <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#c97a2b]">
                            500+
                        </h3>
                        <p className="text-xs tracking-widest text-gray-500 mt-2">
                            HAPPY GUESTS
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#c97a2b]">
                            48
                        </h3>
                        <p className="text-xs tracking-widest text-gray-500 mt-2">
                            SIGNATURE DISHES
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#c97a2b] flex justify-center items-center gap-1">
                            5 <span>★</span>
                        </h3>
                        <p className="text-xs tracking-widest text-gray-500 mt-2">
                            GOOGLE RATING
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#c97a2b]">
                            6
                        </h3>
                        <p className="text-xs tracking-widest text-gray-500 mt-2">
                            YEARS IN TOKYO
                        </p>
                    </div>

                </div>
            </div>

        </section>
    );
}