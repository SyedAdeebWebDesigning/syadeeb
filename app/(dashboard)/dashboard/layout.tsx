import Sidebar from "@/app/components/Sidebar";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";


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
            <div className={' top-2 right-2 z-[999] fixed'}><ThemeSwitcher/></div>

            {/* Sidebar */}
            <aside className="w-[20%] dark:bg-neutral-900 bg-neutral-100 text-white p-4">
                {/* Add sidebar content here */}
                <div className={''}>
                    <Sidebar userFullname={`${user.firstName} ${user.lastName}`}
                             userEmail={user.emailAddresses[0].emailAddress}
                             userImg={user.imageUrl}

                    />
                </div>


            </aside>

            {/* Main Content */}
            <section className="flex-1 p-6 dark:bg-background  relative">
                {children}
            </section>
        </main>
    );
};

export default Layout;
