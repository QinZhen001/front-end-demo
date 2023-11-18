import process from "process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import typescript from "@rollup/plugin-typescript";
import swc from "rollup-plugin-swc";


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
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true, // If you use react
          dynamicImport: true,
          decorators: true,
        },
        target: "es2021",
        transform: {
          react: {
            runtime: "automatic"
          },
          decoratorMetadata: true,
        },
      },
    }),
  ],
  esbuild: false,
  // in plugins
  // legacy({
  //   targets: ["defaults", "not IE 11"],
  // }),
  // react({
  //   babel: {
  //     parserOpts: {
  //       // https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#proposed-syntax
  //       plugins: ['decorators-legacy']
  //     },
  //   },
  // }),
});
