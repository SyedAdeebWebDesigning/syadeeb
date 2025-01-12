"use server";

import prisma from "@/lib/prisma"; // Importing the Prisma client // Importing the Prisma client

export const getExperiences = async () => {
    try {
        // Fetching experiences from the database
        const experiences = await prisma.experience.findMany({
            include: {
                links: true,
                images: true,
            },
        });

        return experiences ?? null;
    } catch (error) {
        console.error("Error fetching experiences:", error);
        throw new Error("Failed to fetch experiences. Please try again.");
    }
};

export const createExperience = async (data: {
    date: string;
    title: string;
    shortDesc: string;
    links: { title: string; url: string }[];
    images: string[];
}) => {
    try {
        // Filter out empty or invalid image URLs
        const validImages = data.images.filter((url) => url.trim() !== "");

        // Creating a new experience in the database
        return await prisma.experience.create({
            data: {
                date: data.date,
                title: data.title,
                shortDesc: data.shortDesc,
                links: {
                    create: data.links.map((link) => ({
                        title: link.title,
                        url: link.url,
                    })),
                },
                images: {
                    create: validImages.map((url) => ({url})),
                },
            },
        });
    } catch (error) {
        console.error("Error creating experience:", error);
        throw new Error("Failed to create experience. Please try again.");
    }
};

