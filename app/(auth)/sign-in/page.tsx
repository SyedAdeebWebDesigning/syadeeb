"use client";

import {useState} from "react";
import {loginUser as signInUser} from "@/lib/actions/user.action";
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Card, CardBody} from "@nextui-org/card";
import {toast} from "react-toastify";

export default function SignInPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError(null); // Reset error on input change
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setError(null);
        setLoading(true);

        try {
            await signInUser(form.email, form.password);
            toast.success("Sign-in successful!");
        } catch (err: any) {
            const message =
                err?.response?.data?.message || err.message || "Sign-in failed.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background text-white">
            <Card className="w-full max-w-md bg-neutral-800 border border-neutral-700 shadow-lg">
                <CardBody>
                    <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
                    <form className="flex flex-col gap-6 py-4">
                        <Input
                            type="email"
                            label="Email"
                            isRequired
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            variant="underlined"
                            color="primary"
                            className="bg-neutral-700 text-neutral-200 rounded-lg focus:ring focus:ring-indigo-500"
                        />
                        <Input
                            type="password"
                            label="Password"
                            isRequired
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            variant="underlined"
                            color="primary"
                            className="bg-neutral-700 text-neutral-200 rounded-lg focus:ring focus:ring-indigo-500"
                        />
                        <Button
                            color="primary"
                            size="lg"
                            radius="lg"
                            className="w-full disabled:opacity-50"
                            disabled={loading || !form.email || !form.password}
                            onPress={handleSubmit}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
