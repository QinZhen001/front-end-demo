import process from "process"
import { defineConfig } from "vite"
// https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react
import react from "@vitejs/plugin-react"
import commonjs from "vite-plugin-commonjs"

const { name = "" } = require("./package.json")

// just for debug vercel env
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
  base,
  plugins: [
    commonjs(),
    // in plugins
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:2]",
    },
  },
})
