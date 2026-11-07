/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Figma color styles
        brand: {
          blue: "#4284f4", // Blue/500
          "blue-dark": "#1967d2",
          red: "#ea4335", // Red/500
          yellow: "#f9ab00", // Yellow/500
          green: "#34a853", // Green/500
        },
        ink: "#242424",
        muted: "#5f6368",
        line: "#dadce0",
        surface: "#f1f3f4", // Neutrals/300
        tint: {
          blue: "#eaf2ff",
          yellow: "#fff7df",
          green: "#eaf5ed",
          red: "#fdedea",
        },
      },
      fontFamily: {
        sans: ['"Google Sans"', '"Product Sans"', "Inter", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      // Display sizes equal the Figma values at 1440px and scale down below.
      fontSize: {
        t80: ["clamp(44px, 5.6vw, 80px)", { lineHeight: "1.05" }],
        t72: ["clamp(40px, 5vw, 72px)", { lineHeight: "1.08" }],
        t48: ["clamp(32px, 3.4vw, 48px)", { lineHeight: "1.12" }],
        t44: ["clamp(30px, 3.1vw, 44px)", { lineHeight: "1.12" }],
        t40: ["clamp(28px, 2.8vw, 40px)", { lineHeight: "1.12" }],
        t32: ["clamp(24px, 2.3vw, 32px)", { lineHeight: "1.12" }],
      },
      screens: {
        desk: "1440px",
      },
    },
  },
  plugins: [],
};
