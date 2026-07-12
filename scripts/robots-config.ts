/**
 * Single source of truth for crawler policy. Add, remove, or change a
 * crawler group or disallow rule here — scripts/generate-robots.ts renders
 * this into public/robots.txt. No other file should ever need editing for
 * a robots.txt policy change.
 */

export interface CrawlerGroup {
  /** robots.txt User-agent token, e.g. "Googlebot". */
  userAgent: string;
  /** Documents intent in this file — not rendered into the output. */
  note?: string;
  crawlDelay?: number;
}

export interface RobotsConfig {
  baseUrl: string;
  /** Paths disallowed for every crawler group below, applied uniformly. */
  globalDisallow: string[];
  crawlers: CrawlerGroup[];
  /** Crawl-delay for the fallback User-agent: * group (any crawler not named above). */
  fallbackCrawlDelay: number;
}

export const robotsConfig: RobotsConfig = {
  baseUrl: "https://touatiayoub.com",

  // Applied to every named group AND the fallback "*" group — fixes the gap
  // where only unnamed crawlers were actually restricted (see Commit 7 notes).
  globalDisallow: ["/admin/", "/api/", "/uploads/"],

  crawlers: [
    { userAgent: "Googlebot", crawlDelay: 1 },
    { userAgent: "Bingbot", crawlDelay: 2 },
    { userAgent: "Twitterbot", note: "link previews" },
    { userAgent: "facebookexternalhit", note: "link previews" },
    { userAgent: "LinkedInBot", note: "link previews" },
    { userAgent: "WhatsApp", note: "link previews" },

    // AI crawlers — allowed by default (policy default: allow all legitimate
    // crawlers, including AI). Named explicitly so the intent is deliberate,
    // not incidental — makes it a one-line change to restrict any of them later.
    { userAgent: "GPTBot", note: "OpenAI training crawler" },
    { userAgent: "ChatGPT-User", note: "OpenAI live browsing on behalf of a user" },
    { userAgent: "ClaudeBot", note: "Anthropic training crawler" },
    { userAgent: "Claude-Web", note: "Anthropic live browsing on behalf of a user" },
    { userAgent: "PerplexityBot", note: "Perplexity answer engine" },
    { userAgent: "Google-Extended", note: "Google AI training signal, separate from Googlebot" },
    { userAgent: "CCBot", note: "Common Crawl — feeds many third-party AI training sets" },
  ],

  fallbackCrawlDelay: 5,
};
