export const CustomTheme = {
  fontSize: {
    base: "var(--font-size-base)",
    "3xl": "var(--font-size-3xl)",
  },
  fontWeight: {
    light: "var(--font-weight-light)",
    normal: "var(--font-weight-regular)",
    medium: "var(--font-weight-medium)",
    bold: "var(--font-weight-semibold)",
  },
  fontFamily: {
    zh: "var(--font-family-zh)",
    en: "var(--font-family-en)",
    number: "var(--font-family-number)",
    code: "var(--font-family-code)",
  },
  borderRadius: {
    none: "0",
    sm: "var(--border-radius-sm)",
    DEFAULT: "var(--border-radius-base)",
    lg: "var(--border-radius-lg)",
    xl: "var(--border-radius-xl)",
    "2xl": "var(--border-radius-2xl)",
    "3xl": "calc(var(--border-radius-2xl) + 12px)",
    full: "9999px",
  },
  colors: {
    "primary-bg-lighter": "var(--primary-bg-lighter)",
    "primary-bg": "var(--primary-bg)",
    "primary-bg-hover": "var(--primary-bg-hover)",
    "primary-border": "var(--primary-border)",
    "primary-disable": "var(--primary-disable)",
    "primary-border-hover": "var(--primary-border-hover)",
    "primary-hover": "var(--primary-hover)",
    "primary-text-hover": "var(--primary-text-hover)",
    primary: "var(--primary)",
    "primary-text": "var(--primary-text)",
    "primary-active": "var(--primary-active)",
    "primary-text-active": "var(--primary-text-active)",
    "primary-text-dark": "var(--primary-text-dark)",
    "primary-text-dark-active": "var(--primary-text-dark-active)",
    "primary-bg-dark": "var(--primary-bg-dark)",
    gray: "var(--gray)",
    purple: "var(--purple)",
  },
  // breakpoints: {
  //   // TODO: 此处不支持使用 css 变量
  //   sm: "768px",
  //   // => @media (min-width: 768px) { ... }
  //   md: "1280px",
  //   // => @media (min-width: 1280px) { ... }
  //   lg: "1440px",
  //   // => @media (min-width: 1440px) { ... }
  //   xl: "1920px",
  //   // => @media (min-width: 1920px) { ... }
  // },
  //TODO: shadows 定义
}
