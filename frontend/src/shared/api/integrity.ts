// GENERATED from server/src/shared — do not edit here. Run `pnpm sync-shared` in server/.
// Quiz integrity signals: what the browser may report, what mentors see, and the
// limits both apps agree on. On a normal quiz the signals are flags for a mentor to
// judge and nothing fails, locks or submits the quiz. A proctored quiz is the strict
// kind: see PROCTORED_RULE for the one rule the server applies to it.

export const INTEGRITY_EVENT_TYPES = [
  "TAB_HIDDEN",
  "WINDOW_BLUR",
  "FULLSCREEN_EXIT",
  "COPY_BLOCKED",
  "PASTE_BLOCKED",
  "CONTEXT_MENU_BLOCKED",
  "SCREENSHOT_KEY",
  "MOUSE_LEFT",
  "SECOND_SCREEN",
  "FAST_ANSWER",
  "CAMERA_OFF",
  "CAMERA_ON",
  "PRINT_BLOCKED",
  "NAVIGATION_BLOCKED",
  "CAMERA_LOST",
  "NO_FACE",
  "MULTIPLE_FACES",
] as const;
export type IntegrityEventType = (typeof INTEGRITY_EVENT_TYPES)[number];

export type IntegrityCameraStatus = "NOT_REQUESTED" | "ON" | "DECLINED" | "UNAVAILABLE";

/** Camera events describe the device, not the learner, so they never add to the flag count. */
export const INTEGRITY_INFO_EVENTS: ReadonlySet<IntegrityEventType> = new Set(["CAMERA_OFF", "CAMERA_ON"]);

export function isIntegrityFlag(type: IntegrityEventType): boolean {
  return !INTEGRITY_INFO_EVENTS.has(type);
}

/**
 * The strict rule for proctored quizzes: warn twice, then submit.
 *
 * Leaving the quiz screen (another tab, another window, or full screen) or losing
 * the camera (it stops, is muted, or its permission is taken away) is an
 * "incident". Every separate leave and return counts once. The first two incidents
 * are warnings and the learner carries on. The third locks the attempt: the server stops sending its questions, the
 * answers the learner has so far are submitted as they stand (unanswered
 * questions are marked incorrect) and the mentor sees the attempt as locked.
 * Blocked actions (copy, paste, right-click, print, reload, back) and the on-device
 * face checks (no face for a while, more than one face) are recorded as notes for
 * the mentor but never count as an incident, so a stray key press or a bad light
 * cannot cost a learner their attempt. Only the server counts incidents.
 */
export const PROCTORED_RULE = {
  warnings: 2,
  /** The incident that locks the attempt. */
  limit: 3,
  /**
   * Events this close to the first one of an incident belong to it: one Alt+Tab fires
   * blur, hidden and full screen exit together, within a moment. Leaving again after
   * coming back is a new incident, so the window is kept short.
   */
  incidentWindowSeconds: 3,
} as const;

/** The events that count as an incident: leaving the quiz screen, or losing the camera. */
export const INTEGRITY_LEAVE_EVENTS: ReadonlySet<IntegrityEventType> = new Set(["TAB_HIDDEN", "WINDOW_BLUR", "FULLSCREEN_EXIT", "CAMERA_LOST"]);

/** How many separate times the learner left the quiz screen. Order does not matter. */
export function countLeaveIncidents(events: ReadonlyArray<{ type: IntegrityEventType; at: Date | string | number }>): number {
  const times = events
    .filter((event) => INTEGRITY_LEAVE_EVENTS.has(event.type))
    .map((event) => new Date(event.at).getTime())
    .filter((time) => Number.isFinite(time))
    .sort((a, b) => a - b);
  const windowMs = PROCTORED_RULE.incidentWindowSeconds * 1000;
  let incidents = 0;
  let incidentStart = Number.NEGATIVE_INFINITY;
  for (const time of times) {
    if (time - incidentStart < windowMs) continue;
    incidents += 1;
    incidentStart = time;
  }
  return incidents;
}

export const INTEGRITY_LIMITS = {
  /** Events stored per attempt. Later ones are counted as dropped, not stored. */
  eventsPerAttempt: 500,
  eventsPerBatch: 50,
  /** About one still a minute: 4 hours of quiz at most. */
  snapshotsPerAttempt: 240,
  snapshotIntervalSeconds: 60,
  /** The server refuses stills that arrive faster than this. */
  snapshotMinGapSeconds: 40,
  snapshotWidth: 320,
  snapshotHeight: 240,
  snapshotMaxBytes: 48 * 1024,
  retentionDays: 30,
} as const;

/** Mentor-facing names. Short, plain English for ESL readers. */
export const INTEGRITY_EVENT_LABELS: Record<IntegrityEventType, string> = {
  TAB_HIDDEN: "Left the tab",
  WINDOW_BLUR: "Switched window",
  FULLSCREEN_EXIT: "Left full screen",
  COPY_BLOCKED: "Tried to copy",
  PASTE_BLOCKED: "Tried to paste",
  CONTEXT_MENU_BLOCKED: "Right-click",
  SCREENSHOT_KEY: "Screenshot keys",
  MOUSE_LEFT: "Mouse left the page",
  SECOND_SCREEN: "Second screen",
  FAST_ANSWER: "Very fast answers",
  CAMERA_OFF: "Camera off",
  CAMERA_ON: "Camera on",
  PRINT_BLOCKED: "Tried to print",
  NAVIGATION_BLOCKED: "Tried to reload or go back",
  CAMERA_LOST: "Camera stopped or was blocked",
  NO_FACE: "No face in view for a while",
  MULTIPLE_FACES: "More than one face in view",
};

export const INTEGRITY_CAMERA_LABELS: Record<IntegrityCameraStatus, string> = {
  NOT_REQUESTED: "Camera not used",
  ON: "Camera on",
  DECLINED: "Camera off (learner chose no camera)",
  UNAVAILABLE: "Camera off (no camera or it stopped)",
};

export type IntegrityEventInput = {
  /** Random id from the browser so a retried batch is stored once. */
  id: string;
  type: IntegrityEventType;
  /** When it happened in the browser (events are buffered while offline). */
  at: string;
  blockId?: string | null;
  meta?: Record<string, string | number | boolean>;
};

/** What the learner's browser gets when a proctored quiz opens. */
export type IntegrityAttemptSession = {
  attemptId: string;
  attempt: number;
  startedAt: string;
  /** A proctored quiz: the strict kind. A normal quiz is never gated or locked. */
  proctored: boolean;
  /** The learner pressed Start (always true for a normal quiz), so the questions are sent. */
  questionsShown: boolean;
  /** Times the learner left the quiz screen in this attempt (proctored quizzes only). */
  leaves: number;
  /** The attempt reached PROCTORED_RULE.limit: its answers are submitted and it gets no more questions. */
  locked: boolean;
  /** Flags already stored for this attempt, so the badge survives a reload. */
  flagCount: number;
  camera: {
    /**
     * A proctored quiz cannot start until the camera is live. The video is checked on the
     * device and never uploaded; only the violation events are saved.
     */
    required: boolean;
    /** The course has camera snapshots turned on (an opt-in, separate from `required`). */
    enabled: boolean;
    status: IntegrityCameraStatus;
    intervalSeconds: number;
    width: number;
    height: number;
    retentionDays: number;
  };
};

export type IntegrityEventsResult = { accepted: number; flagCount: number; leaves: number; locked: boolean };

export type IntegrityAttemptSummary = {
  id: string;
  chapterId: string;
  chapterTitle: string;
  attempt: number;
  startedAt: string;
  lastSeenAt: string;
  cameraStatus: IntegrityCameraStatus;
  flagCount: number;
  /** Proctored attempt that reached the leave limit and was submitted as it stood. */
  locked: boolean;
  droppedEvents: number;
  counts: Partial<Record<IntegrityEventType, number>>;
  snapshotCount: number;
};

export type IntegrityAttemptDetail = IntegrityAttemptSummary & {
  events: Array<{ id: string; type: IntegrityEventType; at: string; blockId: string | null; meta: Record<string, unknown> | null }>;
  /** `url` is a short-lived signed link, or null once the image was deleted. */
  snapshots: Array<{ id: string; takenAt: string; url: string | null }>;
  snapshotUrlExpiresAt: string | null;
};

export type CourseIntegritySettings = { integritySnapshots: boolean };
