/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Only apply hover styles on devices that actually hover — stops "sticky hover"
  // (a card staying lifted after a tap) on touchscreens.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        // Brand palette sampled from the official SUSC logo:
        //   Sunway blue #115C80, charcoal #323131.
        // `navy` is the ink token (borders/text/shadows) — now the logo's charcoal.
        navy: {
          DEFAULT: "#323131",
          light: "#4a4848",
          dark: "#1f1e1e",
        },
        blue: {
          DEFAULT: "#115C80", // Sunway blue (primary fill / accent)
          dark: "#0E4A68",
          bright: "#1A6E96",
        },
        powder: "#BFD5E1",
        sky: "#E3EEF4",
        cloud: "#EFF4F7", // very light blue-tinted background
      },
      fontFamily: {
        display: ['"Fredoka"', "system-ui", "sans-serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        // Hard offset "sticker" shadows (charcoal ink) — the core of the playful look.
        hard: "4px 4px 0 0 #323131",
        "hard-sm": "2px 2px 0 0 #323131",
        "hard-lg": "7px 7px 0 0 #323131",
        "hard-blue": "5px 5px 0 0 #115C80",
      },
      borderRadius: {
        chunk: "1.25rem",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.96)" },
          "60%": { transform: "translateY(-3px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "70%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "page-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-14px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        wiggle: "wiggle 0.5s ease-in-out",
        float: "float 4s ease-in-out infinite",
        "bounce-in": "bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "page-in": "page-in 0.4s ease-out both",
        "slide-in": "slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
