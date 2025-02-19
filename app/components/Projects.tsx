"use client";
import Image from "next/image";
import React, {useEffect, useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export function Projects() {
    const [active, setActive] = useState<(typeof projects)[number] | boolean | null>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <motion.div
                        onClick={() => setActive(null)} // Close on clicking anywhere inside or outside
                        className="fixed inset-0 grid place-items-center z-[100]"
                    >
                        <motion.div
                            layoutId={`project-${active.title}-${id}`}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <Image
                                    priority
                                    width={200}
                                    height={200}
                                    src={active.image}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div className="p-4 flex justify-between items-start">
                                <div>
                                    <motion.h3
                                        layoutId={`title-${active.title}-${id}`}
                                        className="font-medium text-left text-neutral-700 dark:text-neutral-200 text-base"
                                    >
                                        {active.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${active.description}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-base"
                                    >
                                        {active.description}
                                    </motion.p>
                                </div>

                                <motion.a
                                    layout
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    href={active.ctaLink}
                                    target="_blank"
                                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    onClick={(e) => e.stopPropagation()} // Prevent modal from closing on "View" click
                                >
                                    {active.ctaText}
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                {projects.map((project) => (
                    <motion.div
                        layoutId={`project-${project.title}-${id}`}
                        key={project.title}
                        onClick={() => setActive(project)}
                        className="p-4 flex flex-col bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 shadow-xl dark:hover:bg-neutral-700/20 rounded-xl cursor-pointer"
                    >
                        <div className="flex gap-4 flex-col w-full">
                            <motion.div layoutId={`image-${project.title}-${id}`}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={project.image}
                                    alt={project.title}
                                    className="h-60 w-full rounded-lg object-cover object-top"
                                />
                            </motion.div>
                            <div className="flex justify-start items-start flex-col">
                                <motion.h3
                                    layoutId={`title-${project.title}-${id}`}
                                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                                >
                                    {project.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${project.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400 left line-clamp-2 md:text-left text-base"
                                >
                                    {project.description}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

const projects = [
    {
        description: "A music streaming app for discovering new songs.",
        title: "MusicStream",
        image: "/assets/FT1.webp",
        ctaText: "View",
        ctaLink: "https://example.com/music-stream",
    },
    {
        description: "A social networking platform for professionals.",
        title: "LinkedIn Clone",
        image: "/assets/FT2.webp",
        ctaText: "View",
        ctaLink: "https://example.com/linkedin-clone",
    },
    {
        description: "An e-commerce platform for buying and selling products.",
        title: "ShopX",
        image: "/assets/FT3.webp",
        ctaText: "View",
        ctaLink: "https://example.com/shopx",
    },
    {
        description: "A personal blog platform for writing and sharing content.",
        title: "BlogHub",
        image: "/assets/FT4.webp",
        ctaText: "View",
        ctaLink: "https://example.com/bloghub",
    },
    {
        description: "A project management tool for teams.",
        title: "TaskMaster",
        image: "/assets/O1.webp",
        ctaText: "View",
        ctaLink: "https://example.com/taskmaster",
    },
];
