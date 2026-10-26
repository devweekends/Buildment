"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INTEGRITY_LEAVE_EVENTS,
  INTEGRITY_LIMITS,
  PROCTORED_RULE,
  type IntegrityAttemptSession,
  type IntegrityCameraStatus,
  type IntegrityEventType,
  type IntegrityEventsResult,
} from "../../shared/api/integrity";
import { FaceWatch, IntegrityQueue, LeaveCounter, countWords, fullscreenPromptAllowed, isFastAnswer, proctoredKeyAction, screenshotCombo } from "./signals";
import { CameraSession, type CameraLoss } from "./camera-session";

// Quiz integrity signals in the browser. Everything here is best effort and
// never blocks the quiz: a failed request, a missing camera or an unsupported
// API just means fewer notes for the mentor. Events wait in localStorage until
// the server confirms them, so a power cut or a dropped connection loses nothing.

const FLUSH_MS = 10_000;
const REOPEN_MS = 15_000;
const NOTICE_MS = 6_000;
/** Same signal again within this window is one action (key repeat, double events). */
const REPEAT_MS = 1_500;
const MIN_BLUR_MS = 1_000;
const MIN_MOUSE_OUT_MS = 2_000;
const FIRST_SNAPSHOT_MS = 5_000;
const CAMERA_PUT_RETRY_MS = [1_000, 4_000];

const NOTICE_TEXT: Partial<Record<IntegrityEventType, string>> = {
  TAB_HIDDEN: "You left the quiz tab. Your mentor will see this.",
  WINDOW_BLUR: "You switched to another window. Your mentor will see this.",
  COPY_BLOCKED: "Copy is turned off during this quiz.",
  PASTE_BLOCKED: "Paste is turned off during this quiz. Please type your answer.",
  CONTEXT_MENU_BLOCKED: "Right-click is turned off during this quiz.",
  SCREENSHOT_KEY: "Screenshot keys were noticed. Your mentor will see this.",
  MOUSE_LEFT: "Your mouse left the quiz page.",
  SECOND_SCREEN: "A second screen is connected. Your mentor will see this.",
  FAST_ANSWER: "You answered very fast. Take your time to read each question.",
  PRINT_BLOCKED: "Printing is turned off during this quiz.",
  NAVIGATION_BLOCKED: "You cannot reload or go back during this quiz.",
  CAMERA_LOST: "Your camera stopped. Turn it back on to continue.",
  NO_FACE: "We could not see you for a while. Keep your face in view of the camera.",
  MULTIPLE_FACES: "More than one person is in view. Your mentor will see this.",
};

/** How often a proctored quiz checks that the window still has focus, in case a blur event was missed. */
const FOCUS_POLL_MS = 500;
const FACE_CHECK_MS = 2_000;
/** A live track whose picture has not moved for this long counts as a lost camera. */
const FROZEN_MS = 6_000;

type FaceDetectorLike = { detect(image: CanvasImageSource): Promise<unknown[]> };
type FaceDetectorConstructor = new (options?: { fastMode?: boolean; maxDetectedFaces?: number }) => FaceDetectorLike;

/** The native FaceDetector, where the browser has it. Nothing is installed or downloaded. */
function faceDetectorClass(): FaceDetectorConstructor | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { FaceDetector?: FaceDetectorConstructor }).FaceDetector ?? null;
}

/** What the learner is told after they left the quiz screen in a proctored quiz. */
export type LeaveWarning = { leaves: number; warningsLeft: number };

export type IntegrityNotice = { id: number; text: string };

type Pending = { attemptId: string; at: number };

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function readPending(key: string): Pending | null {
  try {
    const raw = storage()?.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object" && typeof (parsed as Pending).attemptId === "string" && typeof (parsed as Pending).at === "number") {
      return parsed as Pending;
    }
  } catch {
    // Treat unreadable storage as nothing pending.
  }
  return null;
}

function writePending(key: string, value: Pending | null) {
  try {
    if (value) storage()?.setItem(key, JSON.stringify(value));
    else storage()?.removeItem(key);
  } catch {
    // Storage is optional.
  }
}

/** Waits (briefly) until the page is really full screen and has settled, so nothing is armed mid-transition. */
async function waitForFullscreen(): Promise<void> {
  for (let waited = 0; waited < 2_000 && !document.fullscreenElement; waited += 100) {
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }
  if (document.fullscreenElement) await new Promise((resolve) => window.setTimeout(resolve, 800));
}

function fullscreenSupported(): boolean {
  return typeof document !== "undefined" && document.fullscreenEnabled === true && typeof document.documentElement.requestFullscreen === "function";
}

/** The reader shell owns focus mode; asking it keeps the layout and full screen in step. */
export function requestQuizFullscreen() {
  window.dispatchEvent(new Event("buildment:quiz-focus"));
}

/** What a native shell (the desktop app) reports about its window, beyond what the page can see. */
export type NativeWindowEvent = "blur" | "focus" | "leave-full-screen" | "minimize";

export type IntegrityTransport = {
  apiFetch: <T>(path: string, options?: Omit<RequestInit, "body"> & { json?: unknown }) => Promise<T>;
  fetch: typeof globalThis.fetch;
  /** The desktop app bridges its main-process window events here; the web leaves it out. */
  windowEvents?: (listener: (event: NativeWindowEvent) => void) => () => void;
};


export function useQuizIntegrity({
  chapterId,
  enabled,
  rootRef,
  currentBlockId,
  transport,
}: {
  chapterId: string;
  /** False once the quiz is complete: nothing is watched or recorded then. */
  enabled: boolean;
  rootRef: React.RefObject<HTMLElement | null>;
  currentBlockId: string | null;
  transport: IntegrityTransport;
}) {
  const { apiFetch, fetch, windowEvents } = transport;
  const [session, setSession] = useState<IntegrityAttemptSession | null>(null);
  const [serverFlags, setServerFlags] = useState(0);
  const [pendingFlags, setPendingFlags] = useState(0);
  const [notice, setNotice] = useState<IntegrityNotice | null>(null);
  const [fullscreenPrompt, setFullscreenPrompt] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<IntegrityCameraStatus>("NOT_REQUESTED");
  const [cameraStarting, setCameraStarting] = useState(false);
  /** Why the camera is off, so the notice can say what to do. */
  const [cameraIssue, setCameraIssue] = useState<string | null>(null);
  /** "intro" is the start-of-attempt notice and camera choice; "info" reopens it from the badge. */
  const [dialog, setDialog] = useState<"intro" | "info" | null>(null);
  /** The server sends this chapter's questions only after Start; until then the reader shows none. */
  const [questionsShown, setQuestionsShown] = useState(false);
  /** Proctored quizzes: times the learner left the quiz screen, the warning to show and whether the attempt is locked. */
  const [leaves, setLeaves] = useState(0);
  const [leaveWarning, setLeaveWarning] = useState<LeaveWarning | null>(null);
  const [locked, setLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [done, setDone] = useState(false);
  /** A proctored quiz whose camera stopped: the quiz stays covered until it is live again. */
  const [cameraLost, setCameraLost] = useState(false);
  /** The native FaceDetector is there and running (a light check, on this device only). */
  const [faceCheck, setFaceCheck] = useState(false);
  /** Start was pressed and the server has not confirmed it yet. */
  const [starting, setStarting] = useState(false);

  const queueRef = useRef<IntegrityQueue | null>(null);
  const attemptIdRef = useRef<string | null>(null);
  const finishedRef = useRef(!enabled);
  const blockRef = useRef<string | null>(currentBlockId);
  const lastByType = useRef(new Map<IntegrityEventType, number>());
  const suppressUntil = useRef(0);
  const flushing = useRef(false);
  const blurStart = useRef<number | null>(null);
  const mouseOutStart = useRef<number | null>(null);
  const wasFullscreen = useRef(false);
  const fullscreenDismissals = useRef(0);
  const secondScreenFlagged = useRef(false);
  /** Set from the attempt's start time once it opens. */
  const paceStart = useRef(0);
  const noticeSeq = useRef(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraSessionRef = useRef<CameraSession | null>(null);
  const snapshotTimer = useRef<number | null>(null);
  const snapshotInterval = useRef<number | null>(null);
  const cameraStatusRef = useRef<IntegrityCameraStatus>("NOT_REQUESTED");
  const armedRef = useRef(false);
  const proctoredRef = useRef(false);
  const leaveCounter = useRef(new LeaveCounter());
  const limitFired = useRef(false);
  const swallowPop = useRef(0);
  /** The learner is away from the quiz right now (window blur, hidden tab, or a native blur). */
  const awayRef = useRef(false);
  const cameraRequiredRef = useRef(false);
  const lostRef = useRef<(reason: CameraLoss) => void>(() => undefined);
  const recoveries = useRef<number[]>([]);
  const recovering = useRef(false);

  // A proctored quiz is armed from Start until the attempt ends: that is when leaving counts.
  const proctored = Boolean(session?.proctored);
  const armed = proctored && questionsShown && !locked && enabled && !done;
  // Listeners read these refs, so they always see the latest values without being re-attached.
  useEffect(() => {
    armedRef.current = armed;
    proctoredRef.current = proctored;
    cameraRequiredRef.current = Boolean(session?.camera.required);
  });

  const hiddenKey = `buildment:integrity-hidden:${chapterId}`;
  const introKey = (attemptId: string) => `buildment:integrity-started:${attemptId}`;

  useEffect(() => {
    blockRef.current = currentBlockId;
  }, [currentBlockId]);

  const showNotice = useCallback((text: string) => {
    noticeSeq.current += 1;
    setNotice({ id: noticeSeq.current, text });
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice((current) => (current?.id === notice.id ? null : current)), NOTICE_MS);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const refreshPending = useCallback(() => {
    const attemptId = attemptIdRef.current;
    setPendingFlags(attemptId && queueRef.current ? queueRef.current.pendingFlags(attemptId) : 0);
  }, []);

  /** The attempt reached the leave limit (here or on the server): hand the answers in, once. */
  const reachLimit = useCallback(() => {
    if (limitFired.current) return;
    limitFired.current = true;
    // The reader sees `limitReached` and hands the answers in.
    setLocked(true);
    setLeaveWarning(null);
  }, []);

  /** Counts one leave locally so the warning shows at once; the server recounts and decides. */
  const countLeave = useCallback((at: number) => {
    const incident = leaveCounter.current.add(at);
    if (!incident) return;
    setLeaves(incident.leaves);
    if (incident.limitReached) reachLimit();
    else setLeaveWarning({ leaves: incident.leaves, warningsLeft: incident.warningsLeft });
  }, [reachLimit]);

  const flush = useCallback(async (keepalive = false) => {
    const queue = queueRef.current;
    if (!queue || (flushing.current && !keepalive)) return;
    if (!keepalive && typeof navigator !== "undefined" && navigator.onLine === false) return;
    if (!keepalive) flushing.current = true;
    try {
      for (let round = 0; round < 5; round += 1) {
        const batch = queue.nextBatch();
        if (!batch) break;
        const ids = batch.events.map((event) => event.id);
        let response: Response;
        try {
          response = await fetch(`/api/v1/integrity/attempts/${encodeURIComponent(batch.attemptId)}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ events: batch.events }),
            credentials: "same-origin",
            keepalive,
          });
        } catch {
          break; // Offline or the request was cut: try again on the next tick.
        }
        if (response.ok) {
          const body = (await response.json().catch(() => null)) as { data?: IntegrityEventsResult } | null;
          queue.ack(ids);
          if (batch.attemptId === attemptIdRef.current && typeof body?.data?.flagCount === "number") setServerFlags(body.data.flagCount);
          if (batch.attemptId === attemptIdRef.current && body?.data) {
            const serverLeaves = body.data.leaves;
            // The server counted a leave this page missed: its count wins, and the learner is warned.
            if (!body.data.locked && typeof serverLeaves === "number" && leaveCounter.current.sync(serverLeaves)) {
              setLeaves(serverLeaves);
              setLeaveWarning({ leaves: serverLeaves, warningsLeft: Math.max(0, PROCTORED_RULE.limit - serverLeaves) });
            }
            if (body.data.locked) reachLimit();
          }
        } else if ([400, 403, 404].includes(response.status)) {
          queue.ack(ids); // The server will never take these; do not retry forever.
        } else {
          break; // 429 or 5xx: keep them for later.
        }
        if (keepalive) break;
      }
    } finally {
      if (!keepalive) flushing.current = false;
      refreshPending();
    }
  }, [reachLimit, refreshPending]);

  const record = useCallback(
    (type: IntegrityEventType, meta?: Record<string, string | number | boolean>, options: { at?: Date; attemptId?: string; quiet?: boolean } = {}) => {
      const attemptId = options.attemptId ?? attemptIdRef.current;
      const queue = queueRef.current;
      if (!queue || !attemptId) return;
      if (!options.attemptId && finishedRef.current) return;
      const leaving = INTEGRITY_LEAVE_EVENTS.has(type);
      // On a proctored quiz, leaving only counts between Start and the end of the attempt.
      if (leaving && proctoredRef.current && !armedRef.current && !options.attemptId) return;
      const now = Date.now();
      const last = lastByType.current.get(type);
      if (last && now - last < REPEAT_MS && !options.at) return;
      lastByType.current.set(type, now);
      queue.add(attemptId, type, { blockId: blockRef.current, ...(meta ? { meta } : {}) }, options.at ?? new Date(now));
      refreshPending();
      if (leaving && proctoredRef.current && armedRef.current) {
        countLeave((options.at ?? new Date(now)).getTime());
        // Do not wait for the timer: the server counts it and the learner may be gone for a while.
        void flush(document.visibilityState === "hidden");
      }
      const text = NOTICE_TEXT[type];
      if (text && !options.quiet) showNotice(text);
    },
    [countLeave, flush, refreshPending, showNotice],
  );

  // --- Opening the attempt ------------------------------------------------------------------

  const applySession = useCallback((next: IntegrityAttemptSession) => {
    attemptIdRef.current = next.attemptId;
    // A second screen is a state, not an action: note it once per attempt, even across reloads.
    try {
      secondScreenFlagged.current = storage()?.getItem(`buildment:integrity-screen:${next.attemptId}`) === "1";
    } catch {
      secondScreenFlagged.current = false;
    }
    fullscreenDismissals.current = 0;
    paceStart.current = Math.min(Date.parse(next.startedAt) || Date.now(), Date.now());
    // Each attempt starts from what the server knows: a new proctored attempt waits for Start again.
    leaveCounter.current.reset(next.leaves);
    limitFired.current = false;
    setLeaves(next.leaves);
    setLocked(false);
    setLeaveWarning(null);
    setQuestionsShown(next.questionsShown);
    setSession(next);
    setServerFlags(next.flagCount);
    refreshPending();
  }, [refreshPending]);

  const openAttempt = useCallback(async () => {
    try {
      return await apiFetch<IntegrityAttemptSession>(`/api/v1/chapters/${encodeURIComponent(chapterId)}/integrity`, { method: "POST" });
    } catch {
      return null;
    }
  }, [chapterId]);

  useEffect(() => {
    if (!enabled) return;
    finishedRef.current = false;
    setDone(false);
    cameraSessionRef.current?.reopen();
    queueRef.current ??= new IntegrityQueue(`buildment:integrity-queue:${chapterId}`, storage());
    let cancelled = false;
    let retry: number | null = null;

    const open = async () => {
      const next = await openAttempt();
      if (cancelled) return;
      if (!next) {
        retry = window.setTimeout(open, REOPEN_MS);
        return;
      }
      applySession(next);
      // A tab that was hidden when the page died (power cut, killed app) still counts.
      const stale = readPending(hiddenKey);
      if (stale) {
        record("TAB_HIDDEN", { closed: true }, { at: new Date(stale.at), attemptId: stale.attemptId, quiet: true });
        writePending(hiddenKey, null);
      }
      let started = next.questionsShown;
      try {
        // A proctored quiz asks for Start on every attempt; only the server says it was pressed.
        if (!next.proctored) started ||= storage()?.getItem(introKey(next.attemptId)) === "1";
      } catch {
        // Storage is optional; the server already said whether Start was pressed.
      }
      // The server already locked this attempt (the limit was reached before a reload): hand the answers in.
      if (next.locked) reachLimit();
      cameraStatusRef.current = next.camera.status;
      setCameraStatus(next.camera.status);
      if (!started && !next.locked) setDialog("intro");
      void flush();
    };
    void open();
    return () => {
      cancelled = true;
      if (retry) window.clearTimeout(retry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, chapterId]);

  // --- Camera -------------------------------------------------------------------------------

  /** Tells the server the camera state, retrying a couple of times so the mentor's view does not drift. */
  const putCamera = useCallback(async (status: Exclude<IntegrityCameraStatus, "NOT_REQUESTED">): Promise<boolean> => {
    const attemptId = attemptIdRef.current;
    if (!attemptId) return false;
    for (let attempt = 0; ; attempt += 1) {
      try {
        await apiFetch(`/api/v1/integrity/attempts/${encodeURIComponent(attemptId)}/camera`, { method: "PUT", json: { status } });
        return true;
      } catch {
        // Advisory on a normal quiz: the CAMERA_* events tell the same story if this never lands.
        const wait = CAMERA_PUT_RETRY_MS[attempt];
        if (wait === undefined || cameraStatusRef.current !== status || attemptIdRef.current !== attemptId) return false;
        await new Promise((resolve) => window.setTimeout(resolve, wait));
      }
    }
  }, []);

  const cameraSession = useCallback(() => {
    cameraSessionRef.current ??= new CameraSession(
      typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia
        ? (constraints) => navigator.mediaDevices.getUserMedia(constraints)
        : null,
      {
        // getUserMedia only exists on https or localhost: a LAN address gets a message that says so.
        unavailable: typeof window !== "undefined" && window.isSecureContext === false ? "insecure" : "unsupported",
        hasCamera: async () => {
          const devices = await navigator.mediaDevices?.enumerateDevices?.();
          return !devices || devices.some((device) => device.kind === "videoinput");
        },
      },
    );
    return cameraSessionRef.current;
  }, []);

  const stopStream = useCallback(() => {
    if (snapshotTimer.current) window.clearTimeout(snapshotTimer.current);
    if (snapshotInterval.current) window.clearInterval(snapshotInterval.current);
    snapshotTimer.current = null;
    snapshotInterval.current = null;
    cameraSessionRef.current?.stop();
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  /** Callback ref for the preview element; snapshots are drawn from it. */
  const attachVideo = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    const stream = cameraSessionRef.current?.current ?? null;
    if (element && stream && element.srcObject !== stream) {
      element.srcObject = stream;
      void element.play().catch(() => undefined);
    }
  }, []);

  const setCamera = useCallback((status: IntegrityCameraStatus) => {
    cameraStatusRef.current = status;
    setCameraStatus(status);
  }, []);

  const cameraUnavailable = useCallback((reason: string) => {
    // A muted track can come back by itself, so its stream is kept; any other loss needs a new start.
    if (reason !== "muted") stopStream();
    setCameraIssue(reason);
    if (cameraStatusRef.current === "UNAVAILABLE") return;
    setCamera("UNAVAILABLE");
    void putCamera("UNAVAILABLE");
    record("CAMERA_OFF", { reason }, { quiet: true });
    if (cameraRequiredRef.current) {
      // A proctored quiz needs the camera: losing it counts like leaving the screen and covers the quiz.
      if (armedRef.current) {
        setCameraLost(true);
        record("CAMERA_LOST", { reason }, { quiet: true });
      }
      return;
    }
    showNotice("Your camera is off. You can keep going with the quiz.");
  }, [putCamera, record, setCamera, showNotice, stopStream]);

  const uploadSnapshot = useCallback(async () => {
    if (finishedRef.current) return;
    const attemptId = attemptIdRef.current;
    const video = videoRef.current;
    const track = cameraSessionRef.current?.current?.getVideoTracks()[0];
    if (!attemptId || !video || !track || track.readyState !== "live") return;
    if (document.visibilityState === "hidden" || navigator.onLine === false) return;
    if (video.readyState < 2 || !video.videoWidth) return;

    const { snapshotWidth: width, snapshotHeight: height, snapshotMaxBytes } = INTEGRITY_LIMITS;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Cover-crop to 4:3 so every still is the same small size.
    const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
    const drawWidth = video.videoWidth * scale;
    const drawHeight = video.videoHeight * scale;
    context.drawImage(video, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    const toJpeg = (quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    let blob = await toJpeg(0.55);
    if (blob && blob.size > snapshotMaxBytes) blob = await toJpeg(0.3);
    if (!blob || blob.size > snapshotMaxBytes || finishedRef.current) return;
    try {
      await fetch(`/api/v1/integrity/attempts/${encodeURIComponent(attemptId)}/snapshots`, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: blob,
        credentials: "same-origin",
      });
    } catch {
      // A missed still is fine; the next one is a minute away.
    }
  }, []);

  const scheduleSnapshots = useCallback(() => {
    if (snapshotTimer.current) window.clearTimeout(snapshotTimer.current);
    if (snapshotInterval.current) window.clearInterval(snapshotInterval.current);
    const intervalMs = (session?.camera.intervalSeconds ?? INTEGRITY_LIMITS.snapshotIntervalSeconds) * 1000;
    snapshotTimer.current = window.setTimeout(() => {
      void uploadSnapshot();
      snapshotInterval.current = window.setInterval(() => void uploadSnapshot(), intervalMs);
    }, FIRST_SNAPSHOT_MS);
  }, [session?.camera.intervalSeconds, uploadSnapshot]);

  /** Turns the camera on. True when it is live and the server has been told (a proctored quiz needs both to start). */
  const startCamera = useCallback(async (options: { silent?: boolean } = {}): Promise<boolean> => {
    if (!(session?.camera.enabled || session?.camera.required) || finishedRef.current) return false;
    if (!options.silent) setCameraStarting(true);
    const result = await cameraSession().start(
      (reason: CameraLoss) => lostRef.current(reason),
      {
        onRestored: () => {
          // A muted camera came back by itself.
          setCameraIssue(null);
          setCamera("ON");
          setCameraLost(false);
          void putCamera("ON");
        },
      },
    );
    if (!options.silent) setCameraStarting(false);
    // The quiz may have finished, or the page left, while the browser asked for permission.
    if (result.status === "cancelled" || finishedRef.current) return false;
    if (result.status === "failed") {
      // A silent restart that fails is handled by the caller as a real loss.
      if (!options.silent) cameraUnavailable(result.reason);
      return false;
    }
    setCameraIssue(null);
    setCameraLost(false);
    if (videoRef.current) {
      videoRef.current.srcObject = result.stream;
      void videoRef.current.play().catch(() => undefined);
    }
    setCamera("ON");
    if (!options.silent) record("CAMERA_ON", undefined, { quiet: true });
    // Taking the permission away while the quiz runs is a loss, even if the track lingers.
    cameraSession().watchPermission(typeof navigator === "undefined" ? undefined : navigator.permissions, () => lostRef.current("denied"));
    if (options.silent) return true;
    // Stills are an opt-in the course makes separately; the on-device check never uploads anything.
    if (session?.camera.enabled) scheduleSnapshots();
    return putCamera("ON");
  }, [cameraSession, cameraUnavailable, putCamera, record, scheduleSnapshots, session?.camera.enabled, session?.camera.required, setCamera]);

  // The browser sometimes ends a camera track by itself for a moment (the device restarts when the window goes
  // full screen, or the driver resets). That is not the learner's doing, so a lost camera gets up to three quiet
  // restarts a minute before it counts as a loss. Taking the permission away or covering the lens still counts.
  useEffect(() => {
    lostRef.current = (reason: CameraLoss) => {
      const recoverable = (reason === "stopped" || reason === "frozen") && cameraRequiredRef.current;
      const now = Date.now();
      recoveries.current = recoveries.current.filter((at) => now - at < 60_000);
      if (!recoverable || recovering.current || recoveries.current.length >= 3) {
        if (!recovering.current) cameraUnavailable(reason);
        return;
      }
      recoveries.current.push(now);
      recovering.current = true;
      void (async () => {
        let revived = false;
        try {
          // The device can be busy for a moment while the window changes state: try again before giving up.
          for (let attempt = 0; attempt < 3 && !revived && !finishedRef.current; attempt += 1) {
            if (attempt > 0) await new Promise((resolve) => window.setTimeout(resolve, 1_000));
            revived = await startCamera({ silent: true });
          }
        } finally {
          recovering.current = false;
        }
        if (!revived && !finishedRef.current) cameraUnavailable(reason);
      })();
    };
  });

  /** The learner said no, or turned the camera off: noted for the mentor, never a penalty. */
  const declineCamera = useCallback((reason: "declined" | "learner") => {
    stopStream();
    if (!session?.camera.enabled || cameraStatusRef.current === "DECLINED") return;
    setCameraIssue(null);
    setCamera("DECLINED");
    void putCamera("DECLINED");
    record("CAMERA_OFF", { reason }, { quiet: true });
  }, [putCamera, record, session?.camera.enabled, setCamera, stopStream]);

  // Resume the camera after a reload (or on the next attempt) when the learner had said yes.
  useEffect(() => {
    if (!(session?.camera.enabled || session?.camera.required) || dialog === "intro" || cameraSessionRef.current?.current || finishedRef.current) return;
    if (cameraStatusRef.current === "ON") void startCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.attemptId, dialog]);

  // Leaving the page always releases the camera, even mid permission prompt.
  useEffect(() => () => {
    cameraSessionRef.current?.close();
    stopStream();
  }, [stopStream]);

  /** Tells the server Start was pressed, retrying a few times on a weak connection. */
  const unlockQuestions = useCallback(async (attemptId: string) => {
    setStarting(true);
    for (let tries = 0; tries < 4; tries += 1) {
      try {
        const result = await apiFetch<{ questionsShown: boolean }>(`/api/v1/integrity/attempts/${encodeURIComponent(attemptId)}/begin`, { method: "POST" });
        setStarting(false);
        // A locked attempt stays locked: the server says no, and the quiz stays closed.
        setQuestionsShown(result.questionsShown);
        return;
      } catch {
        await new Promise((resolve) => window.setTimeout(resolve, 1500 * (tries + 1)));
      }
    }
    setStarting(false);
    showNotice("We could not start your quiz. Check your connection and press Start again.");
    setDialog("intro");
  }, [apiFetch, showNotice]);

  /** Closes the intro. `withCamera` is the learner's consent choice; saying no never blocks the quiz. */
  const begin = useCallback(async (withCamera: boolean) => {
    const attemptId = attemptIdRef.current;
    if (session?.camera.required) {
      // A proctored quiz does not start until the camera is live. If it is not, the dialog stays open
      // with the reason and the learner can try again. The camera comes first: some browsers restart the
      // capture device while the window goes full screen, and that must not be mistaken for a loss.
      setStarting(true);
      const live = await startCamera();
      if (!live) {
        setStarting(false);
        return;
      }
    }
    // Full screen needs the click that called this (it stays valid for a few seconds).
    if (fullscreenSupported() && !document.fullscreenElement) {
      requestQuizFullscreen();
      if (session?.proctored) await waitForFullscreen();
    }
    if (attemptId && !session?.proctored) {
      try {
        storage()?.setItem(introKey(attemptId), "1");
      } catch {
        // Then the intro shows again on reload, which is harmless.
      }
    }
    setDialog(null);
    if (attemptId) void unlockQuestions(attemptId);
    if (session?.camera.required || !session?.camera.enabled) return;
    if (withCamera) void startCamera();
    else declineCamera("declined");
  }, [declineCamera, session?.camera.enabled, session?.camera.required, session?.proctored, startCamera, unlockQuestions]);

  // --- Browser signals ----------------------------------------------------------------------

  useEffect(() => {
    if (!enabled || !session) return;
    const root = rootRef.current;

    const flagHiddenReturn = () => {
      const pending = readPending(hiddenKey);
      if (!pending) return;
      writePending(hiddenKey, null);
      record("TAB_HIDDEN", { awayMs: Date.now() - pending.at }, { at: new Date(pending.at), attemptId: pending.attemptId });
    };

    // Proctored quiz: a leave is noted the moment it starts (not when the learner comes back), once per
    // leave and return, from whichever signal arrives first. Window blur, a hidden tab, a native blur and
    // a focus poll all feed this; the server counts what is reported.
    const goneAway = (type: IntegrityEventType, at: number, meta?: Record<string, string | number | boolean>) => {
      if (!armedRef.current || awayRef.current || at < suppressUntil.current || Date.now() < suppressUntil.current) return;
      awayRef.current = true;
      record(type, meta, { at: new Date(at) });
    };
    const cameBack = () => {
      if (document.visibilityState === "visible" && document.hasFocus()) awayRef.current = false;
    };

    const onVisibility = () => {
      if (finishedRef.current) return;
      if (proctoredRef.current) {
        if (document.visibilityState === "hidden") goneAway("TAB_HIDDEN", Date.now());
        else cameBack();
        void flush(document.visibilityState === "hidden");
        return;
      }
      if (document.visibilityState === "hidden") {
        blurStart.current = null;
        mouseOutStart.current = null;
        if (attemptIdRef.current && (!proctoredRef.current || armedRef.current)) writePending(hiddenKey, { attemptId: attemptIdRef.current, at: Date.now() });
        void flush(true);
      } else {
        flagHiddenReturn();
        void flush();
      }
    };

    const onPageHide = () => {
      const pending = readPending(hiddenKey);
      if (pending) {
        writePending(hiddenKey, null);
        record("TAB_HIDDEN", { awayMs: Date.now() - pending.at, closed: true }, { at: new Date(pending.at), attemptId: pending.attemptId, quiet: true });
      }
      void flush(true);
    };

    const onBlur = () => {
      const at = Date.now();
      if (proctoredRef.current) {
        window.setTimeout(() => {
          if (document.visibilityState === "hidden" || document.hasFocus()) return;
          if (document.activeElement instanceof HTMLIFrameElement) return; // Focus moved into an embed on the page.
          goneAway("WINDOW_BLUR", at);
        }, 250);
        return;
      }
      // Let visibilitychange land first: a hidden tab is already its own signal.
      window.setTimeout(() => {
        if (document.visibilityState === "hidden" || at < suppressUntil.current) return;
        if (document.activeElement instanceof HTMLIFrameElement) return; // Focus moved into an embed on the page.
        blurStart.current = at;
      }, 250);
    };

    const onFocus = () => {
      if (proctoredRef.current) {
        cameBack();
        return;
      }
      const start = blurStart.current;
      blurStart.current = null;
      if (start === null || document.visibilityState === "hidden") return;
      const awayMs = Date.now() - start;
      if (awayMs >= MIN_BLUR_MS && start >= suppressUntil.current) record("WINDOW_BLUR", { awayMs }, { at: new Date(start) });
    };

    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      if (document.fullscreenElement) {
        wasFullscreen.current = true;
        setFullscreenPrompt(false);
        return;
      }
      if (!wasFullscreen.current || finishedRef.current) return;
      wasFullscreen.current = false;
      record("FULLSCREEN_EXIT", undefined, { quiet: true });
      // A proctored quiz covers the page until full screen is back, so the soft reminder is not used there.
      if (!proctoredRef.current && fullscreenPromptAllowed({ supported: fullscreenSupported(), dismissals: fullscreenDismissals.current })) setFullscreenPrompt(true);
    };

    // A proctored quiz blocks these anywhere on the page, not only inside the quiz.
    const blockTarget: EventTarget | null = proctoredRef.current ? document : root;
    const block = (type: IntegrityEventType) => (event: Event) => {
      if (finishedRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      record(type);
    };
    const onCopy = block("COPY_BLOCKED");
    const onPaste = block("PASTE_BLOCKED");
    const onContextMenu = block("CONTEXT_MENU_BLOCKED");
    const onDrop = (event: Event) => {
      const drag = event as DragEvent;
      if (finishedRef.current || !drag.dataTransfer?.types.includes("text/plain")) return;
      event.preventDefault();
      event.stopPropagation();
      record("PASTE_BLOCKED", { via: "drop" });
    };

    const onKey = (event: KeyboardEvent) => {
      const combo = screenshotCombo(event);
      if (combo) record("SCREENSHOT_KEY", { combo });
      if (!armedRef.current || event.type !== "keydown") return;
      const blocked = proctoredKeyAction(event);
      if (!blocked) return;
      event.preventDefault();
      record(blocked, { via: "key" });
    };
    const onBeforePrint = () => {
      if (armedRef.current) record("PRINT_BLOCKED", { via: "menu" });
    };
    // A page cannot stop the tab from closing, but the browser asks first.
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!armedRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    // Back button: swallow the step back, return to the quiz, and note it.
    const onPopState = (event: PopStateEvent) => {
      if (!armedRef.current && swallowPop.current === 0) return;
      event.stopImmediatePropagation();
      if (swallowPop.current > 0) {
        swallowPop.current -= 1;
        return;
      }
      swallowPop.current = 1;
      window.history.go(1);
      record("NAVIGATION_BLOCKED", { via: "back" });
    };

    const finePointer = window.matchMedia?.("(pointer: fine)").matches ?? false;
    const onMouseLeave = () => {
      if (document.visibilityState === "visible") mouseOutStart.current = Date.now();
    };
    const onMouseEnter = () => {
      const start = mouseOutStart.current;
      mouseOutStart.current = null;
      if (start === null || blurStart.current !== null) return;
      const outMs = Date.now() - start;
      if (outMs >= MIN_MOUSE_OUT_MS) record("MOUSE_LEFT", { outMs }, { at: new Date(start), quiet: true });
    };

    // Window Management API (Chromium): one bit, no permission prompt.
    const screenInfo = window.screen as Screen & {
      isExtended?: boolean;
      addEventListener?: (type: "change", listener: () => void) => void;
      removeEventListener?: (type: "change", listener: () => void) => void;
    };
    const checkScreens = () => {
      if (screenInfo.isExtended === true && !secondScreenFlagged.current) {
        secondScreenFlagged.current = true;
        try {
          if (attemptIdRef.current) storage()?.setItem(`buildment:integrity-screen:${attemptIdRef.current}`, "1");
        } catch {
          // Storage is optional.
        }
        record("SECOND_SCREEN", { extended: true });
      }
    };
    checkScreens();

    wasFullscreen.current = Boolean(document.fullscreenElement);
    flagHiddenReturn();

    setIsFullscreen(Boolean(document.fullscreenElement));
    // Some shells never send a blur: look at the focus itself, twice a second, while a proctored quiz runs.
    const focusPoll = window.setInterval(() => {
      if (!proctoredRef.current || !armedRef.current) return;
      if (document.visibilityState === "hidden") goneAway("TAB_HIDDEN", Date.now(), { via: "poll" });
      else if (!document.hasFocus()) goneAway("WINDOW_BLUR", Date.now(), { via: "poll" });
      else cameBack();
    }, FOCUS_POLL_MS);
    // The desktop app reports what its window does (blur, focus, leaving full screen) from the main process.
    const stopNative = windowEvents?.((event) => {
      if (!proctoredRef.current || !armedRef.current) return;
      if (event === "blur") goneAway("WINDOW_BLUR", Date.now(), { via: "native" });
      else if (event === "minimize") goneAway("TAB_HIDDEN", Date.now(), { via: "native" });
      else if (event === "focus") awayRef.current = false;
      else if (event === "leave-full-screen") record("FULLSCREEN_EXIT", { via: "native" }, { quiet: true });
    });
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("popstate", onPopState, true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onKey, true);
    blockTarget?.addEventListener("copy", onCopy, true);
    blockTarget?.addEventListener("cut", onCopy, true);
    blockTarget?.addEventListener("paste", onPaste, true);
    blockTarget?.addEventListener("contextmenu", onContextMenu, true);
    blockTarget?.addEventListener("drop", onDrop, true);
    if (finePointer) {
      document.documentElement.addEventListener("mouseleave", onMouseLeave);
      document.documentElement.addEventListener("mouseenter", onMouseEnter);
    }
    screenInfo.addEventListener?.("change", checkScreens);
    const flushTimer = window.setInterval(() => void flush(), FLUSH_MS);
    const onOnline = () => void flush();
    window.addEventListener("online", onOnline);

    return () => {
      window.clearInterval(focusPoll);
      stopNative?.();
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("popstate", onPopState, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("keyup", onKey, true);
      blockTarget?.removeEventListener("copy", onCopy, true);
      blockTarget?.removeEventListener("cut", onCopy, true);
      blockTarget?.removeEventListener("paste", onPaste, true);
      blockTarget?.removeEventListener("contextmenu", onContextMenu, true);
      blockTarget?.removeEventListener("drop", onDrop, true);
      if (finePointer) {
        document.documentElement.removeEventListener("mouseleave", onMouseLeave);
        document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      }
      screenInfo.removeEventListener?.("change", checkScreens);
      window.clearInterval(flushTimer);
      window.removeEventListener("online", onOnline);
      void flush(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, session?.attemptId]);

  // --- Calls from the quiz ------------------------------------------------------------------

  /** Runs `action` (for example a native confirm dialog) without counting the focus it steals. */
  const withoutFlags = useCallback(<T,>(action: () => T): T => {
    suppressUntil.current = Number.MAX_SAFE_INTEGER;
    try {
      return action();
    } finally {
      suppressUntil.current = Date.now() + 500;
      blurStart.current = null;
    }
  }, []);

  /** Notes answers that came in far faster than the questions can be read. */
  const checkPace = useCallback((blockIds: string[]) => {
    const root = rootRef.current;
    if (!root || blockIds.length === 0 || finishedRef.current) return;
    const words = blockIds.reduce((total, blockId) => {
      const step = root.querySelector<HTMLElement>(`[data-integrity-step="${CSS.escape(blockId)}"]`);
      return total + countWords(step?.textContent ?? "");
    }, 0);
    const elapsedMs = Date.now() - paceStart.current;
    if (isFastAnswer(elapsedMs, words, blockIds.length)) {
      record("FAST_ANSWER", { elapsedMs, words, questions: blockIds.length }, { at: new Date() });
    }
  }, [record, rootRef]);

  /** After a submit that was not perfect: the next try is a new attempt. */
  const nextAttempt = useCallback(async () => {
    if (finishedRef.current) return;
    await flush();
    const next = await openAttempt();
    if (!next || finishedRef.current) return;
    try {
      if (!next.proctored) storage()?.setItem(introKey(next.attemptId), "1");
    } catch {
      // Harmless.
    }
    applySession(next);
    if (next.camera.required) {
      // The attempt is over: the camera goes off now and is asked for again at the next Start.
      stopStream();
      setCameraLost(false);
      setCamera("NOT_REQUESTED");
      return;
    }
    const status = cameraStatusRef.current;
    if (next.camera.enabled && status !== "NOT_REQUESTED" && status !== next.camera.status) void putCamera(status);
  }, [applySession, flush, openAttempt, putCamera, setCamera, stopStream]);

  /** The quiz is complete: stop watching (leaving full screen now is expected) and release the camera. */
  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setDone(true);
    setFullscreenPrompt(false);
    writePending(hiddenKey, null);
    cameraSessionRef.current?.close();
    stopStream();
    void flush(true);
  }, [flush, hiddenKey, stopStream]);

  // A quiz that is (or becomes) complete stops watching and frees the camera, including
  // chapters with individual activities, where the submit path never calls finish().
  useEffect(() => {
    if (!enabled) finish();
  }, [enabled, finish]);

  // The proof the server wants: while a proctored quiz runs, tell it every few seconds that the camera is live.
  // It only sends it after looking at the track itself (live, not muted, frames moving), and it stops the
  // moment that is no longer true, so a lapse hides the questions on the server too.
  useEffect(() => {
    if (!armed || !session?.camera.required || cameraStatus !== "ON") return;
    const attemptId = session.attemptId;
    const live = () => {
      const track = cameraSessionRef.current?.current?.getVideoTracks()[0];
      return Boolean(track && track.readyState === "live" && !track.muted);
    };
    const beat = () => {
      if (!live() || document.visibilityState === "hidden") return;
      void apiFetch(`/api/v1/integrity/attempts/${encodeURIComponent(attemptId)}/heartbeat`, { method: "POST" }).catch(() => undefined);
    };
    beat();
    const timer = window.setInterval(beat, PROCTORED_RULE.cameraHeartbeatSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [armed, cameraStatus, apiFetch, session?.attemptId, session?.camera.required]);

  // Do not wait for the browser to say the camera ended: look at the track and the picture once a second.
  // A device that is unplugged or frozen does not always send an event.
  useEffect(() => {
    if (!armed || !session?.camera.required || cameraStatus !== "ON") return;
    let lastTime = -1;
    let lastMoved = Date.now();
    const timer = window.setInterval(() => {
      const stream = cameraSessionRef.current?.current;
      const track = stream?.getVideoTracks()[0];
      if (!track || track.readyState !== "live") {
        lostRef.current("stopped");
        return;
      }
      const video = videoRef.current;
      if (!video || video.paused || document.visibilityState === "hidden") {
        lastMoved = Date.now();
        return;
      }
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        lastMoved = Date.now();
      } else if (Date.now() - lastMoved > FROZEN_MS) {
        lastMoved = Date.now();
        lostRef.current("frozen");
      }
    }, 1_000);
    return () => window.clearInterval(timer);
  }, [armed, cameraStatus, session?.camera.required]);

  // A light face check, only where the browser has a native FaceDetector, and only on this device: the
  // frames are looked at and thrown away, and only a flag with a time is kept. Without it, this is skipped.
  useEffect(() => {
    if (!armed || !session?.camera.required || cameraStatus !== "ON") {
      setFaceCheck(false);
      return;
    }
    const Detector = faceDetectorClass();
    if (!Detector) {
      setFaceCheck(false);
      return;
    }
    const detector = new Detector({ fastMode: true, maxDetectedFaces: 4 });
    const watch = new FaceWatch();
    setFaceCheck(true);
    const timer = window.setInterval(() => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || document.visibilityState === "hidden") return;
      detector
        .detect(video)
        .then((faces) => {
          const flag = watch.observe(faces.length, Date.now());
          if (flag) record(flag, { faces: faces.length });
        })
        .catch(() => {
          // The detector failed: stop checking rather than flag the learner for it.
          window.clearInterval(timer);
          setFaceCheck(false);
        });
    }, FACE_CHECK_MS);
    return () => window.clearInterval(timer);
  }, [armed, cameraStatus, record, session?.camera.required]);

  // The page styles and the reader shell follow this: no printing, no text selection, no way out by shortcut.
  useEffect(() => {
    if (!armed) return;
    document.documentElement.dataset.quizLock = "1";
    window.dispatchEvent(new CustomEvent("buildment:quiz-lock", { detail: true }));
    return () => {
      delete document.documentElement.dataset.quizLock;
      window.dispatchEvent(new CustomEvent("buildment:quiz-lock", { detail: false }));
    };
  }, [armed]);

  /** Closes the warning and puts the learner back in full screen (a click is the gesture it needs). */
  const acknowledgeLeave = useCallback(() => {
    setLeaveWarning(null);
    if (fullscreenSupported() && !document.fullscreenElement) requestQuizFullscreen();
  }, []);

  const returnToFullscreen = useCallback(() => {
    setFullscreenPrompt(false);
    requestQuizFullscreen();
  }, []);

  const dismissFullscreenPrompt = useCallback(() => {
    fullscreenDismissals.current += 1;
    setFullscreenPrompt(false);
  }, []);

  return useMemo(
    () => ({
      active: Boolean(session) && enabled,
      session,
      flagCount: serverFlags + pendingFlags,
      notice,
      dismissNotice: () => setNotice(null),
      fullscreenPrompt,
      returnToFullscreen,
      dismissFullscreenPrompt,
      fullscreenSupported: fullscreenSupported(),
      camera: {
        required: Boolean(session?.camera.required),
        enabled: Boolean(session?.camera.enabled),
        status: cameraStatus,
        starting: cameraStarting,
        issue: cameraIssue,
        turnOff: () => declineCamera("learner"),
        attachVideo,
        start: startCamera,
      },
      dialog,
      /** False while a quiz chapter waits for Start. A finished quiz is never locked. */
      questionsShown: questionsShown || !enabled,
      /** The strict kind of quiz: see PROCTORED_RULE. A normal quiz leaves all of this off. */
      proctored,
      /** Between Start and the end of the attempt, when leaving the quiz screen counts. */
      armed,
      leaves,
      leaveWarning,
      /** A proctored quiz whose camera stopped: covered until it is live again. */
      cameraLost: cameraLost && armed,
      /** The on-device face check is running (the browser has a FaceDetector). */
      faceCheck,
      /** This browser has a native FaceDetector, so the face check can run. */
      faceCheckAvailable: faceDetectorClass() !== null,
      /** The learner left too many times (here, or the server says so): the reader must hand their answers in. */
      limitReached: locked,
      starting,
      acknowledgeLeave,
      /** Proctored and full screen is gone: the quiz stays covered until it is back. */
      needsFullscreen: armed && fullscreenSupported() && !isFullscreen,
      openIntro: () => setDialog("intro"),
      openInfo: () => setDialog("info"),
      closeInfo: () => setDialog((current) => (current === "info" ? null : current)),
      begin,
      withoutFlags,
      checkPace,
      nextAttempt,
      finish,
    }),
    [cameraLost, faceCheck, starting, acknowledgeLeave, armed, isFullscreen, leaveWarning, leaves, locked, proctored, attachVideo, begin, cameraIssue, cameraStarting, cameraStatus, checkPace, declineCamera, dismissFullscreenPrompt, enabled, finish, fullscreenPrompt, dialog, nextAttempt, notice, pendingFlags, questionsShown, returnToFullscreen, serverFlags, session, startCamera, withoutFlags],
  );
}

export type QuizIntegrity = ReturnType<typeof useQuizIntegrity>;
