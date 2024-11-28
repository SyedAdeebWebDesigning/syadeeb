"use client";

import {useState} from "react";
import {registerUser} from "@/lib/actions/user.action";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Card, CardBody} from "@nextui-org/card";

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
            console.log(
                form.fullName,
                form.email,
                form.password,
                form.isAdmin,
                form.imgUrl
            )

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log(emailRegex.test(form.email))
            await registerUser(
                form.email,
                form.fullName,
                form.password,
                form.isAdmin,
                form.imgUrl
            );
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Registration failed.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-dark text-light">
            <Card className="w-full max-w-md bg-card">
                <CardBody>
                    <h1 className="text-2xl font-bold mb-4 text-center text-primary">
                        Register
                    </h1>
                    {success ? (
                        <p className="text-green-600 font-medium text-center">
                            Registration successful! You can now log in.
                        </p>
                    ) : (
                        <form className="flex flex-col gap-4">
                            <Input
                                type="text"
                                label="Full Name"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                variant={'underlined'}
                                color={'secondary'}
                                className="bg-transparent text-whtie"
                            />
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant={'underlined'}
                                color={'secondary'}
                                className="bg-transparent text-whtie"
                            />
                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                variant={'underlined'}
                                color={'secondary'}
                                className="bg-transparent text-whtie"
                            />
                            <Input
                                type="text"
                                label="Image URL"
                                name="imgUrl"
                                value={form.imgUrl}
                                onChange={handleChange}
                                variant={'underlined'}
                                color={'secondary'}
                                className="bg-transparent text-whtie"
                            />

                            <Button color="primary" onPress={handleSubmit}>
                                Register
                            </Button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </form>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
