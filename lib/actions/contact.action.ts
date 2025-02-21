"use server";

import prisma from "@/lib/prisma";

export const getMessages = async () => {
	try {
		const messages = await prisma.contact.findMany();
		return messages ?? null;
	} catch (error) {
		console.error("Error fetching messages:", error);
		throw new Error("Failed to fetch messages. Please try again.");
	}
};

export const addMessage = async ({
	name,
	email,
	message,
}: {
	name: string;
	email: string;
	message: string;
}) => {
	try {
		return await prisma.contact.create({
			data: {
				name,
				email,
				message,
			},
		});
	} catch (error) {
		console.error("Error adding message:", error);
		throw new Error("Failed to add message. Please try again.");
	}
};
