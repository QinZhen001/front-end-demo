import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

const { name = "" } = require("./package.json");

console.log("process.env.VERCEL_ENV", process.env.VERCEL_ENV)
console.log("process.env.VITE_VERCEL_ENV", process.env.VITE_VERCEL_ENV)

let base = ""
if (process.env.CI && process.env.VERCEL_ENV == "production") {
  base = ""
} else if (process.env.NODE_ENV == "production") {
  base = `/${name}/`
}

// https://vitejs.dev/config/
export default defineConfig({
  base: base,
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
