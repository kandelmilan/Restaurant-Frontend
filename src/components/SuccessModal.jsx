import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({ onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
            onClose();
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            onClick={() => {
                navigate("/");
                onClose();
            }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
        >
            <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl text-center shadow-2xl">
                <div className="text-5xl mb-3">🎉</div>

                <h2 className="text-2xl font-bold text-orange-500">
                    Reservation Confirmed!
                </h2>

                <p className="text-gray-500 mt-2">
                    Thank you for your booking ❤️
                </p>

                <p className="text-sm mt-4 text-gray-400">
                    Redirecting to home...
                </p>

                <button
                    onClick={() => {
                        navigate("/");
                        onClose();
                    }}
                    className="mt-5 px-6 py-2 bg-orange-500 text-white rounded-xl"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}