/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    10: "#69A6F3",
                    20: "#5093E9",
                    30: "#3681DF",
                    40: "#1D6ED5",
                    50: "#035BCB",
                    60: "#024BA8",
                    70: "#023B85",
                    80: "#012C61",
                    90: "#011C3E",
                },
                gray: {
                    10: "#F4F4F5",
                    20: "#E4E4E7",
                    30: "#D4D4D8",
                    40: "#A1A1AA",
                    50: "#71717A",
                    60: "#52525B",
                    70: "#3F3F46",
                    80: "#212325",
                    90: "#1A1C1E",
                },
            },
            transitionDuration: {
                DEFAULT: "300ms",
            },
        },
    },
    plugins: [],
};
