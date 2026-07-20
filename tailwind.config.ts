import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        green: {
          50: "#EAF2EE",
          100: "#CFE3D8",
          200: "#A3C9B4",
          300: "#74AC90",
          400: "#4C8E72",
          500: "#2C6E52",
          600: "#1F4D3A",
          700: "#173B2C",
          800: "#10291F",
          900: "#0A1B14",
        },
        orange: {
          50: "#FDF3E7",
          100: "#FAE3C4",
          200: "#F4CB93",
          300: "#EDB868",
          400: "#E6AD56",
          500: "#E0A24B",
          600: "#C4842F",
          700: "#9C6825",
        },
        cream: {
          50: "#FDFBF7",
          100: "#F5EEE0",
          200: "#EDE2CC",
          300: "#E2D3B3",
        },
        slate: {
          50: "#F8FAFA",
          100: "#EEF1F0",
          300: "#C4CCC9",
          500: "#6B7876",
          700: "#3A4442",
          900: "#1A211F",
        },
        status: {
          profit: "#1F4D3A",
          loss: "#B3432E",
          pending: "#E0A24B",
          neutral: "#6B7876",
        },
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Lora", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "600ms",
        hero: "900ms",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
