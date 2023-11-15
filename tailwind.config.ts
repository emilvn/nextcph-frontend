import {type Config} from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                "next-orange": "#FA7D4F",
                "next-darker-orange": "#F96B4C",
                "next-blue": "#010E2B",
                "background": "linear-gradient(to bottom, #f96b4c, #010e2b)"
            },
            fontFamily: {},
        },
    },
    plugins: [],
} satisfies Config;
