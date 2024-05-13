const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono,monospace",
    },
    extend: {
      colors: {
        voltNeon: "#08cff6",
        voltLight: "#144a73",
        voltMedium: "#122e42",
        voltDark: "#05131e",
      },
    },
    screens: {
      xs: "100px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};

export default config;
