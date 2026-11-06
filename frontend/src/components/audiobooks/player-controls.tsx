"use client";

import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlayerStatus } from "./audiobook-player";

export const focusRing = "outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow";

/** The round arrow with the number of seconds inside, as on the skip buttons of audio apps. */
export function SkipIcon({ seconds, direction, className }: { seconds: number; direction: "back" | "forward"; className?: string }) {
  const back = direction === "back";
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <g transform={back ? undefined : "translate(32 0) scale(-1 1)"}>
        <path d="M9.2 8.6A11 11 0 1 1 5.4 19" />
        <path d="M9.6 3.6v5.4H4.2" />
      </g>
      <text x="16" y="20.4" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="currentColor" stroke="none" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {seconds}
      </text>
    </svg>
  );
}

export function PlayPauseIcon({ status, className }: { status: PlayerStatus; className?: string }) {
  if (status === "loading") {
    return <span aria-hidden className={cn("block size-6 animate-spin rounded-full border-[3px] border-current border-r-transparent", className)} />;
  }
  return status === "playing" ? <Pause aria-hidden className={cn("size-6 fill-current", className)} /> : <Play aria-hidden className={cn("size-6 translate-x-px fill-current", className)} />;
}

export function playLabel(status: PlayerStatus): string {
  return status === "playing" ? "Pause" : status === "loading" ? "Loading, press to pause" : "Play";
}
