import Sidebar from "@/app/components/Sidebar";
import React from "react";


type Props = {
    children: React.ReactNode;
};

const Layout = async ({children}: Props) => {

    return (
        <main className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-[20%] bg-neutral-900 text-white p-4">
                {/* Add sidebar content here */}
                <div className={''}>
                    <Sidebar userFullname={"Syed Adeeb"}
                             userEmail={"abidi9897401278@gmail.com"}
                             userImg={"/owner.png"}

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
