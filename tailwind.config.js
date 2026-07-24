/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontSize: {
          h2: ["40px", { lineHeight: "46px", fontWeight: "600" }],
          h3: ["26px", { lineHeight: "32px", fontWeight: "600" }],
          "h2-mobile": "60px",
          "h2-desktop": "80px",
          "h3-mobile": "32px",
          "h3-desktop": "38px",
          "card-caption-mobile": "16px",
          "card-caption-desktop": "18px",
        },
        lineHeight: {
          "h2-mobile": "64px",
          "h2-desktop": "88px",
          "h3-mobile": "40px",
          "h3-desktop": "48px",
        },
        colors: {
          "heading-sub": "#747474",
          "vow-muted": "#747474",
        },
      },
    },
    plugins: [],
  };