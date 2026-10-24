// Canvas text QA (IP v0.5.2): paste into a page that shows canvases, for example
// /workspace/canvases at a 375px viewport, then call window.__collisions(svg) on
// each picture at every state worth seeing (each slider end and middle, after each
// button, and through one loop of an animation). Every call must return [].
// See agent-ip/10-interactive-canvases.md, QA checklist, Visual.
window.__collisions = (svg) => {
  const box = (el) => el.getBoundingClientRect();
  const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const contains = (o, i, pad = 0.5) => o.left <= i.left + pad && o.right >= i.right - pad && o.top <= i.top + pad && o.bottom >= i.bottom - pad;
  // Effective opacity: a label or shape fading in or out (under half visible) is in motion, not a collision.
  const alpha = (el) => { let a = 1; let e = el; while (e && e !== svg) { const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return 0; a *= Number(cs.opacity); e = e.parentElement; } return a; };
  const vis = (el) => alpha(el) >= 0.5;
  const all = [...svg.querySelectorAll("*")];
  const order = new Map(all.map((e, i) => [e, i]));
  const opaque = (s) => { const cs = getComputedStyle(s); return ["rect", "circle", "ellipse", "path", "polygon"].includes(s.tagName) && cs.fill !== "none" && cs.fill !== "transparent" && Number(cs.fillOpacity) >= 0.9 && alpha(s) >= 0.9; };
  const texts = all.filter((e) => e.tagName === "text" && e.textContent.trim() && vis(e));
  const shapes = all.filter((e) => ["rect", "circle", "ellipse", "path", "polygon", "polyline", "line"].includes(e.tagName) && vis(e) && !e.closest("defs,pattern,clipPath,mask"));
  const hidden = (x) => { const bx = box(x); return shapes.some((o) => order.get(o) > order.get(x) && opaque(o) && contains(box(o), bx)); };
  const sb = box(svg);
  const out = [];
  for (const t of texts) {
    const a = box(t);
    if (a.width < 1) continue;
    const area = a.width * a.height;
    const name = t.textContent.trim().slice(0, 30);
    // A label fully under an opaque card drawn later (a packet sliding into its receiver) is hidden, not colliding.
    if (shapes.some((o) => order.get(o) > order.get(t) && opaque(o) && contains(box(o), a))) continue;
    if (a.left < sb.left - 1 || a.right > sb.right + 1) out.push(`edge: "${name}"`);
    for (const u of texts) {
      if (u === t || hidden(u)) continue;
      const b = box(u);
      if (inter(a, b) <= Math.min(area, b.width * b.height) * 0.15 || order.get(u) < order.get(t)) continue;
      // The lower label is hidden where an opaque shape drawn between the two covers the overlap.
      const [lo, hi] = order.get(u) < order.get(t) ? [u, t] : [t, u];
      const cut = { left: Math.max(a.left, b.left), right: Math.min(a.right, b.right), top: Math.max(a.top, b.top), bottom: Math.min(a.bottom, b.bottom) };
      if (shapes.some((o) => order.get(o) > order.get(lo) && order.get(o) < order.get(hi) && opaque(o) && contains(box(o), cut))) continue;
      out.push(`text on text: "${name}" x "${u.textContent.trim().slice(0, 30)}"`);
    }
    const cx = a.left + 2, cy = a.top + a.height / 2;
    const cards = shapes.filter((s) => s.tagName === "rect").map((s) => [s, box(s)]).filter(([, b]) => b.width > a.height * 2 && b.height >= a.height * 0.9 && b.left <= cx && b.right >= cx && b.top <= cy && b.bottom >= cy && b.width * b.height < sb.width * sb.height * 0.6);
    // The card a label belongs to is the last box drawn before it that holds its start.
    const card = cards.filter(([s]) => order.get(s) < order.get(t)).sort((p, q) => order.get(q[0]) - order.get(p[0]))[0];
    if (card) { const b = card[1]; if (a.right > b.right + 1.5 || a.top < b.top - 1.5 || a.bottom > b.bottom + 1.5) out.push(`overflows its card: "${name}"`); }
    for (const s of shapes) {
      const b = box(s);
      if (b.width * b.height < 6 || contains(b, a)) continue;
      // A shape drawn before the label and hidden under an opaque card that holds the label cannot be seen.
      if (order.get(s) < order.get(t) && shapes.some((o) => order.get(o) > order.get(s) && order.get(o) < order.get(t) && opaque(o) && contains(box(o), a))) continue;
      if (inter(a, b) <= area * 0.12) continue;
      const cs = getComputedStyle(s);
      const filled = cs.fill !== "none" && cs.fill !== "transparent" && Number(cs.fillOpacity) > 0.25;
      const thin = s.tagName === "line" || ((s.tagName === "path" || s.tagName === "polyline") && !filled);
      if (thin && cs.stroke === "none") continue;
      if (!filled && !thin) continue;
      out.push(`${thin ? "line through" : "shape overlaps"} text: "${name}" (<${s.tagName}>)`);
    }
  }
  return [...new Set(out)];
};
window.__setSlider = async (s, target) => {
  const key = (k) => s.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true }));
  s.focus({ preventScroll: true });
  key("Home");
  await new Promise((r) => setTimeout(r, 50));
  for (let i = 0; i < 200; i++) {
    if (Number(s.getAttribute("aria-valuenow")) >= target) break;
    key("ArrowRight");
    await new Promise((r) => setTimeout(r, 10));
  }
  s.blur();
};
"collision helpers ready";

// Labels that move between two looks 80 ms apart (packets in flight). A collision
// that involves only moving labels is reported as "in motion", not as a failure.
window.__movingLabels = async (svg) => {
  const snap = () => new Map([...svg.querySelectorAll("text")].map((t) => { const b = t.getBoundingClientRect(); return [t, `${Math.round(b.left)},${Math.round(b.top)}`]; }));
  const a = snap();
  await new Promise((r) => setTimeout(r, 80));
  const b = snap();
  return new Set([...a].filter(([t, p]) => b.get(t) !== p).map(([t]) => t.textContent.trim().slice(0, 30)));
};
