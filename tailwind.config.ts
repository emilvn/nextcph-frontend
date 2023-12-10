import { type Config } from "tailwindcss"

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                "next-orange": "#FA7D4F",
                "next-darker-orange": "#F96B4C",
                "next-blue": "#010E2B",
                "next-white": "#F3F1EF",
                "next-grey": "#B2A498"
            },

            fontFamily: {}
        }
    },
    plugins: []
} satisfies Config
