// Runs `vite build`, then the static prerender step
// (scripts/prerender-static.mjs — see its header comment and the removal
// comment in vite.config.ts for why this replaced the old
// vite-plugin-prerender-based PRERENDER=true flow). Needs a real Chromium,
// which `puppeteer`'s own download provides — works on this dev machine and
// any CI runner; the previous doc note about the Hostinger build host
// lacking libXss.so.1 was for the OLD Puppeteer-v1-based plugin and is
// unrelated to this script, but the underlying constraint is the same:
// this still isn't meant to run on the Hostinger build host itself. Build
// locally (or in CI) and deploy the resulting dist/ folder.
import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: true });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`))));
  });
}

try {
  await run("npx", ["vite", "build"]);
  await run("npx", ["tsx", "scripts/prerender-static.mjs"]);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
