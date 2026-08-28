// Runs `vite build`, then the static prerender step
// (scripts/prerender-static.mjs — see its header comment and the removal
// comment in vite.config.ts for why this replaced the old
// vite-plugin-prerender-based PRERENDER=true flow). Needs a real Chromium,
// which `puppeteer`'s own download provides. This IS what runs on
// Hostinger's own build host now (package.json's `build` script points
// here) — confirmed live Aug 28 2026, which is also how the sandbox
// constraint on that host was discovered and fixed (see the launch args
// in prerender-static.mjs). A prior version of this comment said the
// opposite; it was wrong.
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
