import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        calculator: {
          primary: "#1a237e",
          accent: "#00bcd4",
          gray: "#f5f5f5",
          text: "#2d3748",
        },
      },
      animation: {
        "number-change": "numberChange 0.5s ease-out",
      },
      keyframes: {
        numberChange: {
          "0%": { opacity: "0.3", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
