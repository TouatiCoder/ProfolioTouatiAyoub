// Self-hosted fonts (via @fontsource) — replaces the Google Fonts CDN link
// that used to live in index.html. Same-origin means these ship as
// fingerprinted files in dist/assets, covered by the long-lived
// Cache-Control in public/.htaccess, and load with zero extra DNS/TLS
// handshake to fonts.googleapis.com / fonts.gstatic.com. Each fontsource
// file already sets font-display: swap and is split by unicode-range, so
// the browser only fetches the subset (latin, arabic, ...) actually needed
// to paint the text on the page. Only the weights actually used in the UI
// (see `grep -roE "font-(normal|medium|semibold|bold|extrabold|black)"`)
// are imported below — no italics, no unused 100/200/300/900 cuts.

// Inter — body text (font-sans)
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

// Plus Jakarta Sans — headings (font-display)
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

// Cairo — Arabic text (font-arabic)
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/800.css";
import "@fontsource/cairo/900.css";
