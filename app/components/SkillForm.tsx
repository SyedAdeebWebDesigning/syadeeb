"use client"

import React, {useState} from "react";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {Input} from "@nextui-org/input";
import Image from "next/image";
import {Button} from "@nextui-org/button";
import {addSkill} from "@/lib/actions/skills.action";

interface SkillProps {
    type: "create" | "update";
}

const SkillForm = (props: SkillProps) => {
    const [name, setName] = useState("");
    const [shortDesc, setShortDesc] = useState("");
    const [bgColor, setBgColor] = useState("#");
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Convert image file to Base64 string
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string); // Base64 data URL
            };
            reader.readAsDataURL(file);
        }
    };

    // Ensure only valid hex colors and auto-add #
    const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim().replace(/\s/g, ""); // Remove spaces

        if (!value.startsWith("#")) {
            value = `#${value}`; // Ensure it starts with #
        }

        // Validate hex code (allow empty for clearing)
        const hexRegex = /^#([0-9A-Fa-f]{0,8})$/; // Accept empty or up to 6 hex chars
        if (hexRegex.test(value)) {
            setBgColor(value);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate required fields
            if (!name.trim() || !shortDesc.trim() || !bgColor.trim() || !image) {
                toast.error("All fields are required.");
                setIsLoading(false);
                return;
            }

            // Prepare the form data
            const formData = {
                name,
                shortDescription: shortDesc,
                backgroundColor: bgColor,
                img: image, // Store Base64 image
            };

            console.log("Form Data:", formData);

            if (props.type === "create") {
                await addSkill(name, shortDesc, bgColor, image as string);
            }

            toast.success("Skill submitted successfully!");
            router.push("/skills");
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Ensure loading state is stopped in both success & error cases
        }
    };


    return (
        <MaxWidthWrapper>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        color="default"
                        variant="bordered"
                    />
                    <Input
                        label="Short Desc"
                        type="text"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        color="default"
                        variant="bordered"
                    />
                </div>
                <div className="flex w-full relative flex-wrap md:flex-nowrap gap-4">

                    <Input
                        label="Background Color (Hex Code)"
                        type="text"
                        value={bgColor}
                        onChange={handleBgColorChange}
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl w-full"
                        color="default"
                        variant="bordered"
                    />

                    {/* Preview selected color */}
                    <div
                        className="size-10 rounded-full border absolute right-2 top-2"
                        style={{backgroundColor: bgColor}}
                    />
                </div>
                <div className="w-full space-y-2">
                    <Input
                        type="file"
                        accept="image/*"
                        size="lg"
                        label="Image"
                        color="default"
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        variant="bordered"
                        onChange={handleImageChange}
                    />
                    {/* Display uploaded image preview */}
                    {image && (
                        <div className="mt-3 flex justify-center">
                            <Image
                                src={image}
                                alt="Uploaded Preview"
                                width={150}
                                height={150}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full disabled:opacity-30 disabled:hover:opacity-30 disabled:cursor-not-allowed"
                    color={"primary"}
                    size={"lg"}
                >
                    {isLoading ? "Submitting..." : "Submit Skill"}
                </Button>
            </form>
        </MaxWidthWrapper>
    );
};

export default SkillForm;
