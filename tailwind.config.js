/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue:  "#00A4E1",
        brandRed:    "#F04444",
        brandYellow:  "#FFC52C",
        brandGreen:   "#38C36E",
        dark:    "#1C1C1C",
        light:  "#FAFAFA",
        // New palette
        primary:      "#00AEEF",      // Light Sky Blue
        secondary:    "#FF6A13",      // Vivid Orange
        yellowish:    "#FFD200",      // Golden Yellow
        background:   "#FAFAFA",      // Very Light Gray
        surface:      "#FFFFFF",      // White (cards, containers)
        textPrimary:  "#1E1E1E",      // Almost Black
        textSecondary:"#4F4F4F",      // Medium Gray
        navbar:       "#FFFFFF",      // Navbar background
        footer:       "#F2F2F2",      // Footer background
        border:       "#E0E0E0",      // Border color
        success:      "#27AE60",      // Soft Green
        error:        "#E74C3C",      // Light Red
      },
      fontFamily: {
        sans:   ["Inter", "ui-sans-serif", "system-ui"],
        arabic: ["Tajawal", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { xl: "1280px" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

