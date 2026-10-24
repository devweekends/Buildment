#!/usr/bin/env node
/**
 * Canvas text QA (IP v0.5.2), headless. Opens /workspace/canvases at phone
 * width, drives every canvas through its states (one loop of animation, each
 * slider at its ends and middle, after each button) in light and dark mode,
 * and runs scripts/canvas-text-qa.js on every picture. Any label that touches
 * another label, a line or a shape, or runs out of its card or the picture,
 * is reported.
 *
 * Usage (from the repository root, with the web app running):
 *   node agent-ip/scripts/canvas-text-qa.mjs --base http://localhost:3530 --prefix sysdesign-m1-
 *   node agent-ip/scripts/canvas-text-qa.mjs --slug sysdesign-m1-launch-day --json report.json
 *
 * Signs in as the seed mentor (QA_EMAIL / QA_PASSWORD override it).
 * Exit code 1 when any collision is found.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const require = createRequire(path.join(root, "frontend", "package.json"));
const { chromium } = require("@playwright/test");

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const base = arg("base", "http://localhost:3530");
const prefix = arg("prefix", "");
const only = arg("slug", "");
const jsonOut = arg("json", "");
const schemes = (arg("schemes", "light,dark") || "light").split(",");
const email = process.env.QA_EMAIL ?? "mentor@buildment.dev";
const password = process.env.QA_PASSWORD ?? "buildment-dev";
const helper = fs.readFileSync(path.join(here, "canvas-text-qa.js"), "utf8");

// Runs inside the page: drives one canvas section and collects collisions.
async function driveSection(sectionIndex) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const section = document.querySelectorAll("section")[sectionIndex];
  const found = new Set();
  const moving = new Set();
  // A collision whose labels are all moving (a packet in flight) is reported apart, not as a failure.
  const scan = async (tag) => {
    for (const svg of section.querySelectorAll("svg")) {
      if (svg.getBoundingClientRect().width < 150) continue;
      const movers = await window.__movingLabels(svg);
      for (const issue of window.__collisions(svg)) {
        const names = [...issue.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
        const target = names.length && names.every((n) => movers.has(n)) ? moving : found;
        target.add(tag ? `${issue} [${tag}]` : issue);
      }
    }
  };
  section.scrollIntoView({ block: "start" });
  await wait(300);
  for (let i = 0; i < 16; i++) {
    await wait(700);
    await scan("");
  }
  for (const s of section.querySelectorAll('[role="slider"]')) {
    const key = (k) => s.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
    for (const [k, n, tag] of [["Home", 1, "min"], ["ArrowRight", 6, "low"], ["ArrowRight", 12, "mid"], ["End", 1, "max"]]) {
      s.focus({ preventScroll: true });
      for (let j = 0; j < n; j++) {
        key(k);
        await wait(15);
      }
      s.blur();
      await wait(900);
      await scan(tag);
    }
  }
  const buttons = [...section.querySelectorAll('button, [role="button"]')].filter(
    // SVG chips have no offsetParent, so visibility is judged by size.
    (b) => b.getBoundingClientRect().width > 0 && !/replay|start over|reset/i.test(b.textContent || "") && !b.closest("summary,details")
  );
  for (const b of buttons.slice(0, 16)) {
    const label = (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 24);
    if (typeof b.click === "function") b.click();
    else for (const type of ["pointerdown", "pointerup", "click"]) b.dispatchEvent(new MouseEvent(type, { bubbles: true }));
    for (let i = 0; i < 3; i++) {
      await wait(700);
      await scan(`after ${label}`);
    }
  }
  return { issues: [...found], moving: [...moving] };
}

// Uses an installed browser (Edge by default) so nothing has to be downloaded; QA_CHANNEL=chrome or chromium overrides it.
const browser = await chromium.launch({ channel: process.env.QA_CHANNEL ?? "msedge" });
const report = {};
const motion = {};
try {
  for (const scheme of schemes) {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, colorScheme: scheme });
    const page = await context.newPage();
    await page.goto(`${base}/login`);
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.press('input[type="password"]', "Enter");
    await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });
    await page.goto(`${base}/workspace/canvases`, { waitUntil: "networkidle", timeout: 120000 });
    if (scheme === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.addScriptTag({ content: helper });
    const slugs = await page.$$eval("section", (secs) => secs.map((s) => (s.querySelector("code")?.textContent || "").replace("slug: ", "").trim()));
    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      if (!slug || (only && slug !== only) || (prefix && !slug.startsWith(prefix))) continue;
      const { issues, moving } = await page.evaluate(driveSection, i);
      if (issues.length) {
        report[slug] ??= {};
        report[slug][scheme] = issues;
      }
      if (moving.length) motion[`${slug} (${scheme})`] = moving;
      process.stdout.write(`${scheme} ${slug}: ${issues.length ? issues.length + " issue(s)" : "clean"}${moving.length ? `, ${moving.length} in motion` : ""}\n`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ collisions: report, inMotion: motion }, null, 2));
const bad = Object.keys(report);
console.log(`\nCanvases with collisions: ${bad.length}`);
for (const slug of bad) for (const [scheme, issues] of Object.entries(report[slug])) for (const issue of issues) console.log(`  ${slug} (${scheme}): ${issue}`);
if (bad.length) process.exitCode = 1;
