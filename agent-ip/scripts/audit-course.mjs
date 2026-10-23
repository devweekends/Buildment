#!/usr/bin/env node
/**
 * Course audit — prose depth, component density, interactions, diagrams.
 *
 * Usage:
 *   node agent-ip/scripts/audit-course.mjs courses/ticketline
 *   node agent-ip/scripts/audit-course.mjs courses/ticketline --json
 *
 * Exit code 1 when any chapter fails a threshold.
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const target = args.find((arg) => !arg.startsWith("--")) ?? "courses/ticketline";
const asJson = args.includes("--json");

const CHILD_COMPONENTS = new Set([
  "ArchNode",
  "FileTreeItem",
  "TerminalLine",
  "CompareColumn",
  "FaqItem",
  "Step",
  "TraceStep",
  "ApiRequest",
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function frontmatterValue(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match?.[1]?.trim().replace(/^["']|["']$/g, "") ?? "";
}

function stripCode(body) {
  return body.replace(/```[\s\S]*?```/g, "");
}

function paragraphs(body) {
  return stripCode(body)
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter((block) => {
      if (!block) return false;
      if (block.startsWith("#")) return false;
      if (block.startsWith("|")) return false;
      if (block.startsWith("<")) return false;
      if (block.startsWith(">")) return false;
      if (/^- /.test(block)) return false;
      if (/^\d+\.\s/.test(block)) return false;
      if (/^---+$/.test(block)) return false;
      return true;
    });
}

const files = walk(target)
  .filter((file) => file.endsWith(".md") && !file.endsWith("README.md"))
  .sort();

const rows = [];

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
  const stepType = frontmatterValue(raw, "stepType");
  const isGate = /check|gate|wrap/i.test(stepType);
  const paras = paragraphs(body);
  const proseWords = paras.join(" ").split(/\s+/).filter(Boolean).length;

  const proseBody = stripCode(body);
  const tags = proseBody.match(/<[A-Z][A-Za-z0-9]*/g) ?? [];
  const unique = [...new Set(tags.map((tag) => tag.slice(1)))];
  const topLevel = unique.filter((name) => !CHILD_COMPONENTS.has(name));
  const interactions =
    (body.match(/^```quiz$/gm) ?? []).length +
    (body.match(/^```predict$/gm) ?? []).length +
    (body.match(/^```openquestion$/gm) ?? []).length;
  // A dedicated quiz chapter may contain three to five questions; the docs
  // treat that set as one assessment instrument, not as N interactions.
  const interactionLimit = /-quiz\.md$/.test(file) ? 5 : 3;
  const diagrams =
    (proseBody.match(/<ArchitectureDiagram\b/g) ?? []).length +
    (proseBody.match(/<EntityDiagram\b/g) ?? []).length +
    (proseBody.match(/<StateMachine\b/g) ?? []).length +
    (proseBody.match(/<MermaidDiagram\b/g) ?? []).length +
    (proseBody.match(/<TraceRequest\b/g) ?? []).length +
    (body.match(/^```diagram$/gm) ?? []).length +
    // The importer turns a ```mermaid fence into a MermaidDiagram (remark-mermaid).
    (body.match(/^```mermaid$/gm) ?? []).length;
  const canvases = (proseBody.match(/<InteractiveCanvas\b/g) ?? []).length;
  const bullets = (proseBody.match(/^\s*[-*]\s+/gm) ?? []).length;

  const minProse = isGate ? 700 : 1200;
  // A quiz chapter holds activities only (04-interactive-playbook.md), so it has no prose minimum.
  const isQuizChapter = /-quiz\.md$/.test(file);
  const flags = [];
  if (!isQuizChapter && proseWords < minProse) flags.push(`prose ${proseWords}<${minProse}`);
  if (topLevel.length > 6) flags.push(`components ${topLevel.length}>6`);
  if (tags.length > 25) flags.push(`tags ${tags.length}>25`);
  if (interactions > interactionLimit) flags.push(`interactions ${interactions}>${interactionLimit}`);
  if (canvases > 1) flags.push(`canvases ${canvases}>1`);
  if (canvases > 0 && isGate) flags.push("canvas in gate");
  if (!isGate && diagrams < 1) flags.push("no diagram");
  if (bullets > Math.max(12, paras.length) && bullets > paras.length * 1.5) {
    flags.push("list-heavy");
  }

  rows.push({
    chapter: path.basename(file),
    stepType: stepType || "?",
    proseWords,
    paragraphs: paras.length,
    topLevelComponents: topLevel.length,
    totalTags: tags.length,
    interactions,
    diagrams,
    bullets,
    flags,
  });
}

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  console.log(
    "chapter".padEnd(52),
    "type".padEnd(6),
    "prose",
    "para",
    "comp",
    "tags",
    "int",
    "diag",
    "bul",
    "flags"
  );
  for (const row of rows) {
    console.log(
      row.chapter.padEnd(52),
      row.stepType.padEnd(6),
      String(row.proseWords).padStart(5),
      String(row.paragraphs).padStart(4),
      String(row.topLevelComponents).padStart(4),
      String(row.totalTags).padStart(4),
      String(row.interactions).padStart(3),
      String(row.diagrams).padStart(4),
      String(row.bullets).padStart(3),
      row.flags.join(", ")
    );
  }
}

const failed = rows.filter((row) => row.flags.length > 0);
const totalProse = rows.reduce((sum, row) => sum + row.proseWords, 0);
console.log(`\nChapters: ${rows.length}`);
console.log(`Prose words: ${totalProse}`);
console.log(`Needs work: ${failed.length}`);

if (failed.length > 0) process.exitCode = 1;
