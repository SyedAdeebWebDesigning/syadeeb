"use server";

import prisma from "@/lib/prisma"; // Importing the Prisma client

export interface CreateUserProps {
    firstName: string;
    clerkId: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    imgUrl: string;
}

export const createUser = async (UserData: CreateUserProps) => {
    try {
        // Creating a new user in the database
        return await prisma.user.create({
            data: {
                clerkId: UserData.clerkId,
                firstName: UserData.firstName,
                lastName: UserData.lastName,
                email: UserData.email,
                isAdmin: UserData.isAdmin,
                imgUrl: UserData.imgUrl,
            },
        });

    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user. Please try again.");
    }
};
