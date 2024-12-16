"use client"

import React, {useRef, useState} from "react";
import {motion} from "framer-motion";
import {IconUpload} from "@tabler/icons-react";
import {useDropzone} from "react-dropzone";

export const FileUpload = ({
                               onChange,
                           }: {
    onChange?: (files: File[]) => void;
}) => {
    const [file, setFile] = useState<File | null>(null); // Single file state
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: File[]) => {
        const photoFile = newFiles.find((file) => file.type.startsWith("image/")); // Get the first image file

        if (photoFile) {
            setFile(photoFile); // Set the single photo
            onChange && onChange([photoFile]); // Pass as an array for compatibility
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click(); // Trigger file input
    };

    const {getRootProps, isDragActive} = useDropzone({
        multiple: false, // Prevent multiple file uploads
        accept: {
            "image/*": [], // Accept only images
        },
        onDrop: handleFileChange,
        onDropRejected: (errors) => {
            console.error("Invalid file: ", errors);
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="py-2 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    accept="image/*" // Restrict to photos
                    onChange={(e) =>
                        handleFileChange(Array.from(e.target.files || []))
                    }
                    className="hidden"
                />
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                        Click to Upload Photo
                    </p>

                    <div className="relative w-full mx-auto">
                        {file ? (
                            <motion.div
                                key={"file"}
                                className="relative overflow-hidden z-40 bg-neutral-200 dark:bg-neutral-800 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
                            >
                                <div className="flex justify-between w-full items-center gap-4">
                                    <motion.p
                                        className="text-base text-neutral-300 truncate max-w-xs">
                                        {file.name}
                                    </motion.p>
                                    <motion.p
                                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-white">
                                        {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                                        MB
                                    </motion.p>
                                </div>
                                <div
                                    className="flex text-sm items-center justify-between text-neutral-400">
                                    <motion.p className="px-1 py-0.5 rounded-md ">
                                        {file.type}
                                    </motion.p>
                                    <motion.p>
                                        modified{" "}
                                        {new Date(file.lastModified).toLocaleDateString()}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="relative group-hover/file:shadow-2xl z-40 bg-neutral-800 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                            >
                                {isDragActive ? (
                                    <motion.p className="flex flex-col items-center">
                                        Drop it
                                        <IconUpload className="h-4 w-4 text-neutral-400"/>
                                    </motion.p>
                                ) : (
                                    <IconUpload className="h-4 w-4 text-neutral-300"/>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
