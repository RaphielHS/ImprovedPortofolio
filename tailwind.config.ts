import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/*.{js,ts,tsx,mdx,jsx}",
    "./pages/*.{js,ts,tsx,mdx,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
