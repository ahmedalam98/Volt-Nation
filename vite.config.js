import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: [react(), eslint()],
  rules: {
    "react/prop-types": "off",
  },
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
