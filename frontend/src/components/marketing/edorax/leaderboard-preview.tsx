"use client";

import { useState } from "react";
import { Dot } from "./dot";
import s from "./edorax-landing.module.css";

const OPTIONS = ["My cohort", "Just me vs last week", "Nothing"] as const;
const COHORT = [
  { name: "Amal", xp: 480 },
  { name: "Yusuf", xp: 455 },
  { name: "You", xp: 410 },
  { name: "Layla", xp: 380 },
];
const WEEKS = [220, 300, 260, 360, 340, 410];

// The landing's leaderboard preference. Each choice changes the panel below it.
export function LeaderboardPreview() {
  const [picked, setPicked] = useState(1);

  return (
    <>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 700 }}>Show me</div>
        <div role="group" aria-label="Leaderboard setting" style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {OPTIONS.map((label, i) => {
            const on = i === picked;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked(i)}
                style={{
                  minHeight: "44px", padding: "0 18px", fontSize: "15px", fontWeight: 700, transition: "background 150ms, color 150ms, border-color 150ms",
                  background: on ? "#2434E0" : "#FFFFFF", color: on ? "#F6F7FB" : "#0A0F2C", border: `2px solid ${on ? "#2434E0" : "#DCE0F2"}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div key={picked} className={s.fadeIn} style={{ minHeight: "176px" }} aria-live="polite">
        {picked === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {COHORT.map((r, i) => {
              const you = r.name === "You";
              return (
                <div key={r.name} className={s.fadeIn} style={{ animationDelay: `${i * 60}ms`, display: "flex", alignItems: "center", gap: "10px", height: "38px", padding: "0 10px", background: you ? "#E8EBFF" : "transparent" }}>
                  <span style={{ width: "16px", fontSize: "13px", fontWeight: 700, color: "#46507A" }}>{i + 1}</span>
                  <span style={{ width: "56px", fontSize: "14px", fontWeight: you ? 700 : 400 }}>{r.name}</span>
                  <div style={{ flex: 1, height: "8px", background: "#DCE0F2" }}>
                    <div className={s.growX} style={{ width: `${Math.round((r.xp / 480) * 100)}%`, height: "8px", background: you ? "#FFC933" : "#2434E0" }} />
                  </div>
                  <span style={{ width: "54px", textAlign: "right", fontSize: "13px", color: "#46507A" }}>{r.xp} XP</span>
                </div>
              );
            })}
          </div>
        )}

        {picked === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#46507A" }}>
              <span>Your last six weeks</span>
              <span><b style={{ color: "#2434E0" }}>+70 XP</b> on last week</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", height: "120px" }}>
              {WEEKS.map((w, i) => {
                const now = i === WEEKS.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: "4px", height: "120px" }}>
                    <div className={s.grow} style={{ animationDelay: `${i * 60}ms`, width: "100%", height: `${Math.round((w / 420) * 96)}px`, borderRadius: "6px", background: now ? "#2434E0" : "#DCE0F2" }} />
                    <span style={{ fontSize: "11px", color: "#46507A" }}>{now ? "Now" : `W${i + 1}`}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {picked === 2 && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px", minHeight: "176px" }}>
            <Dot mood="sleep" size={88} />
            <div style={{ fontSize: "15px", lineHeight: 1.5, color: "#46507A" }}>
              <b style={{ color: "#0A0F2C" }}>Leaderboards are off.</b> Your progress still saves, just for you.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
