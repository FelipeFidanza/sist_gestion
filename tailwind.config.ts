import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta extraida del logo de la Residencia La Fabiana
        verde: {
          50: "#eefaf6",
          100: "#d5f2e8",
          200: "#abe4d2",
          300: "#76cfb5",
          400: "#43b294",
          500: "#249679",
          600: "#188066",
          700: "#166553",
          800: "#155144",
          900: "#13433a",
        },
        lima: {
          50: "#f6faec",
          100: "#e9f3d2",
          200: "#d4e8a9",
          300: "#b9d875",
          400: "#9fc44b",
          500: "#8cc63f",
          600: "#658f2b",
          700: "#4e6e26",
          800: "#405724",
          900: "#374a22",
        },
        magenta: {
          50: "#fdf2f7",
          100: "#fce7f0",
          200: "#fbcfe1",
          300: "#f9a8c8",
          400: "#f372a3",
          500: "#e84a82",
          600: "#c0286a",
          700: "#a31d57",
          800: "#871b49",
          900: "#721b40",
        },
        carbon: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d6dadf",
          300: "#b2bac3",
          400: "#8794a0",
          500: "#697785",
          600: "#535f6c",
          700: "#444d58",
          800: "#3a414a",
          900: "#2b2d33",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(43, 45, 51, 0.04), 0 8px 24px -12px rgba(43, 45, 51, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
