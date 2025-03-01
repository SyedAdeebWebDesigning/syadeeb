"use client";
import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

export const TextHoverEffect = ({
                                    text,
                                    duration,
                                    id, // Add the id prop
                                }: {
    text: string;
    duration?: number;
    id?: string;
    automatic?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({x: 0, y: 0});
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({cx: "50%", cy: "50%"});

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
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
                <linearGradient
                    id={`textGradient-${id}`} // Use dynamic id
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor={"var(--emerald-500)"}/>
                            <stop offset="25%" stopColor={"var(--green-500)"}/>
                            <stop offset="50%" stopColor={"var(--green-300)"}/>
                            <stop offset="75%" stopColor={"var(--green-500)"}/>
                            <stop offset="100%" stopColor={"var(--emerald-500)"}/>
                        </>
                    )}
                </linearGradient>

                <motion.radialGradient
                    id={`revealMask-${id}`} // Use dynamic id
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    animate={maskPosition}
                    transition={{duration: duration ?? 0, ease: "easeOut"}}
                >
                    <stop offset="0%" stopColor="white"/>
                    <stop offset="100%" stopColor="black"/>
                </motion.radialGradient>
                <mask id={`textMask-${id}`}> {/* Use dynamic id */}
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill={`url(#revealMask-${id})`} // Use dynamic id
                    />
                </mask>
            </defs>

            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.5"
                className="font-[helvetica] font-bold fill-transparent text-[55px] stroke-neutral-500"
                initial={{strokeDashoffset: 1000, strokeDasharray: 1000}}
                whileInView={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 9,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>

            {
                hovered && (
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        stroke={`url(#textGradient-${id})`} // Use dynamic id
                        strokeWidth="1"
                        mask={`url(#textMask-${id})`} // Use dynamic id
                        className="font-[helvetica] font-bold fill-transparent text-[55px]"
                    >
                        {text}
                    </text>
                )
            }

        </svg>
    );
};
