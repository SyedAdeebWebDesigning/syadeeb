'use client';

import Image from "next/image";
import {Card, CardBody} from "@nextui-org/card";
import {Link} from "@nextui-org/link";
import React from "react";
import {usePathname} from "next/navigation"; // Import usePathname for route checking
import SignOutButton from "@/app/components/SignOutButton";

export interface SidebarProps {
    userFullname: string;
    userEmail: string;
    userImg: string;
}

const Sidebar = ({
                     userFullname,
                     userEmail,
                     userImg,
                 }: SidebarProps) => {
    const links = [
        {name: "Dashboard", href: "/dashboard"},
        {name: "Experience", href: "/experience"},
        {name: "Projects", href: "/projects"},
        {name: "Skills", href: "/skills"},
        {name: "Contact", href: "E/contact"},
    ];

    const pathname = usePathname(); // Get current route

    return (
        <aside className="flex flex-col h-[99vh] fixed top-0 w-full max-w-[18%] dark:text-white text-black">
            {/* Section 1: Logo and Links */}
            <div className="flex flex-col flex-grow py-6 px-1">
                {/* Logo */}
                <div className="mb-8 mt-4 flex items-center">
                    <Link
                        href={`/#`}
                        color={"foreground"}
                        className="w-full text-foreground underline underline-offset-[-16px] decoration-primary decoration-[3px] text-6xl object-contain"
                    >
                        <div className={'relative h-12'}>
                            <h3 className={'logo-text'}>
                                <span className={'text-primary font-extrabold'}>S</span>yed Adeeb
                            </h3>
                        </div>
                    </Link>
                </div>

                {/* Links */}
                <nav className="space-y-8 mt-10 w-full">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`block text-lg py-4 px-4 transition-colors ${
                                pathname === link.href
                                    ? 'text-primary font-semibold rounded-xl dark:text-primary bg-primary/10 ' // Active link styles
                                    : 'text-neutral-600 dark:text-neutral-200 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Section 2: User Card */}
            <Card
                className="bg-neutral-200 dark:bg-neutral-800 w-full border-neutral-300 dark:border-neutral-700">
                <CardBody className="flex flex-row items-center p-4">
                    {/* User Photo */}
                    <Image
                        src="/owner.png" // Replace with dynamic path if needed
                        alt="User Photo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />

                    {/* User Info */}
                    <div className="ml-4 flex flex-col">
                        <p className="text-lg font-medium">{userFullname}</p>
                        <p className="text-sm dark:text-gray-400 text-gray-600 -mt-1 mb-2">{userEmail}</p>
                        <SignOutButton/>
                    </div>
                </CardBody>
            </Card>
        </aside>
    );
};

export default Sidebar;
