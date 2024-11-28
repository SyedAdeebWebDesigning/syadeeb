import {Account, Client, Databases, ID} from "appwrite";

export const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const account = new Account(client);
export {ID}; // Explicitly export ID
