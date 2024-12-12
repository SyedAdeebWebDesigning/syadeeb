import React from 'react'
import {LogOutIcon} from "lucide-react";
import {SignOutButton as SignOut} from "@clerk/nextjs";

const SignOutButton = () => {
    return (
        <button className={'text-red-700 dark:text-red-300 text-sm cursor-pointer underline flex items-center'}>
            <LogOutIcon className={'size-4 mr-1'}/>
            <SignOut/>
        </button>
    )
}
export default SignOutButton
