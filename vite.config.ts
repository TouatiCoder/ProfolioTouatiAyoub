import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ===================================================
// PRERENDER ROUTE LIST — static snapshot for crawlers
// ===================================================
const CITIES = [
  "casablanca","rabat","marrakech","fes","tanger","meknes",
  "agadir","oujda","kenitra","tetouan","safi","el-jadida",
  "nador","beni-mellal","mohammedia",
];
const SERVICES = [
  "creation-site-web","referencement-seo","marketing-digital",
  "montage-video","email-marketing","refonte-site-web",
  "publicite-reseaux-sociaux","google-ads",
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
  return routes;
}

export default defineConfig({
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
  plugins: [react()],
  build: {
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
});
