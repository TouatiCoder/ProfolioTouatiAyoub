import type { Config } from "tailwindcss";

// ============================================================
// AYOUB TOUATI — "MARKETING ENGINEER" DESIGN SYSTEM v3.0
// Strategy: Black / White / Grey base + Moroccan Red & Green
// (ported from "newport") — Navy → Ink/Neutral | Gold → Morocco Red
// | Teal → Morocco Green — token names kept for zero component churn
// ============================================================

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ─── FONTS ───────────────────────────────────────────────
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        arabic:  ["Cairo", "Tajawal", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      // ─── COLOR SYSTEM (maps to CSS vars in index.css) ────────
      colors: {
        // Shadcn/Radix semantic tokens
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light:      "hsl(var(--primary-light))",
          dark:       "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light:      "hsl(var(--accent-light))",
          dark:       "hsl(var(--accent-dark))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:             "hsl(var(--sidebar-background))",
          foreground:          "hsl(var(--sidebar-foreground))",
          primary:             "hsl(var(--sidebar-primary))",
          "primary-foreground":"hsl(var(--sidebar-primary-foreground))",
          accent:              "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border:              "hsl(var(--sidebar-border))",
          ring:                "hsl(var(--sidebar-ring))",
        },

        // ── Brand Tokens (ported from newport: black/grey + red/green) ──
        navy: {
          DEFAULT: "hsl(var(--navy))",   // near-black ink
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",   // morocco red (#c1272d)
          50:  "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#c1272d",    // ← morocco red
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",   // morocco green (#006b3f)
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#006b3f",    // ← morocco green
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },

        // ── Semantic Colors ───────────────────────────────────
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },

      // ─── SPACING ─────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      // ─── BORDER RADIUS ───────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ─── BOX SHADOWS ─────────────────────────────────────────
      boxShadow: {
        "gold":       "0 8px 32px -8px hsl(var(--gold) / 0.35)",
        "gold-lg":    "0 16px 64px -16px hsl(var(--gold) / 0.4)",
        "navy":       "0 8px 32px -8px hsl(var(--navy) / 0.35)",
        "teal":       "0 8px 32px -8px hsl(var(--teal) / 0.35)",
        "teal-glow":  "0 0 40px -8px hsl(var(--teal) / 0.5)",
        "card":       "0 1px 3px hsl(0 0% 0% / 0.04), 0 4px 16px hsl(0 0% 0% / 0.06)",
        "card-hover": "0 4px 24px hsl(0 0% 0% / 0.08), 0 16px 48px hsl(0 0% 0% / 0.06)",
        "glass":      "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
        "inner-gold": "inset 0 1px 0 hsl(var(--gold) / 0.25)",
      },

      // ─── ANIMATIONS ──────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(32px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "teal-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--teal) / 0.4)" },
          "50%":      { boxShadow: "0 0 0 12px hsl(var(--teal) / 0)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-up":         "fade-up 0.55s ease-out forwards",
        "fade-in":         "fade-in 0.4s ease-out forwards",
        "slide-in-right":  "slide-in-right 0.5s ease-out forwards",
        "scale-in":        "scale-in 0.35s ease-out forwards",
        "ping-slow":       "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "gradient-shift":  "gradient-shift 6s ease infinite",
        "shimmer":         "shimmer 2s linear infinite",
        "float":           "float 3s ease-in-out infinite",
        "teal-pulse":        "teal-pulse 2s ease-in-out infinite",
        "marquee":           "marquee 30s linear infinite",
        "marquee-slow":      "marquee 50s linear infinite",
        "marquee-reverse":   "marquee-reverse 35s linear infinite",
      },

      // ─── BACKGROUND SIZE ─────────────────────────────────────
      backgroundSize: {
        "300%": "300%",
        "400%": "400%",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
