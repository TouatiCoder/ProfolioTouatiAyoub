/**
 * Single source of truth for the full prerenderable route list — derived
 * from the same centralized data files that drive the sitemap generator
 * (src/lib/seo-data.ts, src/data/blog-articles.ts), not a hand-maintained
 * duplicate. Shared by vite.config.ts (legacy, currently-dormant Puppeteer-v1
 * plugin — see the comment there) and scripts/prerender-static.mjs (the
 * active prerender step — see docs/INDEXING.md "Prerendering" section for
 * why the old plugin was replaced).
 */
import { cities, services } from "../src/lib/seo-data";
import { articles } from "../src/data/blog-articles";

export function buildPrerenderRoutes(): string[] {
  const routes: string[] = [
    "/", "/services", "/contact", "/a-propos", "/blog",
    "/realisations", "/audit-seo-gratuit",
    "/agence-digitale-maroc",
  ];
  cities.forEach((c) => routes.push(`/agence-digitale-${c.slug}`));
  services.forEach((s) => routes.push(`/services/${s.slug}`));
  services.forEach((s) => cities.forEach((c) => routes.push(`/${s.slug}-${c.slug}`)));
  Object.values(articles).forEach((article) => routes.push(`/blog/${article.slug}`));
  return routes;
}
