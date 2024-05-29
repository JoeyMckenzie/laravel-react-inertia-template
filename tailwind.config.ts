import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Geist", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [forms],
} satisfies Config;
