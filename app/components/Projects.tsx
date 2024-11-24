"use client";
import Image from "next/image";
import React, {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useOutsideClick} from "@/hooks/use-outside-click";

export function Projects() {
    const [active, setActive] = useState<(typeof projects)[number] | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
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

    useOutsideClick(ref, () => setActive(null));

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
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{
                                opacity: 0,
                                transition: {duration: 0.05},
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon/>
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-fit flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
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

                            <div className="bg-white/10">
                                <div className="flex justify-between items-start p-4 shadow shadow-amber-300">
                                    <div>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 line-clamp-2"
                                        >
                                            {active.description}
                                        </motion.p>
                                        <motion.p
                                            layoutId={`tech-${active.technologies.join(",")}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 mt-2"
                                        >
                                            <strong>Technologies Used:</strong> {active.technologies.join(", ")}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink}
                                        target="_blank"
                                        className="px-4 py-2 text-sm rounded-full font-bold bg-primary text-white mt-4 md:mt-0"
                                    >
                                        {active.ctaText}
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="w-full mx-auto gap-4">
                {projects.map((project) => (
                    <motion.div
                        layoutId={`card-${project.title}-${id}`}
                        key={`card-${project.title}-${id}`}
                        onClick={() => setActive(project)}
                        className="p-4 flex flex-col sm:items-center sm:gap-4 md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                    >
                        <motion.div layoutId={`image-${project.title}-${id}`}>
                            <Image
                                width={100}
                                height={100}
                                src={project.image}
                                alt={project.title}
                                className="h-40 w-40 sm:w-full sm:h-auto rounded-lg object-cover object-top"
                            />
                        </motion.div>
                        <div className="text-center sm:w-full md:text-left">
                            <motion.h3
                                layoutId={`title-${project.title}-${id}`}
                                className="font-medium text-neutral-800 dark:text-neutral-200"
                            >
                                {project.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${project.description}-${id}`}
                                className="text-neutral-600 dark:text-neutral-400"
                            >
                                {project.description}
                            </motion.p>
                        </div>
                        <motion.button
                            layoutId={`button-${project.title}-${id}`}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-primary text-white mt-4 sm:mt-2 md:mt-0"
                        >
                            {project.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{
                opacity: 0,
                transition: {duration: 0.05},
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 6l-12 12"/>
            <path d="M6 6l12 12"/>
        </motion.svg>
    );
};

const projects = [
    {
        description: "A music streaming app for discovering new songs.",
        title: "MusicStream",
        image: "/assets/FT1.png",
        ctaText: "View",
        ctaLink: "https://example.com/music-stream",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        description: "A social networking platform for professionals.",
        title: "LinkedIn Clone",
        image: "/assets/FT2.png",
        ctaText: "View",
        ctaLink: "https://example.com/linkedin-clone",
        technologies: ["React", "Firebase", "Express"],
    },
    {
        description: "An e-commerce platform for buying and selling products.",
        title: "ShopX",
        image: "/assets/FT3.png",
        ctaText: "View",
        ctaLink: "https://example.com/shopx",
        technologies: ["Vue", "Node.js", "MongoDB"],
    },
    {
        description: "A personal blog platform for writing and sharing content.",
        title: "BlogHub",
        image: "/assets/FT4.png",
        ctaText: "View",
        ctaLink: "https://example.com/bloghub",
        technologies: ["Next.js", "GraphQL", "Prisma"],
    },
    {
        description: "A project management tool for teams.",
        title: "TaskMaster",
        image: "/assets/O1.png",
        ctaText: "View",
        ctaLink: "https://example.com/taskmaster",
        technologies: ["React", "Redux", "Firebase"],
    },
];
