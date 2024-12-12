// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

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
            className={'cursor-pointer bg-neutral-300/50 dark:bg-neutral-700/50 size-10 flex items-center justify-center rounded-xl'}>
            {theme === 'light' ? (
                <Moon onClick={() => setTheme('dark')}/>
            ) : (
                <Sun className={''} onClick={() => setTheme('light')}/>
            )}
        </div>
    )
}