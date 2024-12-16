"use client";

import Image from "next/image";
import React from "react";
import {Timeline} from "@/app/components/ui/timeline";
import {motion} from "framer-motion";
import {LinkPreview} from "@/app/components/ui/link-preview"; // Absolute path
// import {LinkPreview} from "./ui/link-preview"; - Relative Path

export function Experience() {
    const timelineData = [
        {
            date: "Late 2024",
            title: "Fullstack Developer at",
            link: [
                {title: "PadSeva", url: "https://padseva.vercel.app/"},
            ],
            description: "Developed a fullstack application for PadSeva, a NGO based in India.",
            images: [
                "/assets/PSe1.webp",
                "/assets/PSe2.webp",
                "/assets/PSe3.webp",
                "/assets/PSe4.webp",

            ],
        },
        {
            date: "Early 2024",
            title: "Created ",
            link: [
                {title: "PROKX", url: "https://prokx.vercel.app/"},
                {title: "Gadget Galaxy", url: "https://gadget-galaxy-ecommerce.vercel.app/"},
            ],
            description: "Developed two major personal E-Commerce projects.",
            images: [
                "/assets/GG1.webp",
                "/assets/P1.webp",
                "/assets/P2.webp",
                "/assets/GG2.webp",
            ],
        },
        {
            date: "2024-2022",
            title: "Full Stack Trainee",
            link: [],
            description: "Worked as a Full Stack Trainee, created multiple personal projects.",
            images: [
                "/assets/FT1.webp",
                "/assets/FT2.webp",
                "/assets/FT3.webp",
                "/assets/FT4.webp",
            ],
        },
        {
            date: "2022-2020",
            title: "Started Web Designing",
            link: [],
            description: "Started learning web designing and created multiple projects.",
            images: [
                "/assets/O1.webp",
                "/assets/O2.webp",
                "/assets/O3.webp",
            ],
        },
    ];

    const formatLinks = (links: any) => {
        if (links.length === 1) {
            return (
                <LinkPreview
                    url={links[0].url}
                    className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                >
                    {links[0].title}
                </LinkPreview>
            );
        }
        if (links.length === 2) {
            return (
                <>
                    <LinkPreview
                        url={links[0].url}
                        className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                    >
                        {links[0].title}
                    </LinkPreview>{" "}
                    and{" "}
                    <LinkPreview
                        url={links[1].url}
                        className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                    >
                        {links[1].title}
                    </LinkPreview>
                </>
            );
        }
        if (links.length > 2) {
            const lastTwo = links.slice(-2);
            const rest = links.slice(0, -2).map((link: any, index: number) => (
                <span key={index}>
                    <LinkPreview
                        url={link.url}
                        className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                    >
                        {link.title}
                    </LinkPreview>
                    ,{" "}
                </span>
            ));
            return (
                <>
                    {rest}
                    <LinkPreview
                        url={lastTwo[0].url}
                        className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                    >
                        {lastTwo[0].title}
                    </LinkPreview>{" "}
                    and{" "}
                    <LinkPreview
                        url={lastTwo[1].url}
                        className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent"
                    >
                        {lastTwo[1].title}
                    </LinkPreview>
                </>
            );
        }
        return null;
    };

    return (
        <div className="w-full">
            <Timeline
                data={timelineData.map(
                    (
                        item: {
                            date: string;
                            title: string;
                            link: { title: string; url: string }[];
                            description: string;
                            images: string[];
                        },
                        index: number
                    ) => ({
                        title: item.date,
                        content: (
                            <motion.div
                                key={index}
                                // initial={{scale: 0.5, opacity: 0.5}}
                                // whileInView={{scale: 1, opacity: 1}}
                                // transition={{delay: 0.1}}
                            >
                                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                                    {item.title}{" "}
                                    {item.link.length > 0 && formatLinks(item.link)}
                                </h3>
                                <p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-4">
                                    {item.description}
                                </p>
                                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.images.map(
                                        (img: string, imgIndex: number) => (
                                            <motion.div initial={{scale: 0}} whileInView={{scale: 1}}
                                                        transition={{
                                                            delay: 0.1 * imgIndex,
                                                            type: "spring",
                                                            duration: 2.5,
                                                            stiffness: 300,
                                                            damping: 20
                                                        }}>
                                                <Image
                                                    key={imgIndex}
                                                    src={img}
                                                    alt={`Image ${imgIndex + 1} for ${item.title}`}
                                                    width={500}
                                                    height={500}
                                                    objectFit={'cover'}
                                                    className="rounded-lg object-cover object-center size-[300px] md:size-[250px] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                                                /></motion.div>
                                        )
                                    )}
                                </motion.div>
                            </motion.div>
                        ),
                    })
                )}
            />
        </div>
    );
}
