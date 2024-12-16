import {HoverEffect} from "./ui/card-hover-effect";

export default function Skills() {
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={skills}/>
        </div>
    );
}
export const skills = [
    {
        title: "Next.js",
        description:
            "React framework.",
        image: "/logos/nextjs.svg",
        backgroundColor: "#ffffff"

    },
    {
        title: "TypeScript",
        description:
            "JavaScript that scales.",
        image: "/logos/typescript.svg",
        backgroundColor: "#3078c650"

    },

    {
        title: "Tailwind CSS",
        description:
            "CSS Framework.",
        image: "/logos/tailwind.svg",
        backgroundColor: "#0ca5e950"

    },

    {
        title: "MongoDB",
        description:
            "A no-sql database.",
        image: "/logos/mongodb.svg",
        backgroundColor: "#6dac4850"

    },
    {
        title: "Figma",
        description:
            "Design tool.",
        image: "/logos/figma.svg",
        backgroundColor: "#0ecf8250"

    },
    {
        title: "Clerk",
        description:
            "Auth/User management.",
        image: "/logos/clerk.svg",
        backgroundColor: "#ffffff"

    }, {
        title: "Supabase",
        description:
            "Backend tool.",
        image: "/logos/supabase.svg",
        backgroundColor: "#3ecf8e50"

    }, {
        title: "Git",
        description:
            "Version Control.",
        image: "/logos/git.svg",
        backgroundColor: "#f1502f50"

    }, {
        title: "Prisma",
        description:
            "ORM.",
        image: "/logos/prisma.svg",
        backgroundColor: "#14B8A650"

    },
];
