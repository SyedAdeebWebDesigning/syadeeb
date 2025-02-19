'use client';

import React, {useEffect, useState} from "react";
import {
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menu items (Now includes "About")
    const menuItems: { label: string; href: string }[] = [
        {label: "Experience", href: "#experience"},
        {label: "Projects", href: "#projects"},
        {label: "Skills", href: "#skills"},
        {label: "Contact", href: "#contact"},
    ];

    // State to track the active menu item
    const [activeItem, setActiveItem] = useState<string | null>(null);

    // Update active menu item based on URL hash
    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash.replace("#", "");
            const matchedItem = menuItems.find(
                (item) => item.href.replace("/#", "") === currentHash
            );
            if (matchedItem) {
                setActiveItem(matchedItem.label);
            }
        };

        // Run on initial load and hash changes
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [menuItems]);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} className={''}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            />
            <NavbarBrand className={'backdrop-blur'}>
                <Link
                    href={`/`}
                    color={"foreground"}
                    className="w-full text-foreground underline mt-2 md:mt-4 underline-offset-[-8px]  md:underline-offset-[-16px] decoration-primary decoration-[3px] text-5xl md:text-6xl object-contain"
                >
                    <div className={'relative'}>
                        <h3 className={'logo-text'}>
                            <span className={'text-primary font-extrabold'}>S</span>yed Adeeb
                        </h3>
                    </div>
                </Link>
            </NavbarBrand>

            {/* Navbar Items for larger screens */}
            <NavbarContent className="hidden md:flex gap-4 justify-center ">
                {menuItems.map((item) => (
                    <NavbarMenuItem key={item.label} isActive={activeItem === item.label}>
                        <Link
                            href={item.href}
                            className={`px-4 py-2 rounded-xl ${activeItem === item.label ? "bg-primary/10" : ""} font-semibold text-lg`}
                            color={activeItem === item.label ? "primary" : "foreground"}
                            onClick={() => setActiveItem(item.label)}
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>

            {/* Navbar Menu for smaller screens */}
            {isMenuOpen && (
                <NavbarMenu className={`z-[999] sm:hidden`}>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item.label}-${index}`}>
                            <Link
                                color={activeItem === item.label ? "primary" : "foreground"}
                                className="w-full text-neutral-700 dark:text-neutral-300 text-xl my-3"
                                href={item.href}
                                onClick={() => {
                                    setActiveItem(item.label);
                                    setIsMenuOpen(false); // Close menu after clicking
                                }}
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            )}
            <ThemeSwitcher/>
        </Navbar>
    );
}
