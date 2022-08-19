// https://cn.windicss.org
import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";

export default defineConfig({
  darkMode: "class",
  attributify: true,
  extract: {
    include: [
      "./components/**/*.{vue,js}",
      "./composables/**/*.{js,ts}",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
    ],
  },
  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      screens: {
        sm: '480px',
        // => @media (min-width: 480px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '976px',
        // => @media (min-width: 976px) { ... }
        xl: '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
