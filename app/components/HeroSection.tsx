"use client"

import {IoMdPin} from "react-icons/io";
import {Avatar, Link} from "@nextui-org/react";
import {SocialIcon} from "react-social-icons";
import {motion} from "framer-motion"
import {BackgroundBeamsWithCollision} from "@/app/components/ui/background-beams-with-collision";

const HeroSection = () => {
    return (
        <section
            className="h-[80vh] md:h-[80vh] flex items-center justify-center flex-col px-4 bg-background">
            <BackgroundBeamsWithCollision className={''}>
                {/* Location and Image */}
                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                    {/* Owner Image */}
                    <motion.div initial={{x: -200, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: 0.5}}
                                className={'border-primary border-4 p-1 rounded-full'}>
                        <Avatar
                            src="/owner.png"
                            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] "
                            alt="Syed Adeeb"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <div className="text-center sm:text-left">
                        {/* Location */}
                        <motion.div className="flex items-center justify-center sm:justify-start space-x-2 mb-4"
                                    initial={{y: -200, opacity: 0}} animate={{y: 0, opacity: 1}}
                                    transition={{delay: 0.4}}>
                            <IoMdPin className="text-2xl text-primary"/>
                            <p className="text-xl sm:text-2xl text-neutral-500 dark:text-secondaryDark">Aligarh,
                                India</p>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1 initial={{x: 200, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: 1}}
                                   className="text-3xl text-neutral-800  dark:text-white sm:text-5xl md:text-7xl font-extrabold leading-tight">
                            Hello, I'm{" "}
                            <span
                                className="text-emerald-700 dark:text-primary">Syed Adeeb</span>
                            .
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            className="mt-3 text-xl sm:text-2xl md:text-3xl text-neutral-500 dark:text-secondaryDark"
                            initial={{x: 200, opacity: 0}} animate={{x: 0, opacity: 1}}
                            transition={{delay: 1.25}}>
                            Full Stack Developer
                        </motion.p>

                        {/* Social Links and Resume */}
                        <motion.div className="mt-6 space-x-4 flex items-center justify-center sm:justify-start"
                                    initial={{y: 200, opacity: 0}} animate={{y: 0, opacity: 1}}
                                    transition={{delay: 0.7}}>
                            {/* Social Icon */}
                            <SocialIcon
                                url="https://www.linkedin.com/in/syed-adeeb-b40192331/"
                                bgColor={"#3c3c3c"}
                                fgColor={"#ffffff"}
                                target="_blank"
                                className="transition-transform duration-300 ease-in-out hover:scale-110"
                            /> <SocialIcon
                            url="https://www.instagram.com/prokximus/"
                            bgColor={"#3c3c3c"}
                            fgColor={"#ffffff"}
                            target="_blank"
                            className="transition-transform duration-300 ease-in-out hover:scale-110"
                        /> <SocialIcon
                            url="https://github.com/SyedAdeebWebDesigning"
                            bgColor={"#3c3c3c"}
                            fgColor={"#ffffff"}
                            target="_blank"
                            className="transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                            {/* Resume Link */}
                            <Link
                                href="https://drive.google.com/file/d/1tNP4MWpOFyFWxw_BGqUZbZxbWs4l0MCm/view?usp=sharing"
                                target="_blank"
                                className="bg-[#3c3c3c] px-6 py-3 rounded-full text-white text-lg sm:text-xl font-medium transition-transform duration-300 ease-in-out hover:scale-110"
                            >
                                Resume
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </BackgroundBeamsWithCollision>
        </section>
    );
};

export default HeroSection;
