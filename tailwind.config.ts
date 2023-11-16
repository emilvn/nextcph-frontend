import {type Config} from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                "next-orange": "#FA7D4F",
                "next-dark-orange": "#F96B4C",
                "next-blue": "#010E2B",
                "next-darker-orange": "#FF7151"
            },
            fontFamily: {},
        },
    },
    plugins: [],
} satisfies Config;
