/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accentPrimary: "#004733",
        accentBorderSecondary: "#017848",
        accentBorderInverseSecondary: "#e1fdfa00",
        successBackground: "#F0F7F1",
        backgroundInversePrimary: "#073126",
        backgroundInverseSecondary: "#017848",
        graphTertiary: "#1EE07F",
        textInverseHighlight: "#1EE07F",
        backgroundSecondary: "#A4A8A4",
        interactivePrimary: "#017848",
        accentBorderSecondary: "#017848",
        textPrimary: "#292B29",
        textSecondary: "#565D5A",
        strokeDivider: "#C7C9C5",
        disabled: "#A3B4C2",
        link: "#222222",
        backgroundTertiary: "#FFFFFF",
        strokeBorder: "#A4A8A4",
        accentBackground: "#E8EAE6",
        accentSecondary: "#DFE0DC",

        interactiveForegroundInversePrimary: "#292B29",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      lineHeight: {
        "4xl": "normal", // Override default 2.5rem
      },
    },
  },
  plugins: [],
};
