"use server";

import {databases} from "@/lib/appwrite";

// Fetch all documents from the "temp" collection
export const getTempDocuments = async () => {
    try {
        const response = await databases.listDocuments(process.env.APPWRITE_DATABASE_ID!, process.env.APPWRITE_TEMP_COLLECTION_ID!); // Replace with your IDs
        return response.documents;
    } catch (error) {
        console.error("Error fetching temp documents:", error);
        throw error;
    }
};

// Add a new document to the "temp" collection
export const addTempDocument = async (data: Record<string, unknown>) => {
    try {
        const response = await databases.createDocument(
            process.env.APPWRITE_DATABASE_ID!,    // Database ID
            process.env.APPWRITE_TEMP_COLLECTION_ID!,    // Collection ID
            "unique()", // Unique ID (or replace with your own ID)
            data       // Document data
        );
        return response;
    } catch (error) {
        console.error("Error adding temp document:", error);
        throw error;
    }
};
