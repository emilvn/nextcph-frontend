import {type Config} from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                "next-orange": "#FA7D4F",
                "next-darker-orange": "#F96B4C",
                "next-blue": "#010E2B"
            },
            fontFamily: {},
        },
    },
    plugins: [],
} satisfies Config;
