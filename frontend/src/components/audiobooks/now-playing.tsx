"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ListOrdered, Moon, SkipBack, SkipForward } from "lucide-react";
import { useAudiobookStore } from "@/lib/audiobook-progress";
import {
  AUDIOBOOK_SPEEDS,
  SKIP_BACK_SECONDS,
  SKIP_FORWARD_SECONDS,
  SLEEP_CHOICES,
  formatBookLength,
  formatPlayerClock,
  trackLabel,
} from "@/lib/audiobooks";
import { cn } from "@/lib/utils";
import { useAudiobookPlayer } from "./audiobook-player";
import { BookCover } from "./book-cover";
import { PlayPauseIcon, SkipIcon, focusRing, playLabel } from "./player-controls";

function sleepLabel(sleep: number | "end" | null): string {
  if (sleep === null) return "Sleep timer";
  if (sleep === "end") return "Stops at chapter end";
  return `Stops in ${formatPlayerClock(sleep)}`;
}

/** The full player: cover, chapter, scrubber, skips, speed, sleep timer and the chapter list. */
export function NowPlaying() {
  const player = useAudiobookPlayer();
  const store = useAudiobookStore();
  const { book, index, status, time, duration, speed, sleep } = player;
  const [showChapters, setShowChapters] = useState(false);
  const collapse = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const openedAt = useRef(0);
  const track = book?.tracks[index];

  // Focus moves into the dialog, Escape closes it, and focus goes back where it was.
  useEffect(() => {
    openedAt.current = performance.now();
    const before = document.activeElement as HTMLElement | null;
    collapse.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") player.setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      before?.focus?.();
    };
    // Runs once per opening; setExpanded is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showChapters) list.current?.querySelector<HTMLElement>("[aria-current='true']")?.scrollIntoView({ block: "center" });
  }, [showChapters]);

  if (!book || !track) return null;
  const state = store.books[book.slug];
  const left = Math.max(0, duration - time);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing: ${track.title}`}
      onClickCapture={(event) => {
        // The tap that opened the player must not also land on whatever now sits under the finger.
        if (performance.now() - openedAt.current < 400) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      className="fixed inset-0 z-50 flex justify-center bg-foreground/40 sm:items-center sm:p-6">
      <div className="flex h-dvh w-full flex-col overflow-y-auto bg-background text-foreground sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:max-w-md sm:rounded-lg sm:border sm:border-border sm:shadow-2xl">
        <header className="flex items-center justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2">
          <button
            ref={collapse}
            type="button"
            onClick={() => player.setExpanded(false)}
            aria-label="Close the full player"
            className={cn("grid size-11 place-items-center rounded-full hover:bg-muted", focusRing)}
          >
            <ChevronDown aria-hidden className="size-6" />
          </button>
          <Link
            href={`/audiobooks/${book.slug}`}
            onClick={() => player.setExpanded(false)}
            className={cn("min-w-0 truncate rounded-sm px-2 text-center text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground", focusRing)}
          >
            {book.title}
          </Link>
          <button
            type="button"
            onClick={() => setShowChapters((open) => !open)}
            aria-pressed={showChapters}
            aria-label="Chapters"
            className={cn("grid size-11 place-items-center rounded-full hover:bg-muted", showChapters && "bg-secondary text-primary", focusRing)}
          >
            <ListOrdered aria-hidden className="size-6" />
          </button>
        </header>

        {showChapters ? (
          <ol ref={list} className="min-h-0 flex-1 overflow-y-auto px-3 pb-3" aria-label={`Chapters of ${book.title}`}>
            {book.tracks.map((item, i) => {
              const saved = state?.tracks[item.slug];
              const current = i === index;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    aria-current={current ? "true" : undefined}
                    onClick={() => {
                      player.play(book, i);
                      setShowChapters(false);
                    }}
                    className={cn(
                      "flex min-h-12 w-full items-center gap-3 rounded-md px-3 text-left hover:bg-muted",
                      current && "bg-secondary text-primary",
                      focusRing,
                    )}
                  >
                    <span className="w-10 shrink-0 text-sm tabular-nums text-muted-foreground">
                      {item.part}.{item.chapter}
                    </span>
                    <span className={cn("min-w-0 flex-1 truncate text-[15px]", current && "font-bold")}>{item.title}</span>
                    {saved?.done ? <Check aria-label="Finished" className="size-4 shrink-0 text-emerald-600" /> : null}
                    <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{formatBookLength(item.minutes)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="flex flex-1 flex-col items-center px-6 pb-2">
            <div className="mt-2 w-[min(15rem,58vw)] sm:w-56">
              <BookCover book={book} />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-primary">{trackLabel(track)}</p>
            <h2 className="mt-1 text-center text-2xl leading-tight tracking-[-0.02em]">{track.title}</h2>
            <p className="mt-1 text-center text-base text-muted-foreground">{book.author}</p>
          </div>
        )}

        <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={1}
            value={Math.min(time, duration || 1)}
            disabled={!duration}
            onChange={(event) => player.seek(Number(event.target.value))}
            aria-label="Position in this chapter"
            aria-valuetext={`${formatPlayerClock(time)} of ${formatPlayerClock(duration)}`}
            className="h-6 w-full cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm tabular-nums text-muted-foreground">
            <span>{formatPlayerClock(time)}</span>
            <span aria-live="off">{status === "error" ? "Did not load" : `-${formatPlayerClock(left)}`}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button type="button" onClick={player.previous} aria-label="Previous chapter" className={cn("grid size-12 place-items-center rounded-full hover:bg-muted", focusRing)}>
              <SkipBack aria-hidden className="size-6 fill-current" />
            </button>
            <button
              type="button"
              onClick={() => player.skip(-SKIP_BACK_SECONDS)}
              aria-label={`Back ${SKIP_BACK_SECONDS} seconds`}
              className={cn("grid size-14 place-items-center rounded-full hover:bg-muted", focusRing)}
            >
              <SkipIcon seconds={SKIP_BACK_SECONDS} direction="back" className="size-9" />
            </button>
            <button
              type="button"
              onClick={player.toggle}
              aria-label={playLabel(status)}
              className={cn("grid size-[4.5rem] place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90", focusRing)}
            >
              <PlayPauseIcon status={status} className="size-8" />
            </button>
            <button
              type="button"
              onClick={() => player.skip(SKIP_FORWARD_SECONDS)}
              aria-label={`Forward ${SKIP_FORWARD_SECONDS} seconds`}
              className={cn("grid size-14 place-items-center rounded-full hover:bg-muted", focusRing)}
            >
              <SkipIcon seconds={SKIP_FORWARD_SECONDS} direction="forward" className="size-9" />
            </button>
            <button
              type="button"
              onClick={player.next}
              disabled={index + 1 >= book.tracks.length}
              aria-label="Next chapter"
              className={cn("grid size-12 place-items-center rounded-full hover:bg-muted disabled:opacity-35", focusRing)}
            >
              <SkipForward aria-hidden className="size-6 fill-current" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="relative">
              <span className="sr-only">Playback speed</span>
              <select
                value={speed}
                onChange={(event) => player.setSpeed(Number(event.target.value))}
                className={cn("min-h-11 w-full cursor-pointer appearance-none rounded-md border-2 border-input bg-card px-3 text-center text-[15px] font-bold tabular-nums hover:border-primary", focusRing)}
              >
                {(AUDIOBOOK_SPEEDS.includes(speed) ? AUDIOBOOK_SPEEDS : [...AUDIOBOOK_SPEEDS, speed].sort((a, b) => a - b)).map((option) => (
                  <option key={option} value={option}>
                    {option}x speed
                  </option>
                ))}
              </select>
            </label>
            <label className="relative">
              <span className="sr-only">Sleep timer</span>
              <Moon aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={sleep === null ? "off" : sleep === "end" ? "end" : "on"}
                onChange={(event) => {
                  const value = event.target.value;
                  player.setSleep(value === "off" ? null : value === "end" ? "end" : Number(value));
                }}
                className={cn(
                  "min-h-11 w-full cursor-pointer appearance-none rounded-md border-2 border-input bg-card pl-8 pr-3 text-center text-[15px] font-bold tabular-nums hover:border-primary",
                  sleep !== null && "border-primary text-primary",
                  focusRing,
                )}
              >
                {sleep !== null && sleep !== "end" ? <option value="on">{sleepLabel(sleep)}</option> : null}
                <option value="off">{sleep === null ? "Sleep timer" : "Turn off"}</option>
                {SLEEP_CHOICES.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice === "end" ? (sleep === "end" ? sleepLabel("end") : "End of chapter") : `${choice} minutes`}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <Link
              href={`/courses/${book.slug}/${track.slug}`}
              onClick={() => player.setExpanded(false)}
              className={cn("rounded-sm font-bold text-primary underline-offset-4 hover:underline", focusRing)}
            >
              Read this chapter
            </Link>
            <button type="button" onClick={player.close} className={cn("rounded-sm font-bold text-muted-foreground hover:text-foreground", focusRing)}>
              Stop and close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
