"use client";

import { useRef, useState } from "react";

const WORDS = "The server replies with an address your phone can use.".split(" ");
const SPEEDS = [1, 1.5, 2];
const IDLE_WORD = 5; // "address", highlighted before anyone presses play

// The landing's "Listen" sample: a real narration clip with the spoken word highlighted.
export function ListenSample() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);

  const word = playing || progress > 0 ? Math.min(WORDS.length - 1, Math.floor(progress * WORDS.length)) : IDLE_WORD;

  function toggle() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      if (a.ended || progress >= 1) a.currentTime = 0;
      a.playbackRate = SPEEDS[speed];
      void a.play();
    } else {
      a.pause();
    }
  }

  function nextSpeed() {
    const i = (speed + 1) % SPEEDS.length;
    setSpeed(i);
    if (audio.current) audio.current.playbackRate = SPEEDS[i];
  }

  return (
    <>
      <div style={{ fontSize: "15px", lineHeight: 1.5 }}>
        {WORDS.map((w, i) => (
          <span key={i} style={{ background: i === word ? "#FFC933" : "transparent", padding: "0 2px", transition: "background 120ms" }}>{w} </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause sample" : "Play sample"}
          style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2434E0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            {playing ? (
              <>
                <rect x="6" y="5" width="4.5" height="14" fill="#F6F7FB" />
                <rect x="13.5" y="5" width="4.5" height="14" fill="#F6F7FB" />
              </>
            ) : (
              <path d="M8 5v14l11-7z" fill="#F6F7FB" />
            )}
          </svg>
        </button>
        <div style={{ flex: 1, height: "6px", borderRadius: "3px", background: "#FFFFFF" }}>
          <div style={{ width: `${Math.round(progress * 100)}%`, height: "6px", borderRadius: "3px", background: "#2434E0", transition: "width 200ms linear" }} />
        </div>
        <button
          type="button"
          onClick={nextSpeed}
          aria-label={`Playback speed ${SPEEDS[speed]}x`}
          style={{ minWidth: "44px", minHeight: "44px", padding: "0 6px", background: "transparent", border: "none", fontSize: "13px", fontWeight: 700, color: "#0A0F2C" }}
        >
          {SPEEDS[speed]}x
        </button>
      </div>
      <audio
        ref={audio}
        src="/landing/listen-sample.mp3"
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(1); }}
        onTimeUpdate={e => {
          const a = e.currentTarget;
          if (a.duration) setProgress(a.currentTime / a.duration);
        }}
      />
    </>
  );
}
