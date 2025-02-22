"use client";

import { IoMdPin } from "react-icons/io";
import { Avatar } from "@nextui-org/react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ColourfulText } from "./ui/colorfull-text";
import { Vortex } from "./ui/vortex";

const HeroSection = () => {
	const [imageUrl, setImageUrl] = useState("/me.webp");
	const deviceWidth = window.innerWidth;
	return (
		<Vortex
			backgroundColor="rgba(255,255,255,0)"
			className="max-w-3xl mx-auto"
			particleCount={deviceWidth > 768 ? 1470 : 500}>
			<section className="h-[80vh] md:h-[80vh] flex items-center justify-center flex-col px-4 bg-background">
				{/* <BackgroundBeamsWithCollision className={""}> */}
				{/* Location and Image */}
				<div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8  backdrop-blur-[2px] rounded-full p-20 bg-white/10 dark:bg-neutral-800/10">
					{/* Owner Image */}
					<motion.div
						transition={{
							delay: 1,
							type: "spring",
							stiffness: 120,
							damping: 12,
						}}
						whileHover={{
							rotate: 360, // Slight enlargement on hover
						}}
						className="border-primary border-4 p-1 rounded-full cursor-pointer "
						onMouseEnter={() => {
							setTimeout(() => {
								setImageUrl("/me.webp");
							}, 1000);
						}}
						onMouseLeave={() => {
							setTimeout(() => {
								setImageUrl("/me.webp");
							}, 1000);
						}}>
						<Avatar
							src={imageUrl}
							className="w-[120px] h-[120px] lg:w-[250px] lg:h-[250px]"
							size="lg"
							alt="Syed Adeeb"
						/>
					</motion.div>

					{/* Text Content */}
					<div className="text-center lg:text-left ">
						{/* Location */}
						<motion.div
							className="flex items-center justify-center lg:justify-start space-x-2 mb-4"
							initial={{ y: -200, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.1 }}>
							<IoMdPin className="text-2xl text-primary" />
							<p className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300">
								Aligarh, India
							</p>
						</motion.div>

						{/* Main Heading */}
						<motion.h1
							initial={{ x: 200, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.25 }}
							className="text-3xl text-neutral-700 dark:text-neutral-300 truncate  lg:text-5xl md:text-7xl font-extrabold leading-tight">
							Hello, I'm <ColourfulText text="Syed Adeeb" />
						</motion.h1>

						{/* Subheading */}
						<motion.p
							className="mt-3 text-xl lg:text-2xl md:text-3xl text-neutral-500 dark:text-neutral-300"
							initial={{ x: 200, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.5 }}>
							Full Stack Developer
						</motion.p>

						{/* Social Links and Resume */}
						<div className="mt-6 space-x-4 flex items-center justify-center lg:justify-start">
							{/* Social Icon */}
							<motion.div
								className={"cursor-pointer"}
								initial={{ y: 200, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.75 }}>
								<SocialIcon
									url="https://www.linkedin.com/in/syed-adeeb-b40192331/"
									bgColor={"#3c3c3c"}
									fgColor={"#ffffff"}
									target="_blank"
									className="transition-transform duration-300 ease-in-out hover:scale-110"
								/>
							</motion.div>
							<motion.div
								className={"cursor-pointer"}
								initial={{ y: 200, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.85 }}>
								<SocialIcon
									url="https://www.instagram.com/prokximus/"
									bgColor={"#3c3c3c"}
									fgColor={"#ffffff"}
									target="_blank"
									className="transition-transform duration-300 ease-in-out hover:scale-110"
								/>
							</motion.div>
							<motion.div
								className={"cursor-pointer"}
								initial={{ y: 200, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.95 }}>
								<SocialIcon
									url="https://github.com/SyedAdeebWebDesigning"
									bgColor={"#3c3c3c"}
									fgColor={"#ffffff"}
									target="_blank"
									className="transition-transform duration-300 ease-in-out hover:scale-110"
								/>
							</motion.div>
							{/* Resume Link */}
							<motion.div
								className={"cursor-pointer"}
								initial={{ y: 200, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 1.05 }}>
								<Link
									href="https://drive.google.com/file/d/1tNP4MWpOFyFWxw_BGqUZbZxbWs4l0MCm/view?usp=sharing"
									target="_blank">
									<div className="bg-[#3c3c3c] px-6 py-3 rounded-full text-white text-lg lg:text-xl font-medium transition-transform duration-300 ease-in-out hover:scale-110">
										Resume
									</div>
								</Link>
							</motion.div>
						</div>
					</div>
				</div>
				{/* </BackgroundBeamsWithCollision> */}
			</section>
		</Vortex>
	);
};

export default HeroSection;
