import type {Metadata} from "next";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <html lang="en" className={'bg-[#181818] scroll-smooth'}>
        <body
            className={`text-[#fff] bg-[#181818] font-sans `}
        >
        <NextUIProvider>
            <ToastContainer theme={'dark'}/>
            <main className={''}>{children}</main>
        </NextUIProvider>
        </body>
        </html>
    );
}
