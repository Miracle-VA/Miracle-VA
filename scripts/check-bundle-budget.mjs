// Bundle budget (build-system/05): initial JavaScript per route, gzipped.
// Fails the build above 180 KB; warns above the 120 KB target.
// Counts every <script src> a prerendered page loads in a modern browser
// (legacy `nomodule` polyfills are skipped: modern browsers never fetch them).
// Run after `next build`.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const HARD_LIMIT_KB = 180;
const TARGET_KB = 120;
const appDir = path.join(process.cwd(), ".next", "server", "app");

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) out.push(full);
  }
  return out;
}

const sizeCache = new Map();
async function gzipKb(src) {
  if (!sizeCache.has(src)) {
    const file = path.join(process.cwd(), ".next", src.replace(/^\/_next\//, ""));
    sizeCache.set(src, gzipSync(await readFile(file)).length / 1024);
  }
  return sizeCache.get(src);
}

const rows = [];
for (const file of await htmlFiles(appDir)) {
  const html = await readFile(file, "utf8");
  let total = 0;
  for (const m of html.matchAll(/<script src="(\/_next\/static\/[^"]+\.js)"([^>]*)>/g)) {
    if (/nomodule/i.test(m[2])) continue;
    total += await gzipKb(m[1]);
  }
  const route = "/" + path.relative(appDir, file).replace(/\\/g, "/").replace(/(index)?\.html$/, "").replace(/\/$/, "");
  rows.push({ route: route === "/" ? "/" : route, kb: total });
}

rows.sort((a, b) => b.kb - a.kb);
let failed = false;
for (const { route, kb } of rows) {
  const status = kb > HARD_LIMIT_KB ? "FAIL" : kb > TARGET_KB ? "over target" : "ok";
  if (kb > HARD_LIMIT_KB) failed = true;
  console.log(`${status.padEnd(12)} ${kb.toFixed(1).padStart(6)} KB  ${route}`);
}
if (failed) {
  console.error(`\nBundle budget exceeded: a route ships more than ${HARD_LIMIT_KB} KB of JS (gzip).`);
  process.exit(1);
}
