import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="text-7xl font-extrabold text-red-500">404</h1>

            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Page Not Found
            </h2>

            <p className="mt-2 text-gray-500 text-center max-w-md">
                Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>

            <Link
                to="/"
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;