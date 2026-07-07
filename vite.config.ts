import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const vitePrerender = require("vite-plugin-prerender");

// ===================================================
// PRERENDER ROUTE LIST — static snapshot for crawlers
// ===================================================
const CITIES = [
  "casablanca","rabat","marrakech","fes","tanger","meknes",
  "agadir","oujda","kenitra","tetouan","safi","el-jadida",
  "nador","beni-mellal","mohammedia",
];
const SERVICES = [
  "creation-site-web","referencement-seo",
  "montage-video","refonte-site-web",
];
const BLOG_SLUGS = [
  "creation-site-web-wordpress-meknes","creation-site-web-sur-mesure-meknes",
  "prix-creation-site-web-maroc-2026","seo-meknes-referencement-google",
  "trouver-clients-seo-maroc","combien-coute-site-web-maroc",
  "seo-maroc-guide-complet","meilleur-freelance-web-maroc","seo-local-maroc",
];

export function buildPrerenderRoutes(): string[] {
  const routes: string[] = [
    "/", "/services", "/contact", "/a-propos", "/blog",
    "/realisations", "/tarifs", "/audit-seo-gratuit",
    "/agence-digitale-maroc",
  ];
  CITIES.forEach((c) => routes.push(`/agence-digitale-${c}`));
  SERVICES.forEach((s) => routes.push(`/services/${s}`));
  SERVICES.forEach((s) => CITIES.forEach((c) => routes.push(`/${s}-${c}`)));
  BLOG_SLUGS.forEach((slug) => routes.push(`/blog/${slug}`));
  return routes;
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
      "/uploads": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    // Prerenders the SPA to static HTML per-route at build time so crawlers
    // that don't execute JS (Bing, LinkedIn, WhatsApp link previews, some AI
    // scrapers) see real content instead of an empty <div id="root">.
    mode === "production" &&
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes: buildPrerenderRoutes(),
        renderer: new vitePrerender.PuppeteerRenderer({
          renderAfterElementExists: "footer",
          maxConcurrentRoutes: 4,
          headless: true,
        }),
      }),
  ].filter(Boolean),
  build: {
    target: "chrome78",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) return "vendor";
          if (id.includes("lucide-react") || id.includes("framer-motion") || id.includes("clsx") || id.includes("tailwind-merge")) return "ui";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("@tanstack")) return "query";
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
