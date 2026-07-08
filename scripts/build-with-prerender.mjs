// Runs `vite build` with PRERENDER=true so vite.config.ts enables the
// Puppeteer prerender step. Use this locally or in CI where Chrome's system
// dependencies are available — NOT on the Hostinger build host, which lacks
// them (see build failure this was added for: missing libXss.so.1).
import { spawn } from "node:child_process";

const child = spawn("npx", ["vite", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PRERENDER: "true" },
});

child.on("exit", (code) => process.exit(code ?? 1));
