import type {Metadata} from "next";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ClerkProvider} from '@clerk/nextjs'
import {dark} from '@clerk/themes'
import React from "react";
import {Providers} from "@/app/providers";

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
        <ClerkProvider appearance={{
            baseTheme: dark,
        }}>

            <html lang="en" className={'scroll-smooth '}>
            <body
                className={`text-[#fff] font-sans bg-white dark:bg-[#181818]`}
            >
            <NextUIProvider>
                <Providers>

                    <ToastContainer theme={'dark'}/>
                    <main className={''}>{children}</main>
                </Providers>
            </NextUIProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
