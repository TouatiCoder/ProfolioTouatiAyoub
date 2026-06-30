/**
 * Run: npx tsx scripts/generate-sitemap.ts
 * Generates /public/sitemap.xml with all programmatic pages + lastmod
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://touatiayoub.com";
const TODAY = new Date().toISOString().split("T")[0];

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

const BLOG_POSTS = [
  { slug: "creation-site-web-wordpress-meknes", date: "2026-03-18" },
  { slug: "creation-site-web-sur-mesure-meknes", date: "2026-03-17" },
  { slug: "prix-creation-site-web-maroc-2026", date: "2026-03-16" },
  { slug: "seo-meknes-referencement-google", date: "2026-03-15" },
  { slug: "trouver-clients-seo-maroc", date: "2026-03-14" },
  { slug: "combien-coute-site-web-maroc", date: "2026-04-01" },
  { slug: "seo-maroc-guide-complet", date: "2026-04-05" },
  { slug: "marketing-digital-pme-maroc", date: "2026-04-10" },
  { slug: "facebook-ads-maroc-guide", date: "2026-04-15" },
  { slug: "meilleur-freelance-web-maroc", date: "2026-04-20" },
  { slug: "seo-local-maroc", date: "2026-04-25" },
];

function url(loc: string, priority: string, freq: string, lastmod = TODAY): string {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${loc}</loc>`,
    `    <changefreq>${freq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </url>",
  ].join("\n");
}

const lines: string[] = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "",
  "  <!-- ===== CORE PAGES ===== -->",
  url("/", "1.0", "weekly"),
  url("/services", "0.9", "monthly"),
  url("/tarifs", "0.9", "monthly"),
  url("/audit-seo-gratuit", "0.9", "monthly"),
  url("/contact", "0.8", "monthly"),
  url("/realisations", "0.8", "monthly"),
  url("/blog", "0.8", "weekly"),
  url("/a-propos", "0.6", "monthly"),
  url("/agence-digitale-maroc", "0.9", "monthly"),
  "",
  "  <!-- ===== SERVICE PAGES (8) ===== -->",
  ...SERVICES.map((s) => url(`/services/${s}`, "0.9", "monthly")),
  "",
  "  <!-- ===== CITY PAGES (15) ===== -->",
  ...CITIES.map((c) => url(`/agence-digitale-${c}`, "0.8", "monthly")),
  "",
  "  <!-- ===== PROGRAMMATIC: SERVICE × CITY (120) ===== -->",
  ...SERVICES.flatMap((s) =>
    CITIES.map((c) => url(`/${s}-${c}`, "0.7", "monthly"))
  ),
  "",
  "  <!-- ===== BLOG POSTS ===== -->",
  ...BLOG_POSTS.map((p) => url(`/blog/${p.slug}`, "0.8", "monthly", p.date)),
  "",
  "</urlset>",
];

const output = lines.join("\n");
const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outPath, output, "utf-8");

const urlCount = lines.filter((l) => l.includes("<loc>")).length;
console.log(`✅ Sitemap generated: ${urlCount} URLs → ${outPath}`);
