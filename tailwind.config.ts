import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16202A",
        ink2: "#1D2C38",
        emerald2: "#2EC98E",
        deep: "#0B5C44",
        mint: "#D9F5EA",
        paper: "#F7FAF8",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Instrument Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
