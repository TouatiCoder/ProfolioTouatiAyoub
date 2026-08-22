/**
 * Run: node scripts/generate-og-image.cjs
 * Renders a branded 1200x630 OG image to public/og-image.jpg via headless Chromium.
 * Fixes the broken og:image / twitter:image (file never existed, all social previews were blank).
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const OUT_PATH = path.resolve(__dirname, "../public/og-image.jpg");

// Same fallback as scripts/prerender-static.mjs: puppeteer's own bundled
// Chromium download landed corrupted on this dev machine (missing ICU data /
// missing chrome.exe after `npx puppeteer browsers install chrome`) — fall
// back to a real system Chrome/Edge install when present.
function findSystemBrowser() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ];
  return candidates.find((p) => fs.existsSync(p));
}

const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    font-family: 'Inter', Arial, sans-serif;
    background: radial-gradient(circle at 20% 20%, #22345c 0%, #1a2b47 55%, #0f1b31 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 90px;
    position: relative;
    overflow: hidden;
  }
  .accent-bar { position: absolute; top: 0; left: 0; width: 100%; height: 10px; background: #C9982A; }
  .eyebrow {
    color: #C9982A;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  h1 { color: #ffffff; font-size: 64px; font-weight: 800; line-height: 1.15; max-width: 950px; }
  .subtitle { color: #d7deeb; font-size: 30px; font-weight: 500; margin-top: 24px; max-width: 850px; }
  .footer { position: absolute; bottom: 48px; left: 90px; display: flex; align-items: center; gap: 24px; }
  .badge {
    background: rgba(201,152,42,0.15);
    border: 1px solid #C9982A;
    color: #C9982A;
    font-size: 22px;
    font-weight: 700;
    padding: 10px 22px;
    border-radius: 999px;
  }
  .contact { color: #9fb0cc; font-size: 22px; font-weight: 500; }
</style>
</head>
<body>
  <div class="accent-bar"></div>
  <div class="eyebrow">Meknès · Maroc</div>
  <h1>Ayoub Touati<br/>Expert Digital &amp; Développeur Full-Stack</h1>
  <div class="subtitle">Création de sites web · SEO · IA · Marketing Digital</div>
  <div class="footer">
    <div class="badge">touatiayoub.com</div>
    <div class="contact">+212 710 755 666</div>
  </div>
</body>
</html>
`;

(async () => {
  const launchOpts = { headless: "new", args: ["--no-sandbox", "--disable-setuid-sandbox"] };
  let browser;
  try {
    browser = await puppeteer.launch(launchOpts);
  } catch (err) {
    const executablePath = findSystemBrowser();
    if (!executablePath) throw err;
    console.log(`Bundled Chromium unavailable, using system browser: ${executablePath}`);
    browser = await puppeteer.launch({ ...launchOpts, executablePath });
  }
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.screenshot({ path: OUT_PATH, type: "jpeg", quality: 92 });
    console.log(`OG image written to ${OUT_PATH}`);
  } finally {
    await browser.close();
  }
})();
