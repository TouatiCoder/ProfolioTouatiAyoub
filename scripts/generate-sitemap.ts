/**
 * Run: npx tsx scripts/generate-sitemap.ts
 * Generates /public/sitemap.xml from the centralized SEO data
 * (src/lib/seo-data.ts, src/data/blog-articles.ts) — no hardcoded
 * city/service/blog lists. Add a city or service in seo-data.ts and it
 * appears here automatically on the next run.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cities, services, industries } from "../src/lib/seo-data";
import { articles } from "../src/data/blog-articles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://touatiayoub.com";
const TODAY = new Date().toISOString().split("T")[0];
// Matches the same fallback convention as src/lib/api.ts.
const API_URL = (process.env.VITE_API_URL || "https://forge-scale.onrender.com").replace(/\/$/, "");

interface SitemapUrl {
  loc: string;
  priority: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod: string;
}

function url(
  loc: string,
  priority: string,
  changefreq: SitemapUrl["changefreq"],
  lastmod: string = TODAY,
): SitemapUrl {
  return { loc, priority, changefreq, lastmod };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── URL builders — one per page cluster, each a pure function over centralized data ──

/**
 * Genuine one-off routes with no corresponding data array to derive them
 * from (there's exactly one homepage, one contact page, etc.) — this is the
 * only place a URL is written by hand, and it's an exhaustive, reviewable list.
 */
function corePages(): SitemapUrl[] {
  return [
    url("/", "1.0", "weekly"),
    url("/services", "0.9", "monthly"),
    url("/audit-seo-gratuit", "0.9", "monthly"),
    url("/contact", "0.8", "monthly"),
    url("/realisations", "0.8", "monthly"),
    url("/blog", "0.8", "weekly"),
    url("/a-propos", "0.6", "monthly"),
    url("/agence-digitale-maroc", "0.9", "monthly"),
  ];
}

function servicePages(): SitemapUrl[] {
  return services.map((service) => url(`/services/${service.slug}`, "0.9", "monthly"));
}

function cityPages(): SitemapUrl[] {
  return cities.map((city) => url(`/agence-digitale-${city.slug}`, "0.8", "monthly"));
}

function serviceCityPages(): SitemapUrl[] {
  return services.flatMap((service) =>
    cities.map((city) => url(`/${service.slug}-${city.slug}`, "0.7", "monthly")),
  );
}

function staticBlogPages(): SitemapUrl[] {
  return Object.values(articles).map((article) => url(`/blog/${article.slug}`, "0.8", "monthly", article.date));
}

interface DbBlogPost {
  slug: string;
  published_at: string | null;
  created_at: string;
}

/**
 * Best-effort fetch of DB-managed blog posts at build time. Network/API
 * failures must not fail the whole sitemap build — falls back to an empty
 * array and logs a warning, same resilience pattern as usePublicServices.
 */
async function dbBlogPages(): Promise<SitemapUrl[]> {
  try {
    const res = await fetch(`${API_URL}/api/blog`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = (await res.json()) as DbBlogPost[];
    return posts.map((post) =>
      url(`/blog/${post.slug}`, "0.8", "monthly", (post.published_at || post.created_at).split("T")[0]),
    );
  } catch (err) {
    console.warn(
      `⚠️  Sitemap: could not fetch DB-backed blog posts (${(err as Error).message}) — continuing with static articles only.`,
    );
    return [];
  }
}

// ── Prepared for future clusters — NOT called in buildSitemap() yet ──────────
// No live route exists for /secteurs/* or /entreprises/* today (see App.tsx).
// Submitting these now would recreate the /tarifs soft-404 bug (Phase 1).
// Once those routes ship: add `...industryPages()` / `...enterprisePages()`
// to the composition in buildSitemap() below — everything else (dedupe,
// sort, XML output) already handles them with zero further changes.

function industryPages(): SitemapUrl[] {
  return industries.map((industry) => url(`/secteurs/${industry.slug}`, "0.6", "monthly"));
}
void industryPages; // referenced to document intent; silences unused-export lint until activated

function dedupe(urls: SitemapUrl[]): SitemapUrl[] {
  const seen = new Set<string>();
  return urls.filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

function toXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((entry) =>
      [
        "  <url>",
        `    <loc>${escapeXml(`${BASE_URL}${entry.loc}`)}</loc>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");
}

async function buildSitemap(): Promise<{ xml: string; count: number }> {
  const dbPosts = await dbBlogPages();
  const dbSlugs = new Set(dbPosts.map((post) => post.loc));
  // If a slug exists in both the static articles file and the DB, the DB
  // version wins (it's the live, editable source).
  const staticPosts = staticBlogPages().filter((post) => !dbSlugs.has(post.loc));

  const allUrls = dedupe([
    ...corePages(),
    ...servicePages(),
    ...cityPages(),
    ...serviceCityPages(),
    ...staticPosts,
    ...dbPosts,
  ]);

  // Stable ordering: alphabetical by URL. Deterministic across runs, and
  // adding one new city/service only ever changes one line in the diff
  // instead of shifting a hand-maintained "section" of the file.
  allUrls.sort((a, b) => a.loc.localeCompare(b.loc));

  return { xml: toXml(allUrls), count: allUrls.length };
}

const { xml, count } = await buildSitemap();
const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");

console.log(`✅ Sitemap generated: ${count} URLs → ${outPath}`);
