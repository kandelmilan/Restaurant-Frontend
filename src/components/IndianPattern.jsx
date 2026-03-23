// src/components/IndianPattern.jsx
import React from "react";

const IndianPattern = ({ className = "", color = "currentColor" }) => (
  <svg
    className={className}
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Paisley-inspired ornamental divider */}
    <path d="M0 20h60" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <path d="M140 20h60" stroke={color} strokeWidth="0.5" opacity="0.3" />

    {/* Center mandala */}
    <circle cx="100" cy="20" r="8" stroke={color} strokeWidth="0.5" opacity="0.4" />
    <circle cx="100" cy="20" r="4" stroke={color} strokeWidth="0.5" opacity="0.5" />
    <circle cx="100" cy="20" r="1.5" fill={color} opacity="0.4" />

    {/* Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <ellipse
        key={angle}
        cx="100"
        cy="20"
        rx="2"
        ry="6"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.3"
        transform={`rotate(${angle} 100 20)`}
      />
    ))}

    {/* Side ornaments */}
    <circle cx="70" cy="20" r="3" stroke={color} strokeWidth="0.4" opacity="0.3" />
    <circle cx="70" cy="20" r="1" fill={color} opacity="0.3" />
    <circle cx="130" cy="20" r="3" stroke={color} strokeWidth="0.4" opacity="0.3" />
    <circle cx="130" cy="20" r="1" fill={color} opacity="0.3" />

    {/* Diamond accents */}
    <path d="M80 20l3-3 3 3-3 3z" stroke={color} strokeWidth="0.4" opacity="0.3" />
    <path d="M114 20l3-3 3 3-3 3z" stroke={color} strokeWidth="0.4" opacity="0.3" />
  </svg>
);

export default IndianPattern;