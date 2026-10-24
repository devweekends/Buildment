#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "courses/multi-vendor-marketplace/variants");
if (!fs.existsSync(root)) throw new Error(`Variant source not found: ${root}`);

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? files(full) : entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

const occurrences = new Map();
for (const file of files(root)) {
  let source = fs.readFileSync(file, "utf8");
  source = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  source = source.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, "");
  for (const paragraph of source.split(/\r?\n\s*\r?\n/)) {
    const normalized = paragraph.replace(/\s+/g, " ").trim();
    if (normalized.split(" ").length < 45) continue;
    const paths = occurrences.get(normalized) ?? new Set();
    paths.add(path.relative(root, file));
    occurrences.set(normalized, paths);
  }
}

const repeated = [...occurrences].filter(([, paths]) => paths.size > 1)
  .sort((a, b) => b[1].size - a[1].size);
for (const [paragraph, paths] of repeated.slice(0, 20)) {
  console.error(`${paths.size} chapters repeat: ${paragraph.slice(0, 105)}...`);
  console.error(`  ${[...paths].slice(0, 4).join(", ")}${paths.size > 4 ? ", ..." : ""}`);
}
console.log(`Variant prose repetition: ${repeated.length} paragraphs of 45+ words repeated across chapters.`);
if (repeated.length) process.exitCode = 1;
