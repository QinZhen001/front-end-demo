import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { name = "" } = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? `/${name}/` : "",
  plugins: [react()],
});
