// Notifies Google of the sitemap so it recrawls the site sooner.
// Run: node scripts/ping-google.cjs
const https = require("https");
const http = require("http");

const SITEMAP_URL = "https://touatiayoub.com/sitemap.xml";
const PING_URLS = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  `http://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
];

function ping(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => {
        resolve({ url, status: res.statusCode, body: body.trim() });
      });
    });
    req.on("error", (err) => {
      resolve({ url, status: null, error: err.message });
    });
  });
}

async function main() {
  console.log(`Pinging Google for sitemap: ${SITEMAP_URL}\n`);

  let anySuccess = false;
  for (const url of PING_URLS) {
    const result = await ping(url);
    if (result.error) {
      console.log(`❌ ${url}\n   error: ${result.error}\n`);
      continue;
    }

    const ok = result.status >= 200 && result.status < 300;
    anySuccess = anySuccess || ok;
    console.log(`${ok ? "✅" : "❌"} ${url}`);
    console.log(`   status: ${result.status}`);
    if (result.body) console.log(`   body: ${result.body}`);
    console.log();
  }

  if (!anySuccess) {
    console.log("⚠️  No ping succeeded. Note: Google deprecated the sitemap ping endpoint in 2023 — it may always return 404 now, regardless of sitemap validity. Submit the sitemap in Google Search Console instead for a guaranteed recrawl signal.");
  }
}

main();
