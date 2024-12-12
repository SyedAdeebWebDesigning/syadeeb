import Link from "next/link";
import {LayoutDashboardIcon} from "lucide-react";
import {currentUser} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/user.action";

const RedirectToDashboard = async () => {
    const user = await currentUser()
    if (!user) {
        return null
    }

    const dbUser = await getUserByClerkId(user.id);

    if (!dbUser) {
        return null
    }

    if (!dbUser.isAdmin) {
        return null
    }
    
    return (
        <div
            className={'cursor-pointer w-fit bg-neutral-300/50 text-black dark:text-white dark:bg-neutral-700/50 size-12 flex items-center justify-center rounded-xl'}>
            <Link href={'/dashboard'} className={'flex items-center px-4 py-4'}>
                <LayoutDashboardIcon className={'mr-1'}/>
                Dashboard
            </Link>
        </div>
    );
};
export default RedirectToDashboard;
