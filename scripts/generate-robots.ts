/**
 * Run: npx tsx scripts/generate-robots.ts
 * Generates /public/robots.txt from the centralized policy in
 * scripts/robots-config.ts — the only file to edit for a crawler policy change.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { robotsConfig, type CrawlerGroup } from "./robots-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function renderGroup(userAgent: string, crawlDelay: number | undefined, disallow: string[]): string {
  const lines = [`User-agent: ${userAgent}`, "Allow: /"];
  for (const rule of disallow) {
    lines.push(`Disallow: ${rule}`);
  }
  if (crawlDelay !== undefined) {
    lines.push(`Crawl-delay: ${crawlDelay}`);
  }
  return lines.join("\n");
}

function buildRobotsTxt(): string {
  const { baseUrl, globalDisallow, crawlers, fallbackCrawlDelay } = robotsConfig;

  const namedGroups = crawlers.map((crawler: CrawlerGroup) =>
    renderGroup(crawler.userAgent, crawler.crawlDelay, globalDisallow),
  );

  // Fallback group for every crawler not named above — same disallow rules apply.
  const fallbackGroup = renderGroup("*", fallbackCrawlDelay, globalDisallow);

  const sitemapBlock = [`# Sitemap`, `Sitemap: ${baseUrl}/sitemap.xml`].join("\n");
  const hostBlock = [`# Host`, `Host: ${baseUrl}`].join("\n");

  return [...namedGroups, fallbackGroup, sitemapBlock, hostBlock].join("\n\n") + "\n";
}

const output = buildRobotsTxt();
const outPath = path.join(__dirname, "..", "public", "robots.txt");
fs.writeFileSync(outPath, output, "utf-8");

const groupCount = robotsConfig.crawlers.length + 1; // + the fallback "*" group
console.log(`✅ robots.txt generated: ${groupCount} crawler groups → ${outPath}`);
