"use client";

import Image from "next/image";
import React from "react";
import { Timeline } from "@/app/components/ui/timeline";
import { motion } from "framer-motion";
import { LinkPreview } from "@/app/components/ui/link-preview"; // Absolute path

export function Experience({ timeline }: { timeline: any }) {
	const formatLinks = (links: any) => {
		if (!Array.isArray(links) || links.length === 0) return null;

		if (links.length === 1) {
			return (
				<LinkPreview
					url={links[0].url}
					className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
					{links[0].title}
				</LinkPreview>
			);
		}
		if (links.length === 2) {
			return (
				<>
					<LinkPreview
						url={links[0].url}
						className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
						{links[0].title}
					</LinkPreview>{" "}
					and{" "}
					<LinkPreview
						url={links[1].url}
						className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
						{links[1].title}
					</LinkPreview>
				</>
			);
		}
		const lastTwo = links.slice(-2);
		const rest = links.slice(0, -2).map((link: any, index: number) => (
			<span key={index}>
				<LinkPreview
					url={link.url}
					className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
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
					className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
					{lastTwo[0].title}
				</LinkPreview>{" "}
				and{" "}
				<LinkPreview
					url={lastTwo[1].url}
					className="font-bold bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">
					{lastTwo[1].title}
				</LinkPreview>
			</>
		);
	};

	return (
		<div className="w-full">
			<Timeline
				data={timeline.map(
					(
						item: {
							date: string;
							title: string;
							links?: { title: string; url: string }[];
							shortDesc: string;
							images: string[];
						},
						index: number,
					) => ({
						title: item.date,
						content: (
							<motion.div key={index}>
								<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
									{item.title}{" "}
									{item.links &&
										item.links.length > 0 &&
										formatLinks(item.links)}
								</h3>
								<p className="text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-normal mb-4">
									{item.shortDesc}
								</p>
								<motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{item.images.map((img: any, imgIndex: number) => (
										<motion.div
											key={imgIndex}
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											transition={{
												delay: 0.1 * imgIndex,
												type: "spring",
												duration: 2.5,
												stiffness: 300,
												damping: 20,
											}}>
											<Image
												src={img.url}
												alt={`Image ${imgIndex + 1} for ${item.title}`}
												width={500}
												height={500}
												className="rounded-lg object-cover object-center size-[300px] md:size-[250px] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
											/>
										</motion.div>
									))}
								</motion.div>
							</motion.div>
						),
					}),
				)}
			/>
		</div>
	);
}
