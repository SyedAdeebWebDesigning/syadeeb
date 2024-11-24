"use client";

import React, {useEffect, useRef, useState} from "react";

export const TextHoverEffect = ({
                                    text,
                                    duration = 0.4,
                                }: {
    text: string;
    duration?: number;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({x: 0, y: 0});
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({cx: "50%", cy: "50%"});

    const uniqueId = React.useId(); // Generate unique IDs for gradients and masks

    useEffect(() => {
        if (svgRef.current && cursor.x && cursor.y) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({x: e.clientX, y: e.clientY})}
            className="select-none"
        >
            <defs>
                {/* Text Gradient */}
                <linearGradient id={`textGradient-${uniqueId}`} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--green-700)"/>
                    <stop offset="50%" stopColor="var(--emerald-700)"/>
                    <stop offset="100%" stopColor="var(--green-700)"/>
                </linearGradient>

                {/* Radial Mask */}
                <radialGradient
                    id={`revealMask-${uniqueId}`}
                    gradientUnits="userSpaceOnUse"
                    cx={maskPosition.cx}
                    cy={maskPosition.cy}
                    r="20%"
                >
                    <stop offset="0%" stopColor="white"/>
                    <stop offset="100%" stopColor="black"/>
                </radialGradient>

                <mask id={`textMask-${uniqueId}`}>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill={`url(#revealMask-${uniqueId})`}
                    />
                </mask>
            </defs>

            {/* Base White Stroke */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="#8c8c8c"
                strokeWidth="0.5"
                className="font-[helvetica] font-bold fill-transparent text-[55px]"
            >
                {text}
            </text>

            {/* Gradient-Stroked Text with Hover Effect */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke={`url(#textGradient-${uniqueId})`}
                strokeWidth="0.3"
                mask={`url(#textMask-${uniqueId})`}
                className="font-[helvetica] font-bold fill-transparent text-[55px]"
            >
                {text}
            </text>
        </svg>
    );
};
