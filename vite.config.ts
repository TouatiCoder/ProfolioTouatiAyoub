import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ===================================================
// ROUTES FOR PRERENDERING — keeps Google happy on SPA
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

function buildPrerenderRoutes(): string[] {
  const routes: string[] = [
    "/", "/services", "/contact", "/a-propos", "/blog",
    "/realisations", "/tarifs", "/audit-seo-gratuit",
    "/agence-digitale-maroc",
  ];
  // City pages
  CITIES.forEach((c) => routes.push(`/agence-digitale-${c}`));
  // Service pages
  SERVICES.forEach((s) => routes.push(`/services/${s}`));
  // Programmatic: service × city
  SERVICES.forEach((s) => CITIES.forEach((c) => routes.push(`/${s}-${c}`)));
  return routes;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "framer-motion"],
          query: ["@tanstack/react-query"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Prerender for SEO — uncomment when deploying to static host
    // mode === "production" && PrerenderPlugin({
    //   staticDir: path.join(__dirname, "dist"),
    //   routes: buildPrerenderRoutes(),
    //   renderer: new PuppeteerRenderer({ renderAfterDocumentEvent: "render-event", headless: true }),
    // }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
