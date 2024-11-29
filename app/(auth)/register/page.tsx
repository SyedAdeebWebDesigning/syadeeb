"use client"

import {useState} from "react";
import {registerUser} from "@/lib/actions/user.action";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {FileUpload} from "@/app/components/ui/file-upload";
import {Card, CardBody} from "@nextui-org/card";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function Page() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        isAdmin: false,
        imgUrl: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (files: File[]) => {
        if (files.length > 0) {
            setFile(files[0]); // Store the uploaded file
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        setError(null);
        try {
            if (!file) {
                toast.error("Please upload an image.");
                return;
            }

            // Convert the image file to a data URL (base64 string)
            const reader = new FileReader();
            reader.onload = async () => {
                const imgData = reader.result as string; // Base64 data URL
                setForm((prev) => ({...prev, imgUrl: imgData}));

                await registerUser(
                    form.fullName,
                    form.email,
                    form.password,
                    form.isAdmin,
                    imgData
                );
                setSuccess(true);
                toast.success('Registration successful! You can now log in.', {
                    onClose: () => router.push('/auth/sign-in')
                });
            };
            reader.onerror = () => {
                throw new Error("Failed to read image file.");
            };
            reader.readAsDataURL(file); // Read the file
        } catch (err: any) {
            setError(err.message || "Registration failed.");

        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-light">
            <Card className="w-full max-w-md bg-background border-2 border-neutral-800/30">
                <CardBody>
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        Register
                    </h1>

                    <form className="flex flex-col gap-4 py-6">
                        <FileUpload onChange={handleFileUpload}/>

                        <Input
                            type="text"
                            label="Full Name"
                            isRequired
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            variant="flat"
                            color="secondary"
                            className="border-2 border-neutral-500 rounded-xl text-gray-300"
                        />
                        <Input
                            type="email"
                            label="Email"
                            isRequired
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            variant="flat"
                            color="secondary"
                            className="border-2 border-neutral-500 rounded-xl text-gray-300"
                        />
                        <Input
                            type="password"
                            label="Password"
                            isRequired
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            variant="flat"
                            color="secondary"
                            className="border-2 border-neutral-500 rounded-xl text-gray-300"
                        />
                        <Button color="primary"
                                className={'disabled:opacity-35 disabled:hover:opacity-30 disabled:cursor-not-allowed'}
                                size={'lg'} radius={'lg'}
                                disabled={
                                    !form.fullName || !form.email || !form.password || !file
                                } onPress={handleSubmit}>
                            Register
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>

                </CardBody>
            </Card>
        </div>
    );
}
