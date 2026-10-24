#!/usr/bin/env node
/**
 * Course audit: prose depth, component density, interactions, diagrams,
 * and the interactive-first rule (every Learn chapter has an interactive element).
 *
 * Usage:
 *   node agent-ip/scripts/audit-course.mjs <course-folder>
 *   node agent-ip/scripts/audit-course.mjs <course-folder> --json
 *
 * Exit code 1 when any chapter fails a threshold.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const target = args.find((arg) => !arg.startsWith("--"));
if (!target) {
  console.error("Usage: node agent-ip/scripts/audit-course.mjs <course-folder> [--json]");
  process.exit(2);
}
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

// Canvas specs live in this script's repository: frontend/src/canvas/<slug>/data.ts.
const CANVAS_DIR = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../packages/learning-ui/src/canvas");

/** A scene only plays; anything else (a custom canvas, a renderer with controls) can be changed by the learner. */
function isPlayable(slug) {
  const data = path.join(CANVAS_DIR, slug, "data.ts");
  if (!fs.existsSync(data)) return null;
  return !/kind:\s*"scene"/.test(fs.readFileSync(data, "utf8"));
}

const VISUAL_TAG = /^<(InteractiveCanvas|MermaidDiagram|StateMachine|TraceRequest|EntityDiagram|ArchitectureDiagram|VisualDiagram)\b/;
const words = (text) => text.split(/\s+/).filter(Boolean).length;

/**
 * Splits a beats chapter into its beats (## sections). Text inside <GoDeeper>
 * folds counts as depth, not as visible text; fences (code, predict, quiz)
 * count as neither. A section left with no text and no visual once fences
 * are removed (for example the closing quick check) is not a beat.
 */
function auditBeats(body) {
  const folds = [];
  const visible = body.replace(/<GoDeeper\b[^>]*>([\s\S]*?)<\/GoDeeper>/g, (_, inner) => {
    folds.push(inner);
    return "";
  });
  const foldWords = folds.reduce((sum, inner) => sum + words(paragraphs(inner).join(" ")), 0);
  const sections = stripCode(visible).split(/^## /m);
  const intro = sections.shift() ?? "";
  const beats = [];
  let visibleWords = words(paragraphs(intro).join(" "));
  for (const section of sections) {
    const [headingLine, ...rest] = section.split("\n");
    const content = rest.join("\n");
    const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
    const sectionWords = words(paragraphs(content).join(" "));
    visibleWords += sectionWords;
    if (blocks.length === 0) continue;
    const heading = headingLine.trim();
    beats.push({ heading, headingWords: words(heading), visualFirst: VISUAL_TAG.test(blocks[0]), words: sectionWords });
  }
  return { beats, visibleWords, foldWords };
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
  // Interactive-first (IP v0.4): every Learn chapter needs something the
  // learner manipulates or steps through and sees change.
  const interactives =
    canvases +
    (proseBody.match(/<(StateMachine|TraceRequest|VisualWalkthrough)\b/g) ?? []).length;
  const isLearn = /^learn$/i.test(stepType);
  const bullets = (proseBody.match(/^\s*[-*]\s+/gm) ?? []).length;

  const flags = [];
  const beatsFormat = /^beats$/i.test(frontmatterValue(raw, "format"));
  let beatInfo = null;
  if (beatsFormat) {
    // Visual-first (IP v0.5): see agent-ip/03-authoring-standards.md.
    beatInfo = auditBeats(body);
    const isRead = /^read$/i.test(stepType);
    const [minBeats, maxBeats] = isRead ? [1, 2] : [4, 8];
    if (beatInfo.beats.length < minBeats || beatInfo.beats.length > maxBeats) flags.push(`beats ${beatInfo.beats.length} not ${minBeats}-${maxBeats}`);
    for (const beat of beatInfo.beats) {
      if (!beat.visualFirst) flags.push(`beat "${beat.heading}" does not open with a visual`);
      if (beat.words > 70) flags.push(`beat "${beat.heading}" ${beat.words}>70 words`);
      if (beat.headingWords > 8) flags.push(`beat heading "${beat.heading}" >8 words`);
    }
    if (!isRead && (beatInfo.visibleWords < 300 || beatInfo.visibleWords > 700)) flags.push(`visible ${beatInfo.visibleWords} not 300-700`);
    if (!isRead && beatInfo.visibleWords + beatInfo.foldWords < 900) flags.push(`depth ${beatInfo.visibleWords + beatInfo.foldWords}<900`);
    if (tags.length > 40) flags.push(`tags ${tags.length}>40`);
    if (/<BigWordAlert\b/.test(proseBody)) flags.push("BigWordAlert in a beats chapter");
    // Every Learn chapter needs at least one beat the learner plays with (IP v0.5.1).
    if (!isRead && fs.existsSync(CANVAS_DIR)) {
      const slugs = [...proseBody.matchAll(/<InteractiveCanvas\s+slug="([^"]+)"/g)].map((m) => m[1]);
      const known = slugs.map(isPlayable).filter((p) => p !== null);
      if (known.length > 0 && !known.includes(true)) flags.push("no playable beat (only scenes)");
    }
  } else {
    // A quiz chapter holds quiz fences only (04-interactive-playbook.md), so it has no prose minimum.
    const isQuiz = /-quiz\.md$/.test(file);
    const minProse = isGate ? 700 : 1200;
    if (!isQuiz && proseWords < minProse) flags.push(`prose ${proseWords}<${minProse}`);
    if (topLevel.length > 6) flags.push(`components ${topLevel.length}>6`);
    if (tags.length > 25) flags.push(`tags ${tags.length}>25`);
    if (canvases > 1) flags.push(`canvases ${canvases}>1`);
    if (isLearn && interactives < 1) flags.push("no interactive");
    if (!isGate && diagrams < 1) flags.push("no diagram");
  }
  if (interactions > interactionLimit) flags.push(`interactions ${interactions}>${interactionLimit}`);
  if (canvases > 0 && isGate) flags.push("canvas in gate");
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
    interactives,
    beats: beatInfo ? beatInfo.beats.length : null,
    visibleWords: beatInfo ? beatInfo.visibleWords : null,
    foldWords: beatInfo ? beatInfo.foldWords : null,
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
