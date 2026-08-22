#!/usr/bin/env node
/**
 * Static prerender step — run AFTER `vite build` (see `build:prerender` in
 * package.json). Replaces the old `vite-plugin-prerender` Vite plugin (see
 * the removal comment in vite.config.ts): that plugin depended on
 * `@prerenderer/renderer-puppeteer`, which pins `puppeteer@^1.7.0` (2019,
 * Chromium 78) — too old to parse this build's untranspiled `?.`/`??`
 * syntax, so the SPA never booted and every route silently failed.
 *
 * This script uses whatever `puppeteer` is installed directly (a current
 * version — real, modern Chromium) against a plain Node static file server,
 * and writes each route's fully-rendered HTML to `dist/<route>/index.html`.
 * Apache's SPA fallback rule in public/.htaccess only rewrites to
 * index.html when the requested path is NOT an existing file
 * (`RewriteCond %{REQUEST_FILENAME} !-f`), so these prerendered files are
 * served directly to crawlers — no rewrite, no React needed to see correct
 * <title>/<meta description>/canonical/JSON-LD. Browsers still get the same
 * files, then React hydrates over them exactly as before; no behavior
 * change for real visitors.
 *
 * Root route "/" writes straight to dist/index.html, replacing the
 * client-only shell with the fully rendered homepage.
 */
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { buildPrerenderRoutes } from "./prerender-routes.ts";

// Puppeteer's own Chromium download (`npx puppeteer browsers install
// chrome`) is what CI/most machines should rely on. On this dev machine that
// download kept landing without chrome.exe (partial extraction), so this
// falls back to a real system Chrome/Edge install if present — same modern
// rendering engine, just not the one puppeteer manages. Harmless either way:
// launch() below still tries puppeteer's own resolution first.
function findSystemBrowser() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ];
  return candidates.find((p) => fs.existsSync(p));
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const PORT = 4174;
const CONCURRENCY = 4;
const NAV_TIMEOUT_MS = 20_000;
const RENDER_WAIT_SELECTOR = "footer";
const RENDER_WAIT_TIMEOUT_MS = 15_000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(DIST_DIR, urlPath);

    // SPA-ish resolution: exact file, else its own index.html, else the
    // root shell — mirrors the .htaccess fallback so what Puppeteer sees
    // here matches what a fresh, not-yet-prerendered route would get in
    // production on the first crawl.
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const asIndex = path.join(filePath, "index.html");
      filePath = fs.existsSync(asIndex) ? asIndex : path.join(DIST_DIR, "index.html");
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  try {
    // domcontentloaded, not networkidle0: pages that fetch live data from the
    // backend API (Index, Services, Contact, About — usePublicServices etc.)
    // keep a keep-alive connection open, so networkidle0 never fires and
    // every one of those routes hit the 20s nav timeout. The React root
    // mounting is what actually matters, and `footer` existing is a
    // reliable signal for that (this matches the original vite-plugin-
    // prerender config, which never used networkidle0 either).
    await page.goto(`http://127.0.0.1:${PORT}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: NAV_TIMEOUT_MS,
    });
    await page.waitForSelector(RENDER_WAIT_SELECTOR, { timeout: RENDER_WAIT_TIMEOUT_MS });
    // Brief settle so async-fetched lists (services/projects/testimonials)
    // that mount after `footer` finish painting before capture.
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (consoleErrors.length > 0) {
      throw new Error(`Page executed with JS errors: ${consoleErrors.join(" | ")}`);
    }

    const html = await page.content();
    return { route, html, ok: true };
  } catch (err) {
    return { route, error: err.message, ok: false };
  } finally {
    await page.close();
  }
}

async function writeRoute(route, html) {
  const outPath =
    route === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, route.replace(/^\//, ""), "index.html");
  await fsp.mkdir(path.dirname(outPath), { recursive: true });
  await fsp.writeFile(outPath, html.trim(), "utf-8");
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error("❌ dist/ not found — run `vite build` before this script.");
    process.exit(1);
  }

  const routes = buildPrerenderRoutes();
  console.log(`[prerender-static] Prerendering ${routes.length} routes...`);

  const server = await startStaticServer();
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
  } catch (err) {
    const executablePath = findSystemBrowser();
    if (!executablePath) throw err;
    console.log(`[prerender-static] Bundled Chromium unavailable, using system browser: ${executablePath}`);
    browser = await puppeteer.launch({ headless: true, executablePath });
  }

  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < routes.length) {
      const route = routes[cursor++];
      const result = await renderRoute(browser, route);
      results.push(result);
      if (result.ok) {
        await writeRoute(route, result.html);
        process.stdout.write(".");
      } else {
        process.stdout.write("x");
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  process.stdout.write("\n");

  await browser.close();
  server.close();

  const failed = results.filter((r) => !r.ok);
  const succeeded = results.filter((r) => r.ok);
  console.log(`[prerender-static] ${succeeded.length}/${routes.length} routes prerendered.`);
  if (failed.length > 0) {
    console.error(`[prerender-static] ${failed.length} route(s) FAILED:`);
    failed.forEach((r) => console.error(`  ${r.route}: ${r.error}`));
    process.exit(1);
  }
  console.log("[prerender-static] ✅ All routes prerendered successfully.");
}

main().catch((err) => {
  console.error("[prerender-static] Fatal error:", err);
  process.exit(1);
});
