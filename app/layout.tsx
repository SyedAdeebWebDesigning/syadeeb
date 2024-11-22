import type {Metadata} from "next";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";


export const metadata: Metadata = {
    title: "Syed Adeeb",
    description: "Syed Adeeb's personal website",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={'bg-[#181818]'}>
        <body
            className={`text-[#fff] bg-[#181818] font-sans `}
        >
        <NextUIProvider>
            <main className={''}>{children}</main>
        </NextUIProvider>
        </body>
        </html>
    );
}
