// Owns the camera stream for a proctored quiz, apart from React, so its lifecycle
// can be unit tested: a stream that arrives after the quiz ended or the page left
// is stopped at once, and nothing keeps the camera light on by accident.

export type CameraFailure = "denied" | "no-camera" | "unsupported" | "insecure" | "error";

/** Why a camera that was live is not any more. */
export type CameraLoss = "stopped" | "muted" | "denied" | "frozen";

/** A track that stays muted this long counts as lost (short mutes happen when a device wakes up). */
const MUTED_GRACE_MS = 2_000;

export type CameraStartResult =
  | { status: "on"; stream: MediaStream }
  | { status: "failed"; reason: CameraFailure }
  | { status: "cancelled" };

type GetUserMedia = (constraints: MediaStreamConstraints) => Promise<MediaStream>;

const CONSTRAINTS: MediaStreamConstraints = {
  video: { width: { ideal: 320 }, height: { ideal: 240 }, frameRate: { ideal: 5, max: 10 }, facingMode: "user" },
  audio: false,
};

function stopTracks(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function failureReason(error: unknown): CameraFailure {
  const name = error instanceof Error || (typeof error === "object" && error !== null && "name" in error)
    ? String((error as { name: unknown }).name)
    : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "denied";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "no-camera";
  return "error";
}

export class CameraSession {
  private stream: MediaStream | null = null;
  /** Bumped by every start and stop, so a slow getUserMedia can tell it was overtaken. */
  private generation = 0;
  private closed = false;

  /**
   * `unavailable` says why there is no getUserMedia (an insecure page has none). `hasCamera` looks for a
   * video device before asking, so a laptop without one gets a clear message instead of a vague error.
   */
  constructor(
    private readonly getUserMedia: GetUserMedia | null,
    private readonly options: { unavailable?: "unsupported" | "insecure"; hasCamera?: () => Promise<boolean> } = {},
  ) {}

  get current(): MediaStream | null {
    return this.stream;
  }

  get isClosed(): boolean {
    return this.closed;
  }

  private stopWatching: (() => void) | null = null;

  /**
   * `onLost` runs if the device stops on its own (unplugged, taken by another app) or stays
   * muted; `onRestored` runs when a muted track comes back.
   */
  async start(onLost: (reason: CameraLoss) => void, options: { onRestored?: () => void; mutedGraceMs?: number } = {}): Promise<CameraStartResult> {
    if (this.closed) return { status: "cancelled" };
    if (!this.getUserMedia) return { status: "failed", reason: this.options.unavailable ?? "unsupported" };
    // Starting again replaces the stream for good: never keep two captures of one device alive.
    const generation = ++this.generation;
    try {
      if (this.options.hasCamera && !(await this.options.hasCamera())) {
        return generation === this.generation && !this.closed ? { status: "failed", reason: "no-camera" } : { status: "cancelled" };
      }
    } catch {
      // Listing devices can fail before permission; asking for the camera will say what is wrong.
    }
    if (generation !== this.generation || this.closed) return { status: "cancelled" };
    let stream: MediaStream;
    try {
      stream = await this.getUserMedia(CONSTRAINTS);
    } catch (error) {
      if (generation !== this.generation || this.closed) return { status: "cancelled" };
      return { status: "failed", reason: failureReason(error) };
    }
    if (generation !== this.generation || this.closed) {
      stopTracks(stream);
      return { status: "cancelled" };
    }
    stopTracks(this.stream);
    this.stream = stream;
    const track = stream.getVideoTracks()[0];
    let muteTimer: ReturnType<typeof setTimeout> | null = null;
    let lostByMute = false;
    track?.addEventListener("ended", () => {
      if (this.stream === stream) onLost("stopped");
    });
    track?.addEventListener("mute", () => {
      if (muteTimer) clearTimeout(muteTimer);
      muteTimer = setTimeout(() => {
        if (this.stream !== stream) return;
        lostByMute = true;
        onLost("muted");
      }, options.mutedGraceMs ?? MUTED_GRACE_MS);
    });
    track?.addEventListener("unmute", () => {
      if (muteTimer) clearTimeout(muteTimer);
      muteTimer = null;
      if (lostByMute && this.stream === stream) {
        lostByMute = false;
        options.onRestored?.();
      }
    });
    return { status: "on", stream };
  }

  /** Calls `onDenied` if the browser permission is taken away while the camera is in use. */
  watchPermission(permissions: Pick<Permissions, "query"> | undefined, onDenied: () => void): void {
    this.stopWatching?.();
    this.stopWatching = null;
    if (!permissions) return;
    let active = true;
    let status: PermissionStatus | null = null;
    const onChange = () => {
      if (active && status?.state === "denied") onDenied();
    };
    permissions
      .query({ name: "camera" as PermissionName })
      .then((result) => {
        if (!active) return;
        status = result;
        result.addEventListener("change", onChange);
      })
      .catch(() => undefined); // Not every browser can report camera permission; the track events still work.
    this.stopWatching = () => {
      active = false;
      status?.removeEventListener("change", onChange);
    };
  }

  /** Turns the camera off; a start still in flight is discarded when it lands. */
  stop(): void {
    this.stopWatching?.();
    this.stopWatching = null;
    this.generation += 1;
    stopTracks(this.stream);
    this.stream = null;
  }

  /** For good: the quiz finished or the page is leaving. */
  close(): void {
    this.closed = true;
    this.stop();
  }

  reopen(): void {
    this.closed = false;
  }
}
