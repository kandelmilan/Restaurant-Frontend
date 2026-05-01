import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-gray-200 px-4">

            <div className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">

                {/* Floating Emoji */}
                <div className="text-7xl animate-[float_3s_ease-in-out_infinite]">
                    🚧
                </div>

                {/* 404 */}
                <h1 className="mt-6 text-7xl font-black bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-3 text-2xl font-semibold text-gray-800">
                    Oops! Page not found
                </h2>

                {/* Description */}
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                    The page you’re looking for doesn’t exist or might have been moved.
                    Try going back or head to the homepage.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                    >
                        <Home size={18} />
                        Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Optional Search Hint */}
                <div className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-1">
                    <Search size={14} />
                    Try searching for what you need
                </div>
            </div>

            {/* Custom Animation */}
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
            </style>

        </div>
    );
};

export default NotFound;