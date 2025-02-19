"use server";

import prisma from "@/lib/prisma";

export const getSkills = async () => {
    try {
        const skills = await prisma.technology.findMany();

        return skills ?? null;
    } catch (error) {
        console.error("Error fetching skills:", error);
        throw new Error("Failed to fetch skills. Please try again.");
    }
}

export const addSkill = async (name: string, shortDescription: string, backgroundColor: string, image: string) => {
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