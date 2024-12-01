import Sidebar from "@/app/components/Sidebar";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";


type Props = {
    children: React.ReactNode;
};

const Layout = async ({children}: Props) => {
    const user = await currentUser()
    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <main className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-[20%] bg-neutral-900 text-white p-4">
                {/* Add sidebar content here */}
                <div className={''}>
                    <Sidebar userFullname={`${user.firstName} ${user.lastName}`}
                             userEmail={user.emailAddresses[0].emailAddress}
                             userImg={user.imageUrl}

                    />
                </div>


            </aside>

            {/* Main Content */}
            <section className="flex-1 p-6 bg-background relative">
                {children}
            </section>
        </main>
    );
};

export default Layout;
