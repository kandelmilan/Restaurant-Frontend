import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SuccessModal({ onClose }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            onClick={() => {
                navigate("/");
                onClose();
            }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 dark:bg-black/80 z-50 p-4 transition-colors duration-300"
        >
            <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl text-center shadow-2xl max-w-sm transition-colors duration-300">
                <div className="text-6xl mb-4">🎉</div>

                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-3">
                    {t('successModal.reservationConfirmed')}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {t('successModal.thankYou')}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                    {t('successModal.redirecting')}
                </p>

                <button
                    onClick={() => {
                        navigate("/");
                        onClose();
                    }}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-xl font-medium transition-colors"
                >
                    {t('successModal.goHome')}
                </button>
            </div>
        </div>
    );
}