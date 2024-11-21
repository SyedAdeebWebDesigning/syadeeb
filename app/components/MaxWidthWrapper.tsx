import React, {FC, PropsWithChildren} from "react";

const MaxWidthWrapper: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="max-w-screen-lg mx-auto px-4">
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
