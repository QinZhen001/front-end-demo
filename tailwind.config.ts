import type { Config } from "tailwindcss"
import { CustomTheme } from "./src/theme/tw"
import { mauve, violet } from "@radix-ui/colors"

const { colors, ...rest } = CustomTheme

export const combinedCfgExt: Config["theme"] = {
  ...rest,
  colors: {
    ...colors,
    ...mauve,
    ...violet,
  },
}

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  keyframes: {
    slideDown: {
      from: { height: "0px" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    slideUp: {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0px" },
    },
  },
  animation: {
    slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
    slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  },
  theme: {
    extend: {
      ...combinedCfgExt,
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
