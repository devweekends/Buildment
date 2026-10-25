import { INTEGRITY_LIMITS, PROCTORED_RULE, isIntegrityFlag, type IntegrityEventInput, type IntegrityEventType } from "../../shared/api/integrity";

// Pure pieces of the quiz integrity hook, kept free of the DOM so they can be
// unit tested: key combos, the reading-time check and the offline-safe queue.

type KeyLike = { key: string; code?: string; metaKey: boolean; shiftKey: boolean; ctrlKey?: boolean };

/**
 * Names the screenshot shortcut a key event belongs to, or null. The web can only
 * notice these keys (and often not even that: the OS may swallow them first). It
 * can never block a screenshot.
 */
export function screenshotCombo(event: KeyLike): string | null {
  if (event.key === "PrintScreen" || event.code === "PrintScreen") return "PrintScreen";
  if (!event.metaKey || !event.shiftKey) return null;
  const key = event.key.toLowerCase();
  if (key === "s" || event.code === "KeyS") return "Win+Shift+S";
  for (const digit of ["3", "4", "5"]) {
    if (key === digit || event.code === `Digit${digit}`) return `Cmd+Shift+${digit}`;
  }
  return null;
}

type ProctorKey = KeyLike & { altKey?: boolean };

/**
 * What a key press does during a proctored quiz that the page must stop: printing, or
 * reloading and going back. Null for every other key. Closing the tab cannot be stopped.
 */
export function proctoredKeyAction(event: ProctorKey): "PRINT_BLOCKED" | "NAVIGATION_BLOCKED" | null {
  const key = event.key.toLowerCase();
  const withCommand = Boolean(event.ctrlKey || event.metaKey);
  if (withCommand && key === "p") return "PRINT_BLOCKED";
  if (key === "f5" || (withCommand && key === "r")) return "NAVIGATION_BLOCKED";
  if (event.altKey && key === "arrowleft") return "NAVIGATION_BLOCKED";
  if (event.metaKey && (key === "[" || key === "arrowleft")) return "NAVIGATION_BLOCKED";
  return null;
}

/**
 * The browser's own count of how often the learner left the quiz screen, so the warning
 * shows at once. It follows the same incident window as the server, which recounts from
 * the stored events and has the final say (see countLeaveIncidents).
 */
export class LeaveCounter {
  private count: number;
  private incidentStart = Number.NEGATIVE_INFINITY;

  constructor(initial = 0) {
    this.count = initial;
  }

  get leaves(): number {
    return this.count;
  }

  /** Starts over from what the server knows (a new attempt, or a reload). */
  reset(initial: number): void {
    this.count = initial;
    this.incidentStart = Number.NEGATIVE_INFINITY;
  }

  /** The server counted more than the browser did (a leave this page missed): the server wins. */
  sync(serverLeaves: number): boolean {
    if (serverLeaves <= this.count) return false;
    this.count = serverLeaves;
    return true;
  }

  /**
   * Notes one leave at time `at` (ms). Returns the outcome when it starts a new incident,
   * or null when it belongs to the incident before it (blur, hidden and full screen exit
   * from one Alt+Tab).
   */
  add(at: number): { leaves: number; limitReached: boolean; warningsLeft: number } | null {
    if (at - this.incidentStart < PROCTORED_RULE.incidentWindowSeconds * 1000) return null;
    this.incidentStart = at;
    this.count += 1;
    return {
      leaves: this.count,
      limitReached: this.count >= PROCTORED_RULE.limit,
      warningsLeft: Math.max(0, PROCTORED_RULE.limit - this.count),
    };
  }
}

/**
 * The light on-device face check, kept apart from the camera so it can be tested. Feed it
 * the number of faces each time the detector runs. It speaks up once per episode: no face
 * for a while, or more than one face for several checks in a row.
 */
export class FaceWatch {
  private noFaceSince: number | null = null;
  private noFaceReported = false;
  private manyRun = 0;
  private manyReported = false;

  constructor(
    private readonly noFaceMs = 10_000,
    private readonly manyChecks = 3,
  ) {}

  observe(faces: number, now: number): "NO_FACE" | "MULTIPLE_FACES" | null {
    if (faces >= 2) {
      this.manyRun += 1;
      this.noFaceSince = null;
      this.noFaceReported = false;
      if (this.manyRun >= this.manyChecks && !this.manyReported) {
        this.manyReported = true;
        return "MULTIPLE_FACES";
      }
      return null;
    }
    this.manyRun = 0;
    this.manyReported = false;
    if (faces === 1) {
      this.noFaceSince = null;
      this.noFaceReported = false;
      return null;
    }
    this.noFaceSince ??= now;
    if (!this.noFaceReported && now - this.noFaceSince >= this.noFaceMs) {
      this.noFaceReported = true;
      return "NO_FACE";
    }
    return null;
  }
}

/**
 * Whether to show the "Return to full screen" banner after the learner left full
 * screen. It is a reminder, never a gate: hidden where the browser has no Fullscreen
 * API (iPhone Safari) and gone for the attempt after two "Not now".
 */
export function fullscreenPromptAllowed(input: { supported: boolean; dismissals: number }): boolean {
  return input.supported && input.dismissals < 2;
}

/** ESL readers on phones: assume a slow, careful pace so honest learners are never flagged. */
const WORDS_PER_MINUTE = 180;
const MS_PER_QUESTION = 2_000;
/** Flag only when answers came in under this share of the expected time. */
const FAST_SHARE = 0.35;

export function expectedReadingMs(words: number, questions: number): number {
  return Math.round((words / WORDS_PER_MINUTE) * 60_000 + questions * MS_PER_QUESTION);
}

export function isFastAnswer(elapsedMs: number, words: number, questions: number): boolean {
  if (questions <= 0 || words <= 0) return false;
  return elapsedMs < expectedReadingMs(words, questions) * FAST_SHARE;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function newEventId(): string {
  const bytes = new Uint8Array(12);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export type QueuedEvent = IntegrityEventInput & { attemptId: string };

type Storage = Pick<globalThis.Storage, "getItem" | "setItem" | "removeItem">;

/** Events wait here until the server confirms them, and survive reloads and power cuts. */
export class IntegrityQueue {
  private items: QueuedEvent[] = [];
  private static readonly MAX_ITEMS = INTEGRITY_LIMITS.eventsPerAttempt + 100;

  constructor(
    private readonly storageKey: string,
    private readonly storage: Storage | null,
  ) {
    try {
      const saved = storage?.getItem(storageKey);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) this.items = parsed.filter(isQueuedEvent);
    } catch {
      this.items = [];
    }
  }

  get size(): number {
    return this.items.length;
  }

  pendingFlags(attemptId: string): number {
    return this.items.filter((item) => item.attemptId === attemptId && isIntegrityFlag(item.type)).length;
  }

  add(attemptId: string, type: IntegrityEventType, extra: Pick<IntegrityEventInput, "blockId" | "meta"> = {}, at = new Date()): QueuedEvent {
    const event: QueuedEvent = { attemptId, id: newEventId(), type, at: at.toISOString(), ...extra };
    this.items.push(event);
    if (this.items.length > IntegrityQueue.MAX_ITEMS) this.items.splice(0, this.items.length - IntegrityQueue.MAX_ITEMS);
    this.save();
    return event;
  }

  /** The oldest events of one attempt, at most one batch. */
  nextBatch(): { attemptId: string; events: IntegrityEventInput[] } | null {
    const first = this.items[0];
    if (!first) return null;
    const events = this.items
      .filter((item) => item.attemptId === first.attemptId)
      .slice(0, INTEGRITY_LIMITS.eventsPerBatch)
      .map(({ attemptId: _attemptId, ...event }) => event);
    return { attemptId: first.attemptId, events };
  }

  /** Removes events the server stored (or refused for good). */
  ack(ids: Iterable<string>): void {
    const done = new Set(ids);
    this.items = this.items.filter((item) => !done.has(item.id));
    this.save();
  }

  dropAttempt(attemptId: string): void {
    this.items = this.items.filter((item) => item.attemptId !== attemptId);
    this.save();
  }

  private save(): void {
    try {
      if (this.items.length) this.storage?.setItem(this.storageKey, JSON.stringify(this.items));
      else this.storage?.removeItem(this.storageKey);
    } catch {
      // Storage can be full or blocked; the in-memory queue still works.
    }
  }
}

function isQueuedEvent(value: unknown): value is QueuedEvent {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.attemptId === "string" && typeof item.id === "string" && typeof item.type === "string" && typeof item.at === "string";
}
