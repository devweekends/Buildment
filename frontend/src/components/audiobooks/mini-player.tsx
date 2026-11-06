"use client";

import { X } from "lucide-react";
import { SKIP_BACK_SECONDS, SKIP_FORWARD_SECONDS, trackLabel } from "@/lib/audiobooks";
import { cn } from "@/lib/utils";
import { useAudiobookPlayer } from "./audiobook-player";
import { BookCover } from "./book-cover";
import { PlayPauseIcon, SkipIcon, focusRing, playLabel } from "./player-controls";

/**
 * The bar at the bottom of every page while a book is loaded. It sits above the phone tab bar and to
 * the right of the desktop sidebar (see the --audiobook-bar-* variables in globals.css). Tapping the
 * book opens the full player.
 */
export function MiniPlayer() {
  const player = useAudiobookPlayer();
  const { book, index, status, time, duration } = player;
  const track = book?.tracks[index];
  if (!book || !track) return null;
  const fraction = duration > 0 ? Math.min(1, time / duration) : 0;

  return (
    <section
      aria-label="Audiobook player"
      data-audiobook-bar=""
      className="fixed right-0 z-40 border-t border-border bg-card text-card-foreground shadow-[0_-4px_16px_-8px_rgb(10_15_44/0.25)]"
      style={{ bottom: "var(--audiobook-bar-bottom, 0px)", left: "var(--audiobook-bar-left, 0px)" }}
    >
      <div aria-hidden className="h-[3px] bg-muted">
        <div className="h-full bg-primary transition-[width] duration-500 ease-linear" style={{ width: `${fraction * 100}%` }} />
      </div>
      <div className="mx-auto flex h-[4.25rem] max-w-5xl items-center gap-2 px-3 sm:gap-3 sm:px-4" style={{ paddingBottom: "var(--audiobook-bar-safe, 0px)" }}>
        <button
          type="button"
          onClick={() => player.setExpanded(true)}
          aria-label={`Open the player: ${track.title}, ${book.title}`}
          className={cn("flex min-w-0 flex-1 items-center gap-3 rounded-md py-1 text-left", focusRing)}
        >
          <BookCover book={book} className="w-9 shrink-0 shadow-sm" />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold leading-5">{track.title}</span>
            <span className="block truncate text-sm leading-5 text-muted-foreground">
              {status === "error" ? "Did not load. Press play to try again." : `${book.title} · ${trackLabel(track)}`}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => player.skip(-SKIP_BACK_SECONDS)}
          aria-label={`Back ${SKIP_BACK_SECONDS} seconds`}
          className={cn("hidden size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted sm:grid", focusRing)}
        >
          <SkipIcon seconds={SKIP_BACK_SECONDS} direction="back" className="size-7" />
        </button>
        <button
          type="button"
          onClick={player.toggle}
          aria-label={playLabel(status)}
          className={cn("grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90", focusRing)}
        >
          <PlayPauseIcon status={status} className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => player.skip(SKIP_FORWARD_SECONDS)}
          aria-label={`Forward ${SKIP_FORWARD_SECONDS} seconds`}
          className={cn("grid size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted", focusRing)}
        >
          <SkipIcon seconds={SKIP_FORWARD_SECONDS} direction="forward" className="size-7" />
        </button>
        <button
          type="button"
          onClick={player.close}
          aria-label="Stop and close the player"
          className={cn("hidden size-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground sm:grid", focusRing)}
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
    </section>
  );
}
