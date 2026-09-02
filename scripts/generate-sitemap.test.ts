import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const SITEMAP_PATH = new URL("../public/sitemap.xml", import.meta.url);
const GUIDE_URL = "https://touatiayoub.com/guides/laravel-react-ecommerce-architecture/";

describe("SEO sitemap discovery", () => {
  it("includes the Laravel + React developer guide", () => {
    const sitemap = readFileSync(SITEMAP_PATH, "utf8");
    expect(sitemap).toContain(`<loc>${GUIDE_URL}</loc>`);
  });
});
