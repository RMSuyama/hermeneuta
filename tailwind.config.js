/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                foreground: "#FDFCF8",
                primary: {
                    DEFAULT: "#C5A022",
                    foreground: "#0A0A0A",
                },
                secondary: {
                    DEFAULT: "#1A1A1A",
                    foreground: "#C5A022",
                },
                accent: {
                    DEFAULT: "#4A0E0E",
                    foreground: "#FDFCF8",
                },
                gold: {
                    light: "#E5C158",
                    DEFAULT: "#C5A022",
                    dark: "#967A1A",
                }
            },
            fontFamily: {
                serif: ["var(--font-serif)", "serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
