import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-200 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center animate-fade-in">
                <div className="text-6xl animate-bounce">🚧</div>
                <h1 className="mt-4 text-6xl font-extrabold text-red-500">
                    404
                </h1>
                <h2 className="mt-2 text-2xl font-semibold text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-3 text-gray-500">
                    Oops! The page you're looking for doesn’t exist, was moved,
                    or you may have typed the wrong URL.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;