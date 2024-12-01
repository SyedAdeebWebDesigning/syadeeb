"use server";

import prismadb from "@/lib/prisma"; // Importing the Prisma client

export interface CreateUserProps {
    firstName: string;
    clerkId: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    imgUrl: string;
}

export const createUser = async (User: CreateUserProps) => {
    try {
        // Creating a new user in the database
        const newUser = await prismadb.user.create({
            data: {
                clerkId: User.clerkId,
                firstName: User.firstName,
                lastName: User.lastName,
                email: User.email,
                isAdmin: User.isAdmin,
                imgUrl: User.imgUrl,
            },

        });
        return newUser

    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user. Please try again.");
    }
};
