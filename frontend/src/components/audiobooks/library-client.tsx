"use client";

import Link from "next/link";
import { useAudiobookStore } from "@/lib/audiobook-progress";
import { bookListening, formatBookLength, resumeTarget, trackLabel, type Audiobook } from "@/lib/audiobooks";
import { cn } from "@/lib/utils";
import { useAudiobookPlayer } from "./audiobook-player";
import { BookCover } from "./book-cover";
import { PlayPauseIcon, focusRing } from "./player-controls";

export function ProgressBar({ fraction, className, label }: { fraction: number; className?: string; label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(fraction * 100)} className={cn("h-1.5 bg-muted", className)}>
      <div className="h-full bg-primary" style={{ width: `${Math.max(fraction > 0 ? 2 : 0, fraction * 100)}%` }} />
    </div>
  );
}

/** Under each cover on the shelf: how far in, once a book has been started. */
export function ShelfProgress({ book }: { book: Audiobook }) {
  const store = useAudiobookStore();
  const listening = bookListening(book, store.books[book.slug]);
  if (!listening.started) return null;
  return (
    <div className="mt-2">
      <ProgressBar fraction={listening.fraction} label={`${book.title}: ${Math.round(listening.fraction * 100)}% listened`} />
      <p className="mt-1 text-sm tabular-nums text-muted-foreground">{listening.finished ? "Finished" : `${formatBookLength(listening.leftMinutes)} left`}</p>
    </div>
  );
}

/** The books started on this device, most recent first, each with a play button that resumes it. */
export function ContinueListening({ books }: { books: Audiobook[] }) {
  const store = useAudiobookStore();
  const player = useAudiobookPlayer();
  const started = books
    .map((book) => ({ book, state: store.books[book.slug] }))
    .filter(({ book, state }) => state && !bookListening(book, state).finished)
    .sort((a, b) => (b.state?.at ?? 0) - (a.state?.at ?? 0))
    .slice(0, 6);
  if (started.length === 0) return null;

  return (
    <section aria-labelledby="continue-title" className="mt-10" data-testid="continue-listening">
      <h2 id="continue-title" className="text-2xl tracking-[-0.02em]">
        Continue listening
      </h2>
      <ul className="-mx-4 mt-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {started.map(({ book, state }) => {
          const target = resumeTarget(book, state);
          const track = book.tracks[target.index]!;
          const listening = bookListening(book, state);
          const playing = player.book?.slug === book.slug && player.index === target.index;
          return (
            <li key={book.slug} className="flex w-[19rem] shrink-0 snap-start gap-4 border border-border bg-card p-4 sm:w-auto">
              <Link href={`/audiobooks/${book.slug}`} className={cn("w-20 shrink-0 rounded-sm", focusRing)} aria-label={`${book.title}, book page`}>
                <BookCover book={book} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/audiobooks/${book.slug}`} className={cn("line-clamp-2 rounded-sm text-base font-bold leading-snug hover:underline", focusRing)}>
                  {book.title}
                </Link>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {trackLabel(track)}: {track.title}
                </p>
                <div className="mt-auto flex items-end gap-3 pt-3">
                  <div className="min-w-0 flex-1">
                    <ProgressBar fraction={listening.fraction} label={`${Math.round(listening.fraction * 100)}% listened`} />
                    <p className="mt-1 text-sm tabular-nums text-muted-foreground">{formatBookLength(listening.leftMinutes)} left</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => (playing ? player.toggle() : player.play(book, target.index, target.at))}
                    aria-label={`${playing && player.status === "playing" ? "Pause" : "Resume"} ${book.title}`}
                    className={cn("grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90", focusRing)}
                  >
                    <PlayPauseIcon status={playing ? player.status : "paused"} className="size-5" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
