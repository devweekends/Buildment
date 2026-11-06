"use client";

import { Check } from "lucide-react";
import { useAudiobookStore } from "@/lib/audiobook-progress";
import { bookListening, formatBookLength, resumeAt, resumeTarget, trackLabel, type Audiobook } from "@/lib/audiobooks";
import { cn } from "@/lib/utils";
import { useAudiobookPlayer } from "./audiobook-player";
import { ProgressBar } from "./library-client";
import { PlayPauseIcon, focusRing } from "./player-controls";

/** The big button on a book page: Play, Resume where it was left, or Listen again. */
export function BookResume({ book }: { book: Audiobook }) {
  const store = useAudiobookStore();
  const player = useAudiobookPlayer();
  const state = store.books[book.slug];
  const listening = bookListening(book, state);
  const target = resumeTarget(book, state);
  const track = book.tracks[target.index]!;
  const thisBook = player.book?.slug === book.slug;
  const playing = thisBook && player.status === "playing";

  const label = playing ? "Pause" : thisBook ? "Resume" : listening.finished ? "Listen again" : listening.started ? "Resume" : "Play";
  const detail = thisBook
    ? `${trackLabel(book.tracks[player.index]!)}: ${book.tracks[player.index]!.title}`
    : listening.started && !listening.finished
      ? `${trackLabel(track)}: ${track.title}`
      : `From chapter 1, ${formatBookLength(book.totalMinutes)}`;

  return (
    <div className="mt-6" data-testid="book-resume">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => (thisBook ? player.toggle() : player.play(book, target.index, target.at))}
          className={cn(
            "inline-flex min-h-14 items-center gap-3 rounded-md bg-primary pl-4 pr-6 text-lg font-bold text-primary-foreground hover:bg-primary/90",
            focusRing,
          )}
        >
          <PlayPauseIcon status={thisBook ? player.status : "paused"} className="size-6" />
          {label}
        </button>
        <p className="min-w-0 text-base text-muted-foreground">{detail}</p>
      </div>
      {listening.started ? (
        <div className="mt-5 max-w-md">
          <ProgressBar fraction={listening.fraction} label={`${Math.round(listening.fraction * 100)}% listened`} />
          <p className="mt-1.5 text-sm tabular-nums text-muted-foreground">
            {listening.finished
              ? "Finished. Every chapter heard to the end."
              : `${formatBookLength(listening.leftMinutes)} left, ${listening.doneCount} of ${book.tracks.length} chapters finished`}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Equalizer() {
  return (
    <span aria-hidden className="flex h-4 items-end gap-[2px]">
      {[0, 1, 2].map((bar) => (
        <span key={bar} className="w-[3px] origin-bottom bg-primary motion-safe:animate-[audiobook-eq_0.9s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: `${bar * -0.3}s` }} />
      ))}
    </span>
  );
}

/** Every chapter as a track, grouped by part, with its length and whether it was finished or started. */
export function TrackList({ book }: { book: Audiobook }) {
  const store = useAudiobookStore();
  const player = useAudiobookPlayer();
  const state = store.books[book.slug];

  return (
    <div className="space-y-8" data-testid="track-list">
      {book.parts.map((part) => (
        <section key={part.number} aria-labelledby={`part-${part.number}`}>
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-foreground pb-2">
            <h3 id={`part-${part.number}`} className="min-w-0 text-lg tracking-[-0.01em]">
              <span className="text-muted-foreground">Part {part.number}</span>
              {part.title ? <span> · {part.title}</span> : null}
            </h3>
            <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{formatBookLength(part.minutes)}</span>
          </div>
          <ol>
            {book.tracks.slice(part.firstTrack, part.firstTrack + part.trackCount).map((track, offset) => {
              const i = part.firstTrack + offset;
              const saved = state?.tracks[track.slug];
              const current = player.book?.slug === book.slug && player.index === i;
              const position = resumeAt(saved);
              const inProgress = !saved?.done && position > 0;
              const minutesLeft = inProgress ? Math.max(1, track.minutes - position / 60) : 0;
              return (
                <li key={track.slug} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => (current ? player.toggle() : player.play(book, i))}
                    aria-current={current ? "true" : undefined}
                    aria-label={`${current && player.status === "playing" ? "Pause" : "Play"} ${trackLabel(track)}: ${track.title}`}
                    className={cn("group flex min-h-14 w-full items-center gap-3 px-1 py-2 text-left hover:bg-muted sm:gap-4 sm:px-2", current && "bg-secondary", focusRing)}
                  >
                    <span className="grid w-7 shrink-0 place-items-center text-sm tabular-nums text-muted-foreground">
                      {current && player.status === "playing" ? <Equalizer /> : track.chapter}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-base leading-snug", current ? "font-bold text-primary" : saved?.done ? "text-muted-foreground" : "font-medium")}>{track.title}</span>
                      {inProgress && !current ? (
                        <span className="mt-0.5 block text-sm tabular-nums text-primary">{formatBookLength(minutesLeft)} left in this chapter</span>
                      ) : null}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-sm tabular-nums text-muted-foreground">
                      {saved?.done ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                          <Check aria-hidden className="size-4" />
                          <span className="sr-only">Finished,</span>
                        </span>
                      ) : inProgress && !current ? (
                        <span aria-hidden className="size-2.5 rounded-full border-2 border-primary" />
                      ) : null}
                      {formatBookLength(track.minutes)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
