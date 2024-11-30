import Image from "next/image";
import {Card, CardBody} from "@nextui-org/card";
import {Link} from "@nextui-org/link";
import React from "react";

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
        {name: "Experience", href: "/dashboard/experience"},
        {name: "Projects", href: "/dashboard/projects"},
        {name: "Skills", href: "/dashboard/skills"},
        {name: "Contact", href: "/dashboard/contact"},
    ];

    return (
        <aside className="flex flex-col h-[99vh] fixed top-0  w-full text-white">
            {/* Section 1: Logo and Links */}
            <div className="flex flex-col flex-grow p-6">
                {/* Logo */}
                <div className="mb-8 mt-4">
                    <Link
                        href={`/#`}
                        color={"foreground"}
                        className="w-full underline-offset-2 decoration-primary  text-foreground underline font-semibold text-3xl object-contain"

                    >
                        <div className={'relative w-[200px] h-8'}>
                            <Image
                                src="/syedadeeb.png"
                                alt="Syed Adeeb"
                                fill
                                className={'object-contain'}
                                priority
                            /></div>
                    </Link>
                </div>

                {/* Links */}
                <nav className="space-y-8 mt-10">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="block text-lg text-neutral-200 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Section 2: User Card */}
            <Card className="bg-neutral-800 w-full max-w-[18%] border-neutral-700">
                <CardBody className="flex flex-row items-center p-4">
                    {/* User Photo */}
                    <Image
                        src="/owner.png" // Replace with dynamic path if needed
                        alt="User Photo"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />

                    {/* User Info */}
                    <div className="ml-4 flex flex-col">
                        <p className="text-lg font-medium">{userFullname}</p>
                        <p className="text-sm text-gray-400">{userEmail}</p>
                    </div>
                </CardBody>
            </Card>
        </aside>
    );
};

export default Sidebar;
