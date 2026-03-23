// src/components/SpiceLevel.jsx
import React from "react";
import { Flame } from "lucide-react";
const SpiceLevel = ({ level }) => {
    return (
        <div className="text-xs text-orange-500">
            {"🌶️".repeat(level)}
            <span className="text-gray-400 ml-1">
                {"🌶️".repeat(3 - level)}
            </span>
        </div>
    );
};
export default SpiceLevel;