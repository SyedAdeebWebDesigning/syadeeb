"use client"

import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import Image from "next/image";

export const HoverEffect = ({
                                items,
                                className,
                            }: {
    items: {
        title: string;
        description: string;
        image: string
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 ",
                className
            )}
        >
            {items.map((item, idx) => (
                <div

                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-emerald-200 dark:bg-emerald-800 block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{opacity: 0}}
                                animate={{
                                    opacity: 1,
                                    transition: {duration: 0.15},
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {duration: 0.15, delay: 0.2},
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <div className={'flex items-center'}>
                            <div
                                className={'pr-2 relative size-[50px] object-cover bg-neutral-200 dark:bg-neutral-700 rounded-lg'}>
                                <Image
                                    src={item.image}
                                    alt={'image'}
                                    className={'p-2'}
                                    fill
                                />
                            </div>
                            <div className={'ml-2'}>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card = ({
                         className,
                         children,
                     }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full  overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
                              className,
                              children,
                          }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-neutral-800 dark:text-neutral-100 font-bold tracking-wide", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
                                    className,
                                    children,
                                }: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                " text-zinc-400 tracking-wide leading-relaxed text-sm line-clamp-2",
                className
            )}
        >
            {children}
        </p>
    );
};
