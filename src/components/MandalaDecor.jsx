// src/components/MandalaDecor.jsx
import React from "react";

const MandalaDecor = ({ className = "", size = 120 }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
        <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="0.4" opacity="0.12" />
        <circle cx="60" cy="60" r="15" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />

        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 60 60)`}>
                <ellipse cx="60" cy="60" rx="3" ry="50" stroke="currentColor" strokeWidth="0.25" opacity="0.08" />
                <ellipse cx="60" cy="60" rx="2" ry="38" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
            </g>
        ))}

        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={`p-${angle}`} transform={`rotate(${angle} 60 60)`}>
                <path d="M60 10 Q65 30 60 35 Q55 30 60 10Z" stroke="currentColor" strokeWidth="0.3" opacity="0.12" fill="none" />
            </g>
        ))}
    </svg>
);

export default MandalaDecor;