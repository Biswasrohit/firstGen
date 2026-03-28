import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn CSS variable colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          container: "#89e9f6",
          dim: "#005c65",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          container: "#ffdcbe",
          dim: "#7b4700",
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
        // Design system extras
        tertiary: {
          DEFAULT: "#734d9f",
          container: "#d1a7ff",
          dim: "#664092",
        },
        surface: {
          DEFAULT: "#fef8f3",
          dim: "#e0d9d1",
          bright: "#fef8f3",
          container: {
            DEFAULT: "#f3ede6",
            low: "#f9f3ed",
            lowest: "#ffffff",
            high: "#eee7e0",
            highest: "#e8e1da",
          },
        },
        "on-surface": {
          DEFAULT: "#35322d",
          variant: "#625e59",
        },
        "on-primary": "#eafcff",
        savings: {
          good: "#1b6d24",
          bad: "#ac3434",
        },
        ochre: {
          DEFAULT: "#8c5100",
          light: "#ffdcbe",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "3rem",
      },
      letterSpacing: {
        "tight-display": "-0.03em",
      },
      lineHeight: {
        relaxed: "1.7",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(53, 50, 45, 0.06)",
        "soft-lg": "0 16px 32px rgba(53, 50, 45, 0.08)",
        "tinted-teal": "0 8px 24px rgba(0, 105, 115, 0.12)",
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
};
export default config;
