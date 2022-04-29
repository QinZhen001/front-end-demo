import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

const { name = "" } = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? `/${name}/` : "",
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
  ],
});
