import React from "react";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";

type Props = {
    children: React.ReactNode
};
const Layout = ({children}: Props) => {
    return (
        <div className={'min-h-screen flex items-center justify-center'}>
            <div className={' top-2 right-2 z-[999] fixed'}><ThemeSwitcher/></div>
            {children}
        </div>
    );
};
export default Layout;
