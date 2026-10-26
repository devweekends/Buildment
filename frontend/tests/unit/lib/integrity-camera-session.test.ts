import { afterEach, describe, expect, it, vi } from "vitest";
import { CameraSession } from "@/lib/integrity/camera-session";
import { fullscreenPromptAllowed } from "@/lib/integrity/signals";

// Minimal stand-ins for MediaStream and its video track.
function fakeStream() {
  const listeners: Record<string, () => void> = {};
  const track = {
    stopped: false,
    stop() {
      this.stopped = true;
    },
    addEventListener(type: string, listener: () => void) {
      listeners[type] = listener;
    },
  };
  const stream = { getTracks: () => [track], getVideoTracks: () => [track] } as unknown as MediaStream;
  return { stream, track, end: () => listeners.ended?.(), fire: (type: string) => listeners[type]?.() };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("CameraSession", () => {
  it("turns the camera on and off", async () => {
    const { stream, track } = fakeStream();
    const session = new CameraSession(async () => stream);
    expect(await session.start(() => undefined)).toEqual({ status: "on", stream });
    expect(session.current).toBe(stream);
    session.stop();
    expect(track.stopped).toBe(true);
    expect(session.current).toBeNull();
  });

  it("stops a stream that arrives after the page left (closed mid permission prompt)", async () => {
    const pending = deferred<MediaStream>();
    const session = new CameraSession(() => pending.promise);
    const starting = session.start(() => undefined);
    session.close();
    const { stream, track } = fakeStream();
    pending.resolve(stream);
    expect(await starting).toEqual({ status: "cancelled" });
    expect(track.stopped).toBe(true);
    expect(session.current).toBeNull();
  });

  it("stops a stream that arrives after the learner turned the camera off", async () => {
    const pending = deferred<MediaStream>();
    const session = new CameraSession(() => pending.promise);
    const starting = session.start(() => undefined);
    session.stop();
    const { stream, track } = fakeStream();
    pending.resolve(stream);
    expect((await starting).status).toBe("cancelled");
    expect(track.stopped).toBe(true);
  });

  it("does not start once closed until reopened", async () => {
    const getUserMedia = vi.fn(async () => fakeStream().stream);
    const session = new CameraSession(getUserMedia);
    session.close();
    expect(await session.start(() => undefined)).toEqual({ status: "cancelled" });
    expect(getUserMedia).not.toHaveBeenCalled();
    session.reopen();
    expect((await session.start(() => undefined)).status).toBe("on");
  });

  it("names why the camera failed", async () => {
    const denied = new CameraSession(async () => {
      throw Object.assign(new Error("no"), { name: "NotAllowedError" });
    });
    expect(await denied.start(() => undefined)).toEqual({ status: "failed", reason: "denied" });
    const missing = new CameraSession(async () => {
      throw Object.assign(new Error("none"), { name: "NotFoundError" });
    });
    expect(await missing.start(() => undefined)).toEqual({ status: "failed", reason: "no-camera" });
    expect(await new CameraSession(null).start(() => undefined)).toEqual({ status: "failed", reason: "unsupported" });
  });

  it("reports a device that stops on its own, but not one the session already replaced", async () => {
    const first = fakeStream();
    const second = fakeStream();
    const streams = [first.stream, second.stream];
    const session = new CameraSession(async () => streams.shift()!);
    const onEnded = vi.fn();
    await session.start(onEnded);
    await session.start(onEnded);
    first.end();
    expect(onEnded).not.toHaveBeenCalled();
    second.end();
    expect(onEnded).toHaveBeenCalledTimes(1);
  });
});

describe("fullscreenPromptAllowed", () => {
  it("never shows where full screen does not exist (iPhone Safari)", () => {
    expect(fullscreenPromptAllowed({ supported: false, dismissals: 0 })).toBe(false);
  });

  it("stops asking after two dismissals", () => {
    expect(fullscreenPromptAllowed({ supported: true, dismissals: 0 })).toBe(true);
    expect(fullscreenPromptAllowed({ supported: true, dismissals: 1 })).toBe(true);
    expect(fullscreenPromptAllowed({ supported: true, dismissals: 2 })).toBe(false);
  });
});

describe("CameraSession losses", () => {
  afterEach(() => vi.useRealTimers());

  it("reports a stopped device", async () => {
    const { stream, end } = fakeStream();
    const lost = vi.fn();
    await new CameraSession(async () => stream).start(lost);
    end();
    expect(lost).toHaveBeenCalledWith("stopped");
  });

  it("reports a track that stays muted, but not a short mute, and says when it comes back", async () => {
    vi.useFakeTimers();
    const { stream, fire } = fakeStream();
    const lost = vi.fn();
    const restored = vi.fn();
    await new CameraSession(async () => stream).start(lost, { onRestored: restored, mutedGraceMs: 2_000 });

    fire("mute");
    vi.advanceTimersByTime(1_000);
    fire("unmute");
    vi.advanceTimersByTime(5_000);
    expect(lost).not.toHaveBeenCalled();

    fire("mute");
    vi.advanceTimersByTime(2_000);
    expect(lost).toHaveBeenCalledWith("muted");
    fire("unmute");
    expect(restored).toHaveBeenCalledOnce();
  });

  it("reports permission taken away while the camera is in use", async () => {
    const session = new CameraSession(async () => fakeStream().stream);
    let change: (() => void) | undefined;
    const status = {
      state: "granted",
      addEventListener: (_type: string, listener: () => void) => {
        change = listener;
      },
      removeEventListener: () => undefined,
    };
    const denied = vi.fn();
    session.watchPermission({ query: async () => status as unknown as PermissionStatus }, denied);
    await Promise.resolve();
    await Promise.resolve();
    change?.();
    expect(denied).not.toHaveBeenCalled();
    status.state = "denied";
    change?.();
    expect(denied).toHaveBeenCalledOnce();
  });

  it("copes with a browser that cannot report camera permission", () => {
    const session = new CameraSession(null);
    expect(() => session.watchPermission(undefined, () => undefined)).not.toThrow();
    expect(() => session.watchPermission({ query: async () => Promise.reject(new Error("no")) }, () => undefined)).not.toThrow();
  });
});

describe("CameraSession detection", () => {
  it("says why there is no camera API (an insecure page, or an old browser)", async () => {
    expect(await new CameraSession(null, { unavailable: "insecure" }).start(() => undefined)).toEqual({ status: "failed", reason: "insecure" });
    expect(await new CameraSession(null).start(() => undefined)).toEqual({ status: "failed", reason: "unsupported" });
  });

  it("does not ask for the camera on a device that has none", async () => {
    const getUserMedia = vi.fn(async () => fakeStream().stream);
    const session = new CameraSession(getUserMedia, { hasCamera: async () => false });
    expect(await session.start(() => undefined)).toEqual({ status: "failed", reason: "no-camera" });
    expect(getUserMedia).not.toHaveBeenCalled();
  });

  it("still asks when listing devices fails, so the browser can say what is wrong", async () => {
    const { stream } = fakeStream();
    const session = new CameraSession(async () => stream, { hasCamera: async () => Promise.reject(new Error("blocked")) });
    expect(await session.start(() => undefined)).toEqual({ status: "on", stream });
  });

  it("maps a refused permission to denied and a missing device to no-camera", async () => {
    const refuse = (name: string) => new CameraSession(async () => Promise.reject(Object.assign(new Error(name), { name })));
    expect(await refuse("NotAllowedError").start(() => undefined)).toEqual({ status: "failed", reason: "denied" });
    expect(await refuse("NotFoundError").start(() => undefined)).toEqual({ status: "failed", reason: "no-camera" });
    expect(await refuse("AbortError").start(() => undefined)).toEqual({ status: "failed", reason: "error" });
  });
});
