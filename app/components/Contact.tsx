"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { addMessage } from "@/lib/actions/contact.action";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await addMessage({ name, email, message });
			setName("");
			setEmail("");
			setMessage("");
			toast.success("Message sent successfully.");
		} catch (error) {
			toast.error("Error sending message. Please try again.");
		}
	};
	return (
		<div>
			<div className="flex flex-col w-fit mx-auto gap-y-2 mb-10 sm:-mt-10">
				<Link
					href={"mailto:me@syedadeeb.in"}
					className={
						"flex space-x-2 items-center text-neutral-800 dark:text-neutral-200"
					}>
					<Mail className={"text-primary"} />
					<h1 className={"text-xl"}>me@syedadeeb.in</h1>
				</Link>
				<Link
					href={"tel:+918630766188"}
					className={
						"flex space-x-2 items-center text-left text-neutral-800 dark:text-neutral-200"
					}>
					<Phone className={"text-primary"} />
					<h1 className={"text-xl"}>+91 86307 66188</h1>
				</Link>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
					<Input
						label="Name"
						type="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={
							"contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
						}
						variant={"bordered"}
						required
					/>
					<Input
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={
							"contact-input  bg-neutral-100 dark:bg-neutral-800 rounded-xl"
						}
						variant={"bordered"}
						required
					/>
				</div>
				<Textarea
					className="col-span-12 md:col-span-6 mb-6 md:mb-0 mt-4 contact-input  bg-neutral-100 dark:bg-neutral-800 rounded-xl"
					label="Your Message"
					labelPlacement="inside"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					variant={"bordered"}
					required
				/>
				<Button
					className="col-span-12 md:col-span-6 mt-4 text-white w-full dark:bg-[#00C774] bg-[#04533B]"
					variant={"solid"}
					size={"lg"}
					type="submit">
					Submit
				</Button>
			</form>
		</div>
	);
};
export default Contact;

// Test
