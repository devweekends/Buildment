"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { coverSvg } from "@/lib/audiobook-cover";
import { readAudiobookStore, readReaderPosition, saveSpeed, saveTrackState, writeReaderPosition } from "@/lib/audiobook-progress";
import { SKIP_BACK_SECONDS, SKIP_FORWARD_SECONDS, resumeAt, type Audiobook } from "@/lib/audiobooks";
import { coverInput } from "./book-cover";
import { MiniPlayer } from "./mini-player";
import { NowPlaying } from "./now-playing";

// One audiobook player for the whole site. It lives in the root layout, so the audio keeps playing
// while the learner moves between pages, and a mini player sits at the bottom of every page once a
// book is playing. Nothing loads until someone presses play.

export type PlayerStatus = "loading" | "playing" | "paused" | "ended" | "error";

export type AudiobookPlayer = {
  book: Audiobook | null;
  index: number;
  status: PlayerStatus;
  time: number;
  duration: number;
  speed: number;
  /** Seconds until the sleep timer stops playback, "end" for the end of this chapter, or null when off. */
  sleep: number | "end" | null;
  expanded: boolean;
  /** Starts a book at a chapter (default: where it was left). Pressing it on the playing chapter toggles. */
  play: (book: Audiobook, index?: number, at?: number) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  skip: (seconds: number) => void;
  next: () => void;
  previous: () => void;
  setSpeed: (speed: number) => void;
  setSleep: (choice: number | "end" | null) => void;
  setExpanded: (open: boolean) => void;
  close: () => void;
};

const PlayerContext = createContext<AudiobookPlayer | null>(null);

export function useAudiobookPlayer(): AudiobookPlayer {
  const player = useContext(PlayerContext);
  if (!player) throw new Error("useAudiobookPlayer needs AudiobookPlayerProvider");
  return player;
}

const SAVE_EVERY_SECONDS = 5;
const artworkCache = new Map<string, string>();

/** Lock screens want a bitmap; draw the SVG cover onto a canvas once per book. */
async function coverArtwork(book: Audiobook): Promise<string | null> {
  const cached = artworkCache.get(book.slug);
  if (cached) return cached;
  try {
    const svg = coverSvg(coverInput(book));
    const image = new Image();
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 600;
    canvas.getContext("2d")?.drawImage(image, 0, 0, 400, 600);
    const url = canvas.toDataURL("image/png");
    artworkCache.set(book.slug, url);
    return url;
  } catch {
    return null;
  }
}

export function AudiobookPlayerProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const pendingSeek = useRef(0);
  const lastSaved = useRef(0);
  const sleepAt = useRef<number | null>(null);
  const [book, setBook] = useState<Audiobook | null>(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<PlayerStatus>("paused");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Speed is only shown once a book is playing, so reading it in the browser cannot mismatch the server HTML.
  const [speed, setSpeedState] = useState(() => (typeof window === "undefined" ? 1 : (readAudiobookStore().speed ?? 1)));
  const [sleep, setSleepState] = useState<number | "end" | null>(null);
  const [expanded, setExpanded] = useState(false);

  const track = book?.tracks[index] ?? null;

  const save = useCallback(
    (done = false) => {
      const element = audio.current;
      if (!element || !book || !track) return;
      const d = Number.isFinite(element.duration) ? element.duration : 0;
      const p = done ? d : element.currentTime;
      saveTrackState(book.slug, track.slug, done ? { p: d, d, done: true } : { p, d });
      writeReaderPosition(track.src, done ? 0 : p);
      lastSaved.current = p;
    },
    [book, track],
  );

  const load = useCallback((next: Audiobook, nextIndex: number, at: number | undefined) => {
    const element = audio.current;
    const nextTrack = next.tracks[nextIndex];
    if (!element || !nextTrack) return;
    const saved = readAudiobookStore().books[next.slug]?.tracks[nextTrack.slug];
    pendingSeek.current = at ?? (resumeAt(saved) || (saved?.done ? 0 : readReaderPosition(nextTrack.src)));
    lastSaved.current = pendingSeek.current;
    setBook(next);
    setIndex(nextIndex);
    setTime(pendingSeek.current);
    setDuration(nextTrack.minutes * 60);
    setStatus("loading");
    element.src = nextTrack.src;
    element.playbackRate = readAudiobookStore().speed ?? element.playbackRate;
    void element.play().catch((error: unknown) => {
      // A newer load or a pause interrupts this play(); only a real failure is an error.
      if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("error");
    });
  }, []);

  const toggle = useCallback(() => {
    const element = audio.current;
    if (!element || !book) return;
    if (!element.paused) {
      element.pause();
      return;
    }
    if (status === "ended" || status === "error") {
      load(book, status === "ended" ? 0 : index, status === "ended" ? 0 : element.currentTime);
      return;
    }
    setStatus("loading");
    void element.play().catch(() => setStatus("error"));
  }, [book, index, load, status]);

  const play = useCallback(
    (next: Audiobook, nextIndex?: number, at?: number) => {
      const same = book?.slug === next.slug;
      const target = nextIndex ?? (same ? index : undefined);
      if (same && target === index && status !== "ended" && status !== "error" && at === undefined) {
        toggle();
        return;
      }
      if (book && track) save();
      if (target === undefined) {
        const saved = readAudiobookStore().books[next.slug];
        const last = saved ? next.tracks.findIndex((t) => t.slug === saved.track) : -1;
        load(next, Math.max(0, last), undefined);
        return;
      }
      load(next, target, at);
    },
    [book, index, load, save, status, toggle, track],
  );

  const seek = useCallback((seconds: number) => {
    const element = audio.current;
    if (!element) return;
    const end = Number.isFinite(element.duration) ? element.duration : seconds;
    element.currentTime = Math.max(0, Math.min(end, seconds));
    setTime(element.currentTime);
  }, []);

  const skip = useCallback((seconds: number) => seek((audio.current?.currentTime ?? 0) + seconds), [seek]);

  const next = useCallback(() => {
    if (book && index + 1 < book.tracks.length) {
      save();
      load(book, index + 1, 0);
    }
  }, [book, index, load, save]);

  const previous = useCallback(() => {
    if (!book) return;
    // As in every audio app: a few seconds in, "previous" restarts the chapter.
    if ((audio.current?.currentTime ?? 0) > 5 || index === 0) {
      seek(0);
      return;
    }
    save();
    load(book, index - 1, 0);
  }, [book, index, load, save, seek]);

  const setSpeed = useCallback((requested: number) => {
    const element = audio.current;
    let applied = requested;
    if (element) {
      try {
        element.playbackRate = requested;
      } catch {
        // A browser that refuses a rate keeps its current one.
      }
      applied = element.playbackRate;
    }
    setSpeedState(applied);
    saveSpeed(applied);
  }, []);

  const setSleep = useCallback((choice: number | "end" | null) => {
    sleepAt.current = typeof choice === "number" ? Date.now() + choice * 60_000 : null;
    setSleepState(typeof choice === "number" ? choice * 60 : choice);
  }, []);

  const close = useCallback(() => {
    const element = audio.current;
    if (element && book) {
      save();
      element.pause();
      element.removeAttribute("src");
      element.load();
    }
    setSleep(null);
    setExpanded(false);
    setBook(null);
  }, [book, save, setSleep]);

  // The sleep timer counts down once a second and pauses when it runs out.
  useEffect(() => {
    if (typeof sleep !== "number") return;
    const timer = window.setInterval(() => {
      const left = sleepAt.current === null ? 0 : Math.round((sleepAt.current - Date.now()) / 1000);
      if (left <= 0) {
        audio.current?.pause();
        sleepAt.current = null;
        setSleepState(null);
        return;
      }
      setSleepState(left);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sleep]);

  // Only one voice at a time: the chapter reader's own player and this one pause each other.
  useEffect(() => {
    const onPlay = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLMediaElement && target !== audio.current && target.matches("[data-narration]")) audio.current?.pause();
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);

  // The full view covers the page; the page behind it should not scroll.
  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  // Lock screen, headphones and car controls.
  const actions = useRef({ toggle, skip, next, previous, seek });
  useEffect(() => {
    actions.current = { toggle, skip, next, previous, seek };
  }, [toggle, skip, next, previous, seek]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || !book || !track) return;
    let cancelled = false;
    const metadata = { title: track.title, artist: book.author, album: book.title };
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
    void coverArtwork(book).then((art) => {
      if (!cancelled && art) navigator.mediaSession.metadata = new MediaMetadata({ ...metadata, artwork: [{ src: art, sizes: "400x600", type: "image/png" }] });
    });
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", () => actions.current.toggle()],
      ["pause", () => audio.current?.pause()],
      ["seekbackward", (details) => actions.current.skip(-(details.seekOffset ?? SKIP_BACK_SECONDS))],
      ["seekforward", (details) => actions.current.skip(details.seekOffset ?? SKIP_FORWARD_SECONDS)],
      ["previoustrack", () => actions.current.previous()],
      ["nexttrack", () => actions.current.next()],
      ["seekto", (details) => (details.seekTime === undefined ? undefined : actions.current.seek(details.seekTime))],
    ];
    for (const [action, handler] of handlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Not every browser supports every action.
      }
    }
    return () => {
      cancelled = true;
    };
  }, [book, track]);

  const value = useMemo<AudiobookPlayer>(
    () => ({ book, index, status, time, duration, speed, sleep, expanded, play, toggle, seek, skip, next, previous, setSpeed, setSleep, setExpanded, close }),
    [book, index, status, time, duration, speed, sleep, expanded, play, toggle, seek, skip, next, previous, setSpeed, setSleep, close],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audio}
        preload="none"
        data-audiobook=""
        onLoadedMetadata={(event) => {
          const element = event.currentTarget;
          if (Number.isFinite(element.duration)) setDuration(element.duration);
          if (pendingSeek.current > 0 && pendingSeek.current < element.duration - 3) element.currentTime = pendingSeek.current;
          pendingSeek.current = 0;
        }}
        onPlaying={(event) => {
          setStatus("playing");
          document.querySelectorAll<HTMLMediaElement>("[data-narration]").forEach((other) => other !== event.currentTarget && other.pause());
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
        }}
        onPause={(event) => {
          if (!event.currentTarget.ended) setStatus("paused");
          save();
          if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
        }}
        onWaiting={() => setStatus("loading")}
        onError={(event) => {
          if (event.currentTarget.getAttribute("src")) setStatus("error");
        }}
        onTimeUpdate={(event) => {
          const element = event.currentTarget;
          setTime(element.currentTime);
          if (Math.abs(element.currentTime - lastSaved.current) >= SAVE_EVERY_SECONDS) {
            save();
            if ("mediaSession" in navigator && Number.isFinite(element.duration)) {
              try {
                navigator.mediaSession.setPositionState({ duration: element.duration, playbackRate: element.playbackRate, position: Math.min(element.currentTime, element.duration) });
              } catch {
                // Position state is optional.
              }
            }
          }
        }}
        onEnded={() => {
          save(true);
          if (!book) return;
          if (sleep === "end") {
            setSleep(null);
            setStatus("paused");
            return;
          }
          if (index + 1 < book.tracks.length) load(book, index + 1, 0);
          else setStatus("ended");
        }}
      />
      {book && track ? (
        <>
          {/* Room at the end of every page, so the bar never covers the last lines. */}
          <div aria-hidden className="h-[4.5rem] shrink-0" />
          <MiniPlayer />
          {expanded ? <NowPlaying /> : null}
        </>
      ) : null}
    </PlayerContext.Provider>
  );
}
