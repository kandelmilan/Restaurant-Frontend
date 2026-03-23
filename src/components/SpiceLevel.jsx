// src/components/SpiceLevel.jsx
import React from "react";
import { Flame } from "lucide-react";

const SpiceLevel = ({ level }) => {
    if (level === 0) {
        return (
            <span className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                Mild
            </span>
        );
    }

    return (
        <span className="flex items-center gap-0.5">
            {Array.from({ length: 3 }, (_, i) => (
                <Flame
                    key={i}
                    className={`h-3 w-3 ${i < level ? "text-primary fill-primary" : "text-border"}`}
                />
            ))}
        </span>
    );
};
export default SpiceLevel;