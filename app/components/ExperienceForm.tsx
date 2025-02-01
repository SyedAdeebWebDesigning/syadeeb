"use client";

import {Input, Textarea} from "@nextui-org/input";
import React, {useMemo, useState} from "react";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import {Button} from "@nextui-org/button";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {createExperience} from "@/lib/actions/experience.action";

interface Link {
    title: string;
    url: string;
}

interface ExperienceFormData {
    date: string;
    title: string;
    shortDesc: string;
    links: Link[];
    images: string[]; // Store Base64 image strings here
}

const ExperienceForm = ({type}: { type: "create" | "update" }) => {
    const [formData, setFormData] = useState<ExperienceFormData>({
        date: "",
        title: "",
        shortDesc: "",
        links: [{title: "", url: ""}],
        images: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleFileUpload = (files: File[]) => {
        // Ensure no more than 4 images can be uploaded
        if (files.length + formData.images.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        // Convert files to Base64 and store in state
        const fileReaders: Promise<string>[] = files.map((file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("Error reading file"));
                reader.readAsDataURL(file);
            })
        );

        Promise.all(fileReaders)
            .then((base64Images) => {
                setFormData((prevData) => ({
                    ...prevData,
                    images: [...prevData.images, ...base64Images],
                }));
            })
            .catch((error) => console.error("Error uploading files:", error));
    };

    const isFormValid = useMemo(() => {
        return (
            formData.date.trim() !== "" &&
            formData.title.trim() !== "" &&
            formData.shortDesc.trim().length > 0 &&
            formData.images.length >= 1 &&
            formData.images.length <= 4 // Ensure the form is valid if there are between 1 and 4 images
        );
    }, [formData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: string,
        index?: number
    ) => {
        if (field === "links") {
            const updatedLinks = [...formData.links];
            if (index !== undefined) {
                // @ts-ignore
                updatedLinks[index][e.target.name] = e.target.value;
            }
            setFormData({...formData, links: updatedLinks});
        } else {
            setFormData({...formData, [field]: e.target.value});
        }
    };

    const addLinkField = () =>
        setFormData((prevData) => ({
            ...prevData,
            links: [...prevData.links, {title: "", url: ""}], // Add a new empty link
        }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        try {
            setIsLoading(true);
            // Call API to create experience
            await createExperience(formData);
            toast.success("Experience created successfully!", {
                onClose: () => router.push("/experience"),
            });
        } catch (error) {
            toast.error("Failed to create experience. Please try again.", {
                onClose: () => setIsLoading(false),
            });
            console.log(error);
        }
    };

    return (
        <MaxWidthWrapper>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center min-h-screen space-y-4"
            >
                {/* Date and Title Fields */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                        label="Date"
                        type="text"
                        value={formData.date}
                        onChange={(e) => handleInputChange(e, "date")}
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        color={'default'}
                        variant="bordered"
                    />
                    <Input
                        label="Title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange(e, "title")}
                        className="contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        color={'default'}
                        variant="bordered"
                    />
                </div>

                {/* Short Description Field */}
                <Textarea
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0 mt-4 contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                    label="Short Description"
                    labelPlacement="inside"
                    color={'default'}
                    minRows={2}
                    value={formData.shortDesc}
                    onChange={(e) => handleInputChange(e, "shortDesc")}
                    variant="bordered"
                />

                {/* Links Fields */}
                <div className="w-full space-y-2">
                    <label className="block font-semibold text-neutral-800 dark:text-neutral-200">Links
                        (Optional)</label>
                    {formData.links.map((link, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                label="Link Title"
                                name="title"
                                type="text"
                                value={link.title}
                                color={'default'}
                                onChange={(e) => handleInputChange(e, "links", index)}
                                className="w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded-xl contact-input"
                                variant="bordered"
                            />
                            <Input
                                label="Link URL"
                                name="url"
                                type="text"
                                color={'default'}
                                value={link.url}
                                onChange={(e) => handleInputChange(e, "links", index)}
                                className="w-1/2 bg-neutral-100 dark:bg-neutral-800 rounded-xl contact-input"
                                variant="bordered"
                            />
                        </div>
                    ))}
                    <Button type="button" variant="ghost" onClick={addLinkField}>
                        Add Link
                    </Button>
                </div>

                {/* Images Fields */}
                <div className="w-full space-y-2">
                    <label className="block font-semibold text-neutral-800 dark:text-neutral-200">Images (1-4
                        Required)</label>
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        size={'lg'}
                        color={'default'}
                        className={'contact-input bg-neutral-100 dark:bg-neutral-800 rounded-xl'}
                        variant={'bordered'}
                        onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
                        disabled={formData.images.length >= 4}
                    />
                    {/* Display uploaded images */}
                    <div className="flex gap-2">
                        {formData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Uploaded Image ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-xl"
                            />
                        ))}
                    </div>
                    <Button
                        type="button"
                        variant="solid"
                        color={'default'}
                        className={'hidden'}
                        disabled={formData.images.length >= 4}
                    >
                        Add Image
                    </Button>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full disabled:opacity-30 disabled:hover:opacity-30 disabled:cursor-not-allowed"
                    color={"primary"}
                    size={"lg"}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit Experience"}
                </Button>
            </form>
        </MaxWidthWrapper>
    );
};

export default ExperienceForm;
