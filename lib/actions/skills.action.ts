"use server";

import prisma from "@/lib/prisma";

export const getSkills = async () => {
	try {
		const allTechnologies = await prisma.technology.findMany(); // 👈 Fetch all data

		const skills = allTechnologies.filter((tech) => tech.showOnSkill === true); // 👈 Manually filter

		return skills.length > 0 ? skills : null; // Return null if empty
	} catch (error) {
		console.error("❌ Error fetching skills:", error);
		throw new Error("⚠️ Failed to fetch skills. Please try again later.");
	}
};

export const getTechnologies = async () => {
	try {
		const technologies = await prisma.technology.findMany();

		return technologies ?? null;
	} catch (error) {
		console.error("Error fetching technologies:", error);
		throw new Error("Failed to fetch technologies. Please try again.");
	}
};

export const getTechnology = async (id: string) => {
	try {
		const technology = await prisma.technology.findUnique({
			where: {
				id,
			},
		});

		if (!technology) {
			throw new Error("Technology not found.");
		}

		return technology;
	} catch (error) {
		console.error("Error fetching technology:", error);
		throw new Error("Failed to fetch technology. Please try again.");
	}
};

export const toggleDisplaySkill = async (id: string) => {
	try {
		const skill = await prisma.technology.findUnique({
			where: {
				id,
			},
		});

		if (!skill) {
			throw new Error("Skill not found.");
		}

		return await prisma.technology.update({
			where: {
				id,
			},
			data: {
				showOnSkill: !skill.showOnSkill,
			},
		});
	} catch (error) {
		console.error("Error toggling skill display:", error);
		throw new Error("Failed to toggle skill display. Please try again.");
	}
};

export const addSkill = async (
	name: string,
	shortDescription: string,
	backgroundColor: string,
	image: string,
) => {
	try {
		if (!name || !shortDescription || !backgroundColor || !image) {
			throw new Error("All fields are required.");
		}

		return await prisma.technology.create({
			data: {
				name,
				shortDescription,
				backgroundColor,
				image,
			},
		});
	} catch (error: any) {
		console.error("Error creating skill:", error);

		if (error.code === "P2002") {
			throw new Error("A skill with this name already exists.");
		}

		throw new Error("Failed to create skill. Please try again.");
	} finally {
		await prisma.$disconnect(); // Ensure Prisma connection is closed properly
	}
};
