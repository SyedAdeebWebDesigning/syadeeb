import type {Config} from "tailwindcss";

const {nextui} = require("@nextui-org/react");

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Ensure Next UI styles are included
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)", // For custom background handling
                foreground: "var(--foreground)", // For custom foreground handling
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        primary: "#00a360", // Custom primary green
                        foreground: "#181818", // Dark background for dark theme
                        focus: "#006a3f", // Dark green for focus
                        required: "#e53e3e", // Red color for required fields
                        secondary: "#b0b0b0", // Medium gray for subheading text
                        secondaryLight: "#d1d1d1", // Light gray for less important text
                        secondaryDark: "#8c8c8c", // Darker gray for stronger emphasis (secondary heading)
                    },
                },
                light: {
                    colors: {
                        primary: "#00a360", // Custom primary green
                        foreground: "#181818", // Dark text for light theme
                        focus: "#006a3f", // Dark green for focus
                        required: "#e53e3e", // Red color for required fields
                        secondary: "#b0b0b0", // Medium gray for subheading text
                        secondaryLight: "#d1d1d1", // Light gray for less important text
                        secondaryDark: "#8c8c8c", // Darker gray for stronger emphasis (secondary heading)
                    },
                },
            },
        }),
    ],
};

export default config;
