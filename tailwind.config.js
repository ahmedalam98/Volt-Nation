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
  },
  plugins: [],
};

export default config;
