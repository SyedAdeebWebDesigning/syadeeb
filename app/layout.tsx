import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";
import { Providers } from "@/app/providers";

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
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				elements: {
					formButtonPrimary:
						"dark:bg-emerald-600 dark:hover:bg-emerald-700 py-2 px-3 bg-emerald-500 hover:bg-emerald-600 !shadow-none",
					footerActionLink: "text-emerald-700 hover:text-emerald-800 w-fit",
					card: "dark:bg-black/10 bg-neutral-100 mb-2",
					footer: "dark:bg-black/10 bg-neutral-100",
					footerAction: "dark:bg-neutral-900 bg-neutral-100 w-full -mt-2", // Add relative to allow absolute positioning
					footerActionText: "dark:text-white text-black",
					footerLinkContainer:
						"absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center hidden", // Hide by default
					signUpLink: "text-blue-500 hover:text-blue-700", // Style for sign-up link
					formFieldInput:
						"dark:bg-neutral-800 bg-neutral-200 py-4 px-3 text-black dark:text-white ",
					formFieldLabel: "dark:text-white text-black",
					headerTitle: "text-black dark:text-white",
					headerSubtitle: "text-black dark:text-white",
					socialButtonsBlockButton:
						"dark:bg-neutral-800 dark:hover:bg-neutral-800 py-2 px-3 bg-neutral-200 hover:bg-neutral-200",
					socialButtonsBlockButtonText: "dark:text-white text-black",
					dividerText: "dark:text-white text-black",
					dividerRow: "dark:text-neutral-200 text-neutral-800",
					dividerLine: "dark:bg-neutral-400 bg-neutral-600",
					formFieldInputShowPasswordButton:
						"dark:text-neutral-400 text-neutral-600 hover:text-neutral-500",
					otpCodeFieldInputs: " dark:text-white text-black",
					otpCodeFieldInput:
						"!dark:border-neutral-200 !border-2 !border-neutral-800 dark:text-white text-black",
					formResendCodeLink: "dark:text-white text-black",
					identityPreviewText: "dark:text-neutral-200 text-neutral-800",
					identityPreviewEditButtonIcon:
						"dark:text-neutral-200 text-neutral-800",
					// formField
				},
			}}>
			<html lang="en" className={"scroll-smooth"}>
				<body
					className={`text-[#fff] font-sans bg-[#ebebeb] dark:bg-[#181818]`}>
					<NextUIProvider>
						<Providers>
							<ToastContainer autoClose={1500} theme="colored" />
							<main className={"bg-[#ebebeb] dark:bg-[#181818]"}>
								{children}
							</main>
						</Providers>
					</NextUIProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
