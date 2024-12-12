import {createUser, CreateUserProps, deleteUserByClerkId} from "@/lib/actions/user.action";
import {Webhook} from "svix";
import {headers} from "next/headers";
import {clerkClient, WebhookEvent} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred -- no svix headers", {status: 400});
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        return new Response("Error occurred", {status: 400});
    }

    if (evt.type === "user.created") {
        const {id, email_addresses, image_url, first_name, last_name} = evt.data;

        const user: CreateUserProps = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            firstName: first_name ?? "",
            lastName: last_name ?? "",
            imgUrl: image_url,
            isAdmin: false,
        };

        try {
            const newUser = await createUser(user);

            // Update Clerk user metadata with newly created user ID
            if (newUser) {
                // @ts-ignore
                await clerkClient.users.updateMetadata(id, {
                    publicMetadata: {
                        userId: newUser.id, // Use the returned `id` from `createUser`
                    },
                });
            }

            return NextResponse.json({message: "OK", user: newUser});
        } catch (error: any) {
            return NextResponse.json(
                {message: "Error creating user", error: error.message},
                {status: 500}
            );
        }
    }

    if (evt.type === "user.deleted") {
        const {id} = evt.data;

        try {
            await deleteUserByClerkId(id!);
        } catch (error: any) {
            return NextResponse.json(
                {message: "Error deleting user", error: error.message},
                {status: 500}
            );
        }
    }

    return new Response("", {status: 200});
}
