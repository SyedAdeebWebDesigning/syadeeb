'use client';

import React, {useEffect, useState} from "react";
import {
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";


export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menu items
    const menuItems: string[] = ["Experience", "Projects", "Skills", "Contact"];

    // State to track the active menu item
    const [activeItem, setActiveItem] = useState<string | null>(null);


    // Update active menu item based on URL hash
    useEffect(() => {
        const handleHashChange = () => {
            // Extract the hash and remove the `#`
            const currentHash = window.location.hash.replace("#", "");
            const matchedItem = menuItems.find(
                (item) => item.toLowerCase() === currentHash.toLowerCase()
            );
            if (matchedItem) {
                setActiveItem(matchedItem);
            }
        };

        // Run on initial load and hash changes
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [menuItems]);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            {/* Navbar Content */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className={'backdrop-blur'}>
                    <Link
                        href={`/#`}
                        color={"foreground"}
                        className="w-full text-foreground underline  underline-offset-[-16px] decoration-primary decoration-[3px] text-6xl object-contain"
                    >
                        <div className={'relative  h-12'}>
                            <h3 className={'logo-text'}><span className={'text-primary font-extrabold'}>S</span>yed
                                Adeeb</h3>
                        </div>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Navbar Items for larger screens */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item) => (
                    <NavbarItem key={item} isActive={activeItem === item}>
                        <Link
                            href={`/#${item.toLowerCase()}`} // Anchor links
                            className={`px-4 py-2 rounded-xl ${activeItem === item ? "bg-primary/10" : ""} font-semibold text-lg`}
                            color={activeItem === item ? "primary" : "foreground"} // Active state styling
                            onClick={() => setActiveItem(item)} // Set active item on click
                        >
                            {item}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Navbar Menu for smaller screens */}
            <NavbarMenu>
                {menuItems.map((item: string, index: number) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                activeItem === item
                                    ? "primary"
                                    : index === menuItems.length - 1
                                        ? "foreground"
                                        : "foreground"
                            }
                            className="w-full"
                            href={`/#${item.toLowerCase()}`} // Anchor links
                            onClick={() => setActiveItem(item)} // Set active item on click
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
