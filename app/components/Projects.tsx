"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project, Technology } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Projects({ projects }: { projects: Project[] }) {
	const [active, setActive] = useState<any | null>(null);
	const id = useId();

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setActive(null);
			}
		}

		if (active) {
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
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/20 h-full w-full z-10"
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{active && (
					<motion.div
						onClick={() => setActive(null)}
						className="fixed inset-0 grid place-items-center z-[100]">
						<motion.div
							layoutId={`project-${active.title}-${id}`}
							className="w-full max-w-[450px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
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
										className="font-medium text-left text-neutral-700 dark:text-neutral-200 text-base">
										{active.title}
									</motion.h3>
									<motion.p
										layoutId={`description-${active.description}-${id}`}
										className="text-neutral-600 dark:text-neutral-400 text-sm">
										{active.description}
									</motion.p>
								</div>

								<motion.a
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									href={active.ctaLink}
									target="_blank"
									className="font-sem-bold text-black dark:text-white text-base flex items-center"
									onClick={(e) => e.stopPropagation()} // Prevent modal from closing on "View" click
								>
									{active.ctaText}
									<ArrowRight width={15} height={15} />
								</motion.a>
							</div>

							{/* Technologies Used Section */}
							<div className="p-4 dark:text-white">
								<p className="text-lg font-semibold mb-2 text-black dark:text-white">
									Technologies Used:
								</p>
								<div className="grid grid-cols-7 gap-2">
									{active.technologies.map((tech: Technology) => (
										<div
											key={tech.id}
											style={{ backgroundColor: tech.backgroundColor }}
											className="w-12 h-12 flex items-center justify-center rounded-md shadow-md">
											<Image
												src={tech.image}
												alt={tech.name}
												width={32}
												height={32}
												className="object-contain aspect-square"
											/>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Project List */}
			<ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
				{projects.map((project, index) => (
					<motion.div
						layoutId={`project-${project.title}-${id}`}
						key={project.title}
						onClick={() => setActive(project)}
						className="p-4 flex flex-col bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 shadow-xl dark:hover:bg-neutral-700/20 rounded-xl cursor-pointer">
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
									className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
									{index + 1}. {project.title}
								</motion.h3>
								<motion.p
									layoutId={`description-${project.description}-${id}`}
									className="text-neutral-600 dark:text-neutral-400 left line-clamp-2 md:text-left text-base">
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
