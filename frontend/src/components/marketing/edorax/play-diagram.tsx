"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import s from "./edorax-landing.module.css";

const MIN = 46;
const MAX = 226;
const START = 78;

const STEPS = [
  { until: 100, text: "Your phone has a name, edorax.com, but not an address." },
  { until: 190, text: "DNS looks up the address for that name." },
  { until: Infinity, text: "With the address, your phone reaches the server." },
];

const BODY = "var(--font-dm-sans), sans-serif";

// The landing's "Play" sample: drag the packet from your phone to the server.
export function PlayDiagram() {
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const [x, setX] = useState(START);
  const [moved, setMoved] = useState(false);
  const step = STEPS.findIndex(st => x < st.until);

  // One gentle nudge so people see the packet moves; skipped for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const begin = performance.now() + 900;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = (now - begin) / 1400;
      if (t >= 0) setX(START + Math.sin(Math.min(t, 1) * Math.PI) * 50);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function toSvgX(clientX: number) {
    const el = svg.current;
    const m = el?.getScreenCTM();
    if (!el || !m) return x;
    const p = el.createSVGPoint();
    p.x = clientX;
    return p.matrixTransform(m.inverse()).x;
  }

  function move(clientX: number) {
    setX(Math.max(MIN, Math.min(MAX, toSvgX(clientX))));
  }

  function onDown(e: PointerEvent<SVGSVGElement>) {
    touched.current = true;
    setMoved(true);
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  }

  function onKey(e: KeyboardEvent<SVGCircleElement>) {
    const d = e.key === "ArrowRight" ? 20 : e.key === "ArrowLeft" ? -20 : 0;
    if (!d) return;
    e.preventDefault();
    touched.current = true;
    setMoved(true);
    setX(v => Math.max(MIN, Math.min(MAX, v + d)));
  }

  const active = (i: number) => step === i;
  return (
    <>
      <svg
        ref={svg}
        viewBox="0 0 260 90"
        width="100%"
        style={{ display: "block", touchAction: "none", cursor: "grab" }}
        onPointerDown={onDown}
        onPointerMove={e => dragging.current && move(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
      >
        <path d="M46 45 H110 M170 45 H196" stroke="#0A0F2C" strokeWidth="3" />
        <circle cx="28" cy="45" r="22" fill="#2434E0" stroke={active(0) ? "#FFC933" : "none"} strokeWidth="4" />
        <text x="28" y="50" textAnchor="middle" fontWeight="700" fontSize="12" fill="#F6F7FB" style={{ fontFamily: BODY }}>You</text>
        <rect x="110" y="24" width="60" height="42" fill={active(1) ? "#FFF6D6" : "#FFFFFF"} stroke="#0A0F2C" strokeWidth="3" />
        <text x="140" y="50" textAnchor="middle" fontWeight="700" fontSize="12" fill="#0A0F2C" style={{ fontFamily: BODY }}>DNS</text>
        <rect x="196" y="24" width="60" height="42" fill="#0A0F2C" stroke={active(2) ? "#FFC933" : "#0A0F2C"} strokeWidth="4" />
        <text x="226" y="50" textAnchor="middle" fontWeight="700" fontSize="12" fill="#F6F7FB" style={{ fontFamily: BODY }}>Server</text>
        <circle
          className={s.packet}
          cx={x}
          cy="45"
          r="9"
          fill="#FFC933"
          stroke="#0A0F2C"
          strokeWidth="2"
          tabIndex={0}
          role="slider"
          aria-label="Packet position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(((x - MIN) / (MAX - MIN)) * 100)}
          aria-valuetext={STEPS[step].text}
          onKeyDown={onKey}
        />
      </svg>
      <div aria-live="polite" style={{ fontSize: "13px", lineHeight: 1.4, color: "#46507A", minHeight: "36px" }}>
        {moved ? STEPS[step].text : "Drag the yellow packet and watch where it goes."}
      </div>
    </>
  );
}
