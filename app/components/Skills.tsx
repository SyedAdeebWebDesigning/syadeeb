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
        title: "Figma",
        description:
            "Design tool.",
        image: "/logos/figma.svg",

    }, {
        title: "TypeScript",
        description:
            "JavaScript that scales.",
        image: "/logos/typescript.svg",
    },

    {
        title: "Tailwind CSS",
        description:
            "CSS Framework.",
        image: "/logos/tailwind.svg",

    },
    {
        title: "Next.js",
        description:
            "React framework",
        image: "/logos/nextjs.svg",

    },
    {
        title: "MongoDB",
        description:
            "A no-sql database.",
        image: "/logos/mongodb.svg",

    },
    {
        title: "Clerk",
        description:
            "Auth/User management.",
        image: "/logos/clerk.svg",

    }, {
        title: "Supabase",
        description:
            "Backend tool.",
        image: "/logos/supabase.svg",

    }, {
        title: "Git",
        description:
            "Version Control.",
        image: "/logos/git.svg",

    },
];
