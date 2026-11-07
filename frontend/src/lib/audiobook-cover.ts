// Book covers for the Audiobooks area, drawn from the course itself: title, author and category on
// one of the Edorax brand colours, with a plain shape picked from the course slug. One SVG string is
// used on the page and, turned into a PNG, as lock-screen artwork. No images to download.

const INK = "#0A0F2C";
const PAPER = "#F6F7FB";
const COBALT = "#2434E0";
const YELLOW = "#FFC933";
const PERIWINKLE = "#7A8BFF";

type Palette = { bg: string; text: string; accent: string; second: string };

const PALETTES: readonly Palette[] = [
  { bg: COBALT, text: PAPER, accent: YELLOW, second: PAPER },
  { bg: INK, text: PAPER, accent: PERIWINKLE, second: YELLOW },
  { bg: YELLOW, text: INK, accent: INK, second: COBALT },
  { bg: "#E8EBFF", text: INK, accent: COBALT, second: YELLOW },
  { bg: PERIWINKLE, text: INK, accent: INK, second: PAPER },
  { bg: "#46507A", text: PAPER, accent: YELLOW, second: PERIWINKLE },
];

const MOTIF_COUNT = 6;

function hash(text: string): number {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) value = Math.imul(value ^ text.charCodeAt(i), 16777619) >>> 0;
  return value;
}

export function coverPalette(slug: string): Palette {
  return PALETTES[hash(slug) % PALETTES.length]!;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wrap(text: string, perLine: number): string[] {
  const lines: string[] = [];
  for (const word of text.trim().split(/\s+/).filter(Boolean)) {
    const current = lines[lines.length - 1];
    if (current !== undefined && current.length + 1 + word.length <= perLine) lines[lines.length - 1] = `${current} ${word}`;
    else lines.push(word);
  }
  return lines;
}

/** "Networking, Hands On: How Your Devices..." is a title and a subtitle, as on a printed cover. */
export function splitTitle(title: string): { main: string; subtitle: string | null } {
  const at = title.indexOf(": ");
  if (at <= 0) return { main: title.trim(), subtitle: null };
  return { main: title.slice(0, at).trim(), subtitle: title.slice(at + 2).trim() || null };
}

/**
 * Greedy word wrap for the main title. Sizes are in cover units (the cover is 200 wide); Unbounded runs
 * wide, so a character is taken as 0.64 of the font size. Picks the largest size that fits in four lines
 * and in `height` (less room when a subtitle follows).
 */
export function layoutTitle(title: string, width = 150, height = 100): { size: number; lines: string[] } {
  const words = title.trim().split(/\s+/).filter(Boolean);
  for (const size of [27, 24, 21, 18, 16, 14]) {
    const perLine = Math.floor(width / (size * 0.64));
    if (words.some((word) => word.length > perLine)) continue;
    const lines = wrap(title, perLine);
    if (lines.length <= 4 && size + (lines.length - 1) * size * 1.12 <= height) return { size, lines };
  }
  const lines = wrap(title, Math.floor(width / (12 * 0.64)));
  return { size: 12, lines: lines.length > 5 ? [...lines.slice(0, 4), `${lines[4]}...`] : lines };
}

function motif(index: number, seed: number, p: Palette): string {
  switch (index) {
    case 0: {
      // A sound wave: bar heights come from the slug, so every book has its own.
      const bars = Array.from({ length: 13 }, (_, i) => {
        const h = 10 + (((seed >>> (i % 24)) ^ (i * 2654435761)) >>> 0) % 50;
        return `<rect x="${28 + i * 11}" y="${226 - h / 2}" width="6" height="${h}" fill="${i % 4 === 2 ? p.second : p.accent}"/>`;
      });
      return bars.join("");
    }
    case 1:
      return `<circle cx="140" cy="214" r="38" fill="none" stroke="${p.accent}" stroke-width="12"/><circle cx="140" cy="214" r="12" fill="${p.second}"/>`;
    case 2:
      return `<rect x="96" y="178" width="52" height="52" fill="${p.accent}"/><rect x="124" y="206" width="48" height="48" fill="${p.second}"/>`;
    case 3:
      return `<rect x="28" y="236" width="24" height="22" fill="${p.accent}"/><rect x="60" y="214" width="24" height="44" fill="${p.accent}"/><rect x="92" y="190" width="24" height="68" fill="${p.second}"/>`;
    case 4:
      return `<path d="M172 258 V186 A72 72 0 0 0 100 258 Z" fill="${p.accent}"/><circle cx="64" cy="236" r="12" fill="${p.second}"/>`;
    default:
      return `<circle cx="44" cy="232" r="14" fill="${p.accent}"/><circle cx="84" cy="232" r="14" fill="${p.second}"/><circle cx="124" cy="232" r="14" fill="${p.accent}"/>`;
  }
}

export type CoverInput = { slug: string; title: string; author: string; label: string };

/** The cover as a standalone SVG document, 200 by 300. */
export function coverSvg({ slug, title, author, label }: CoverInput, options: { fonts?: { heading: string; body: string } } = {}): string {
  const p = coverPalette(slug);
  const seed = hash(slug);
  const heading = options.fonts?.heading ?? "Unbounded, 'Arial Black', sans-serif";
  const body = options.fonts?.body ?? "'DM Sans', Arial, sans-serif";
  // About 20 capitals fit across at 9.5; a longer label shrinks to fit rather than run off the edge.
  const labelSize = Math.max(6, Math.min(9.5, (9.5 * 20) / Math.max(1, label.length)));
  const { main, subtitle } = splitTitle(title);
  const { size, lines } = layoutTitle(main, 150, subtitle ? 62 : 100);
  const lineHeight = size * 1.12;
  const titleText = lines
    .map((line, i) => `<tspan x="30" y="${(66 + size + i * lineHeight).toFixed(1)}">${escapeXml(line)}</tspan>`)
    .join("");
  const subtitleTop = 66 + size + (lines.length - 1) * lineHeight + 20;
  const subtitleLines = subtitle ? wrap(subtitle, 26).slice(0, subtitleTop > 135 ? 2 : 3) : [];
  const subtitleText = subtitleLines
    .map((line, i) => `<tspan x="30" y="${(subtitleTop + i * 13.5).toFixed(1)}">${escapeXml(line)}</tspan>`)
    .join("");
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">`,
    `<rect width="200" height="300" fill="${p.bg}"/>`,
    // The spine: a darker band and a crease, as on a printed paperback.
    `<rect width="12" height="300" fill="#000" fill-opacity="0.18"/><rect x="12" width="1.5" height="300" fill="#fff" fill-opacity="0.22"/>`,
    `<text x="30" y="40" style="font-family:${body}" font-size="${labelSize.toFixed(2)}" font-weight="700" letter-spacing="${(labelSize / 6).toFixed(2)}" fill="${p.text}" fill-opacity="0.8">${escapeXml(label.toUpperCase())}</text>`,
    `<rect x="30" y="50" width="24" height="3" fill="${p.accent}"/>`,
    `<text style="font-family:${heading}" font-weight="700" font-size="${size}" fill="${p.text}">${titleText}</text>`,
    subtitleText ? `<text style="font-family:${body}" font-size="11" font-weight="500" fill="${p.text}" fill-opacity="0.85">${subtitleText}</text>` : "",
    motif(Math.floor(seed / PALETTES.length) % MOTIF_COUNT, seed, p),
    `<text x="30" y="283" style="font-family:${body}" font-size="10.5" font-weight="700" letter-spacing="0.4" fill="${p.text}">${escapeXml(author)}</text>`,
    `<text x="182" y="283" text-anchor="end" style="font-family:${body}" font-size="8" font-weight="700" letter-spacing="1.2" fill="${p.text}" fill-opacity="0.7">EDORAX</text>`,
    `</svg>`,
  ].join("");
}
