"use server";

import {account, databases, ID} from "@/lib/appwrite";
// @ts-ignore
import bcrypt from "bcrypt";


const DATABASE_ID = process.env.APPWRITE_DATABASE_ID; // Your Appwrite database ID
const COLLECTION_ID = process.env.APPWRITE_USERS_COLLECTION_ID; // Your Appwrite collection ID

// Page a new user
export const registerUser = async (
    email: string,
    password: string,
    name: string,
    isAdmin: boolean = false,
    imgUrl: string = ""
) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        console.error("Invalid email format.");
    }

    if (password.length < 8) {
        console.error("Password must be at least 8 characters long.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in Appwrite authentication
        const authResponse = await account.create(
            ID.unique(), // Use Appwrite's unique ID generator
            email,
            password,
            name
        );

        // Add the user to the database with additional fields
        const user = await databases.createDocument(
            DATABASE_ID!,
            COLLECTION_ID!,
            authResponse.$id,
            {
                fullName: name,
                email,
                hashedPassword,
                isAdmin,
                imgUrl,
            }
        );
        
        return {authResponse, user};
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Ensure the error is re-thrown to be handled by the caller
    }
};


// Login user
export const loginUser = async (email: string, password: string) => {
    try {
        // Verify email/password with Appwrite
        return await account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

// Fetch current user
export const getCurrentUser = async () => {
    try {
        return await account.get();

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Update user data in the database
export const updateUser = async (userId: string, updatedFields: Partial<{
    fullName: string;
    imgUrl: string;
    isAdmin: boolean
}>) => {
    try {
        return await databases.updateDocument(DATABASE_ID!, COLLECTION_ID!, userId, updatedFields);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};