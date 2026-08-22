import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { buildPrerenderRoutes } from "./scripts/prerender-routes";

// Re-exported for anything still importing buildPrerenderRoutes from here;
// scripts/prerender-routes.ts is now the single source of truth.
export { buildPrerenderRoutes };

export default defineConfig(() => ({
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
    // Prerendering used to run here via the `vite-plugin-prerender` Vite
    // plugin, gated behind PRERENDER=true. Removed (Aug 2026 SEO audit):
    // that plugin pulls in `@prerenderer/renderer-puppeteer`, which pins
    // `puppeteer@^1.7.0` — a 2019 release bundling Chromium 78. Chromium 78
    // predates optional chaining/nullish coalescing (`?.`/`??`, Chrome 80+),
    // which this build's untranspiled output uses deliberately (see the
    // `build.target` comment below) — so every single route hit a hard
    // `SyntaxError` on the first script tag, the React root never mounted,
    // and `renderAfterElementExists: "footer"` timed out at 30s × every
    // route. The plugin's own catch block swallows that error and only logs
    // "Unable to prerender all routes!", so this failed silently for a long
    // time — it was never a Hostinger-host libXss.so.1 limitation as
    // previously documented (see docs/INDEXING.md).
    // Fixed by `scripts/prerender-static.mjs`, run as a separate step after
    // `vite build` (see `build:prerender` in package.json) — a small,
    // dependency-light script using a current `puppeteer` (real Chromium),
    // sharing the same `buildPrerenderRoutes()` route list.
  ],
  build: {
    // No custom `target` — Vite's default ("modules", i.e. Chrome 87+ /
    // Safari 14+ / Firefox 78+ / Edge 88+, all ES2020+ with native ESM)
    // skips down-leveling syntax like `??`/`?.` that a `chrome78` target
    // forced esbuild to transpile, which was inflating every chunk with
    // polyfill-ish helper code for a browser baseline visitors don't run.
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
