// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {motion} from 'framer-motion'
import {Moon, Sun} from 'lucide-react';


export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            className={'w-[84px] h-12 p-1 rounded-full relative bg-neutral-200 text-black dark:text-white dark:bg-neutral-700'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <motion.div
                initial={false}

                animate={{x: theme === 'light' ? 0 : 35}}
                transition={{type: "spring", stiffness: 300, damping: 20}}
                className={`cursor-pointer absolute size-10 bg-neutral-100 dark:bg-neutral-500 flex items-center justify-center rounded-full`}>
                {theme === 'light' ? (
                    <Sun onClick={() => setTheme('dark')}/>
                ) : (
                    <Moon className={''} onClick={() => setTheme('light')}/>
                )}
            </motion.div>
        </div>
    )
}