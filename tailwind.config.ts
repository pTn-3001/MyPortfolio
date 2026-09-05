import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyan: {
          neon: "#00f2fe",
          glow: "#4facfe",
        },
        space: {
          dark: "#050b14",
          card: "rgba(10, 20, 38, 0.85)",
          border: "rgba(0, 242, 254, 0.35)",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        tech: ["var(--font-tech)", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-3px) rotate(0.8deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        satelliteSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        "satellite-spin": "satelliteSpin 40s linear infinite",
        scanline: "scanline 8s linear infinite",
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 242, 254, 0.5)",
        "cyan-lg": "0 0 35px rgba(0, 242, 254, 0.7)",
      },
    },
  },
  plugins: [],
} satisfies Config;
