import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/index.ts",
  ],
  theme: {
    extend: {
      colors: {
        merah: {
          DEFAULT: "#CC0000",
          gelap:   "#990000",
          muda:    "#FFF0F0",
          border:  "#F5CCCC",
        },
        hijau: {
          DEFAULT: "#1A7F3C",
          muda:    "#E6F9ED",
        },
        abu: {
          teks:    "#666666",
          border:  "#E5E5E5",
          bg:      "#F8F8F8",
        },
        biru: {
          DEFAULT: "#2563EB",
          muda:    "#EDF2FF",
        },
      },
      fontFamily: {
        sans:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono:    ["var(--font-dm-mono)", "monospace"],
      },
      borderRadius: {
        card: "14px",
        btn:  "10px",
      },
      minHeight: {
        touch: "52px", // min tap target usia 30+
      },
    },
  },
  plugins: [],
};

export default config;
