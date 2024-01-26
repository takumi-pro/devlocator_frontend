import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      tablet: "900px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        sidebar: "424px",
        "md-sidebar": "350px",
        "lg-dialog": "560px",
      },
      height: {
        sidebar: "calc(100vh - 56px)",
        "sidebar-content": "calc(100vh - 56px - 120px)",
      },
      maxWidth: {
        "lg-dialog": "560px",
      },
      maxHeight: {
        "lg-dialog": "700px",
        category: "350px",
      },
      colors: {
        sidebar: "rgba(255, 255, 255, .7)",
        "bookmark-primary": "#00A4C9",
        grad: {
          "main-from": "#00A4C9",
          "main-from-50": "#006EA6",
          "main-to": "#0E5781",
        },
        custom: {
          "c-gray-200": "#f1f5f9",
          "c-gray-500": "#d6e3ed",
          "hover-white": "#f5fbff",
          sub: "#eee",
          "hover-sub": "#cfcfcf",
          icon: "#8f9faa",
          main: "#3EA8FF",
          secondary: "#0785ED",
          "gray-7070": "#707070",
          "main-hover": "#0f83fd",
          fontcolor: "#333",
          primary: "#1F4D45",
        },
        sub: "#eee",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
