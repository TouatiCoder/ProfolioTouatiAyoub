/**
 * Run: npx tsx scripts/validate-indexing.ts
 * Automated indexing-infrastructure checks — run before every deploy (or in
 * CI). Exits non-zero on any hard failure so it can gate a build.
 *
 * Checks:
 *  1. No duplicate <loc> entries in public/sitemap.xml
 *  2. No sitemap URL falls under a robots.txt-disallowed path
 *  3. BASE_URL is consistent across the sitemap and robots configs
 *  4. Every sitemap URL matches a known, live URL pattern
 *  5. URL count is within the sitemap protocol limit
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cities, services } from "../src/lib/seo-data";
import { articles } from "../src/data/blog-articles";
import { robotsConfig } from "./robots-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_URL_LIMIT = 50_000;

let failures = 0;
let warnings = 0;

function fail(message: string): void {
  console.error(`❌ ${message}`);
  failures += 1;
}

function warn(message: string): void {
  console.warn(`⚠️  ${message}`);
  warnings += 1;
}

function pass(message: string): void {
  console.log(`✅ ${message}`);
}

const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

// ── 1. No duplicate URLs ─────────────────────────────────────────────────
const seen = new Set<string>();
const duplicates = new Set<string>();
for (const loc of locs) {
  if (seen.has(loc)) duplicates.add(loc);
  seen.add(loc);
}
if (duplicates.size > 0) {
  fail(`${duplicates.size} duplicate URL(s) in sitemap.xml: ${[...duplicates].join(", ")}`);
} else {
  pass(`No duplicate URLs (${locs.length} total).`);
}

// ── 2. No sitemap URL under a robots-disallowed path ────────────────────
const disallowed = locs.filter((loc) =>
  robotsConfig.globalDisallow.some((rule) => loc.replace(robotsConfig.baseUrl, "").startsWith(rule)),
);
if (disallowed.length > 0) {
  fail(`${disallowed.length} sitemap URL(s) fall under a robots.txt-disallowed path: ${disallowed.join(", ")}`);
} else {
  pass("No sitemap URLs conflict with robots.txt disallow rules.");
}

// ── 3. BASE_URL consistency ──────────────────────────────────────────────
const SITEMAP_BASE_URL = "https://touatiayoub.com"; // kept in sync manually with generate-sitemap.ts
if (SITEMAP_BASE_URL !== robotsConfig.baseUrl) {
  fail(`BASE_URL mismatch: sitemap uses "${SITEMAP_BASE_URL}", robots-config uses "${robotsConfig.baseUrl}".`);
} else {
  pass(`BASE_URL consistent across sitemap and robots config ("${SITEMAP_BASE_URL}").`);
}
if (!locs.every((loc) => loc.startsWith(SITEMAP_BASE_URL))) {
  fail("At least one sitemap URL does not start with the expected BASE_URL.");
}

// ── 4. Every sitemap URL matches a known, live pattern ───────────────────
const knownPaths = new Set<string>([
  "/",
  "/services",
  "/tarifs",
  "/audit-seo-gratuit",
  "/contact",
  "/realisations",
  "/blog",
  "/a-propos",
  "/agence-digitale-maroc",
]);
for (const service of services) knownPaths.add(`/services/${service.slug}`);
for (const city of cities) knownPaths.add(`/agence-digitale-${city.slug}`);
for (const service of services) for (const city of cities) knownPaths.add(`/${service.slug}-${city.slug}`);
for (const article of Object.values(articles)) knownPaths.add(`/blog/${article.slug}`);

const unrecognized = locs
  .map((loc) => loc.replace(SITEMAP_BASE_URL, "") || "/")
  .filter((p) => {
    if (knownPaths.has(p)) return false;
    // DB-backed blog posts aren't in the static `articles` list — allow any /blog/* slug.
    if (p.startsWith("/blog/")) return false;
    return true;
  });
if (unrecognized.length > 0) {
  fail(`${unrecognized.length} sitemap URL(s) don't match any known live route pattern: ${unrecognized.join(", ")}`);
} else {
  pass("Every sitemap URL matches a known, live route pattern.");
}

// ── 5. URL count within protocol limit ────────────────────────────────────
if (locs.length > SITEMAP_URL_LIMIT) {
  fail(`Sitemap has ${locs.length} URLs, exceeding the ${SITEMAP_URL_LIMIT} protocol limit.`);
} else if (locs.length > SITEMAP_URL_LIMIT * 0.8) {
  warn(`Sitemap has ${locs.length} URLs, approaching the ${SITEMAP_URL_LIMIT} protocol limit.`);
} else {
  pass(`URL count (${locs.length}) well within the ${SITEMAP_URL_LIMIT} protocol limit.`);
}

console.log(`\n${failures === 0 ? "✅" : "❌"} ${failures} failure(s), ${warnings} warning(s).`);
if (failures > 0) {
  process.exit(1);
}
