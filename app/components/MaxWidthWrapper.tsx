import React from "react";

const MaxWidthWrapper = ({children, size}: { children: React.ReactNode, size?: string }) => {
    return (
        <div className={`max-w-screen-lg mx-auto px-4`}>
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
