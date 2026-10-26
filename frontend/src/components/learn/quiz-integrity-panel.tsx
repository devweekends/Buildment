"use client";

import { useEffect, useRef } from "react";
import { Camera, CameraOff, Lock, Maximize, ShieldCheck, TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QuizIntegrity } from "@/lib/integrity/use-quiz-integrity";
import { INTEGRITY_LIMITS, PROCTORED_RULE } from "@/shared/api/integrity";
import { cn } from "@/lib/utils";

// What the learner sees of quiz integrity: a "Proctored" badge with a count, short
// notices, a gentle full-screen banner and one dialog that says plainly what is
// noted and, when the course uses it, asks before the camera turns on. Nothing here
// stops a learner from finishing the quiz: every signal is a note for the mentor.

const NOTED = [
  "Leaving this tab, window, or full screen",
  "Copy, paste, or right-click attempts (blocked), and screenshot keys (noticed when the browser reports them)",
  "Your pointer leaving the page, or a second screen when the browser reports it",
  "Answers submitted unusually quickly",
];

// The strict kind. What the learner is told before Start, in short plain English.
const STRICT_RULES = [
  "The quiz opens in full screen and has to stay there.",
  "You cannot switch tabs or windows, copy, paste, print, right-click, reload or go back.",
  `If you leave the quiz screen, you get a warning. You have ${PROCTORED_RULE.warnings} warnings. The next time you leave, your answers are submitted as they are, and questions you did not answer count as wrong.`,
  "Your camera has to be on and stay on. If it stops, the quiz is covered until it is back, and that counts like leaving the screen.",
  "Your mentor can see every note.",
];

// Said in plain words before Start: what the camera does and does not do.
const CAMERA_PRIVACY = [
  "The camera is checked on your device only.",
  "Your video is not recorded, uploaded or stored.",
  "We save only a note with the time when you leave the quiz screen or the camera stops.",
];

const CAMERA_HELP: Record<string, string> = {
  denied: "Your browser blocked the camera. You can allow it for this site (the camera icon in the address bar) and try again.",
  muted: "Your camera is switched off or covered. Turn it on and try again.",
  frozen: "Your camera stopped sending pictures. Unplug it and plug it in again, or close other apps that use the camera, then try again.",
  insecure: "The camera only works on a secure page. Open Buildment at its https address and try again.",
  "no-camera": "We could not find a camera on this device. Plug one in, then try again.",
  stopped: "Your camera stopped.",
  unsupported: "This browser cannot use a camera.",
  error: "The camera did not start.",
};

function IntegrityDialog({ integrity }: { integrity: QuizIntegrity }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { dialog, camera, session } = integrity;
  const open = dialog !== null && session !== null;
  const intro = dialog === "intro";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) element.close();
  }, [open]);

  // Closing the intro (X or Esc) starts the quiz without the camera: never a dead end.
  const strict = integrity.proctored;
  // On a proctored quiz the intro only closes with Start: the rules have to be read first.
  const close = () => {
    if (intro && strict) return;
    if (intro) integrity.begin(false);
    else integrity.closeInfo();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="quiz-integrity-title"
      aria-describedby="quiz-integrity-description"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-background/70 open:flex open:items-center open:justify-center open:p-4"
    >
      {open ? (
        <div className="flex max-h-[min(44rem,calc(100dvh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-6 sm:py-5">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="size-4" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wider">Proctored quiz</p>
              </div>
              <h2 id="quiz-integrity-title" className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {strict ? "Stay on this screen until you finish" : "Your mentor can review this quiz"}
              </h2>
              <p id="quiz-integrity-description" className="mt-1 text-sm leading-6 text-muted-foreground">
                {strict
                  ? "The questions appear when you press Start. Find a quiet moment and a good connection first."
                  : "These notes do not change your score or stop your quiz. Your mentor reads them and decides."}
              </p>
            </div>
            <button
              type="button"
              hidden={intro && strict}
              onClick={close}
              aria-label={intro && camera.enabled ? "Start without camera" : intro ? "Start quiz" : "Close"}
              className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-4 sm:px-6">
            <section aria-labelledby="quiz-signals-title" className="rounded-xl border bg-muted/20 p-4">
              <h3 id="quiz-signals-title" className="text-sm font-semibold">{strict ? "The rules" : "What your mentor can see"}</h3>
              {strict ? (
                <ul className="mt-2 grid gap-1.5 pl-5 text-sm leading-5 text-foreground/85 marker:text-muted-foreground">
                  {STRICT_RULES.map((item) => <li key={item} className="list-disc">{item}</li>)}
                </ul>
              ) : (
                <ul className="mt-2 grid gap-1.5 pl-5 text-sm leading-5 text-foreground/85 marker:text-muted-foreground sm:grid-cols-2 sm:gap-x-7">
                  {NOTED.map((item) => <li key={item} className="list-disc">{item}</li>)}
                </ul>
              )}
              {strict && !integrity.fullscreenSupported ? (
                <p className="mt-3 text-xs leading-5 text-muted-foreground">This browser cannot use full screen. Leaving the page still counts as leaving the quiz.</p>
              ) : null}
              {!strict && integrity.fullscreenSupported ? (
                <p className="mt-3 text-xs leading-5 text-muted-foreground">The quiz opens in full screen. You can leave it with Esc; that is noted, never blocked.</p>
              ) : null}
            </section>

            {intro && strict && integrity.leaves > 0 ? (
              <p role="status" className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm leading-5">
                This quiz page was reopened or left earlier. That counts as leaving the quiz screen: warning {Math.min(integrity.leaves, PROCTORED_RULE.warnings)} of {PROCTORED_RULE.warnings}. Turn your camera on again to carry on.
              </p>
            ) : null}
            {camera.required ? (
              <section aria-labelledby="quiz-camera-privacy-title" className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                <h3 id="quiz-camera-privacy-title" className="flex items-center gap-2 text-sm font-semibold">
                  <Camera className="size-4 text-primary" aria-hidden />
                  Your camera
                </h3>
                <ul className="mt-2 grid gap-1.5 pl-5 text-sm leading-5 text-foreground/85 marker:text-muted-foreground">
                  {CAMERA_PRIVACY.map((item) => <li key={item} className="list-disc">{item}</li>)}
                </ul>
                {intro ? (
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">
                    {integrity.faceCheckAvailable
                      ? "This browser can also tell if no face, or more than one face, is in view. That check runs on your device too, and only a note with the time is kept."
                      : "This browser cannot check faces, so only the camera itself is checked."}
                  </p>
                ) : null}
                {camera.issue ? (
                  <p role="alert" className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm leading-5 text-foreground">
                    {CAMERA_HELP[camera.issue] ?? CAMERA_HELP.error}
                  </p>
                ) : null}
              </section>
            ) : null}

            {camera.enabled ? (
              <section aria-labelledby="quiz-camera-title" className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                <h3 id="quiz-camera-title" className="flex items-center gap-2 text-sm font-semibold">
                  <Camera className="size-4 text-primary" aria-hidden />
                  Camera photos: your choice
                </h3>
                <p className="mt-1 text-sm leading-5 text-foreground/85">
                  This course asks for small still photos while you take the quiz. There is no video or sound.
                </p>
                <dl className="mt-3 grid gap-x-5 gap-y-2 text-xs leading-5 sm:grid-cols-2">
                  <div><dt className="font-semibold">Photo</dt><dd className="text-muted-foreground">{INTEGRITY_LIMITS.snapshotWidth} × {INTEGRITY_LIMITS.snapshotHeight} pixels, about once a minute</dd></div>
                  <div><dt className="font-semibold">Who sees it</dt><dd className="text-muted-foreground">This course&apos;s mentors and Buildment admins</dd></div>
                  <div><dt className="font-semibold">Automatic deletion</dt><dd className="text-muted-foreground">After {session?.camera.retentionDays ?? INTEGRITY_LIMITS.retentionDays} days; the activity report remains</dd></div>
                  <div><dt className="font-semibold">No camera, or it stops?</dt><dd className="text-muted-foreground">The quiz keeps going. Your mentor sees &quot;camera off&quot;.</dd></div>
                </dl>
              </section>
            ) : null}
          </div>

          <div className="shrink-0 border-t bg-card px-5 py-4 sm:px-6">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {intro ? (
                camera.required ? (
                  <Button type="button" onClick={() => void integrity.begin(true)} disabled={camera.starting || integrity.starting} className="gap-1.5">
                    <Camera className="size-4" aria-hidden />
                    {camera.starting || integrity.starting ? "Starting…" : camera.issue ? "Try the camera again" : "Turn on camera and start"}
                  </Button>
                ) : camera.enabled ? (
                  <>
                    <Button type="button" variant="outline" onClick={() => integrity.begin(false)}>
                      Start without camera
                    </Button>
                    <Button type="button" onClick={() => integrity.begin(true)} className="gap-1.5">
                      <Camera className="size-4" aria-hidden />
                      Turn on camera and start
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => integrity.begin(false)}>
                    Start quiz
                  </Button>
                )
              ) : (
                <>
                  {camera.enabled && camera.status === "ON" ? (
                    <Button type="button" variant="outline" onClick={() => { camera.turnOff(); integrity.closeInfo(); }} className="gap-1.5">
                      <CameraOff className="size-4" aria-hidden />
                      Turn camera off
                    </Button>
                  ) : camera.enabled ? (
                    <Button type="button" variant="outline" onClick={() => { void camera.start(); integrity.closeInfo(); }} className="gap-1.5">
                      <Camera className="size-4" aria-hidden />
                      Turn camera on
                    </Button>
                  ) : null}
                  <Button type="button" onClick={integrity.closeInfo}>
                    Back to the quiz
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

/** Kept mounted so the stream survives re-renders; tiny and visible while on, so the learner always knows. */
function CameraPreview({ attach, visible, proctored }: { attach: (element: HTMLVideoElement | null) => void; visible: boolean; proctored: boolean }) {
  // On a proctored quiz the self-view is bigger and says plainly that the camera is on and where the video stays.
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-20 right-3 z-[70] sm:bottom-4",
        proctored ? "w-[132px]" : "w-[72px]",
        !visible && "hidden"
      )}
    >
      <video
        ref={attach}
        muted
        playsInline
        aria-hidden
        className={cn(
          "w-full rounded-md border border-border bg-muted object-cover shadow-sm",
          proctored ? "h-[99px]" : "h-[54px]"
        )}
      />
      {proctored ? (
        <p className="mt-1 flex items-center gap-1.5 rounded-md bg-background/90 px-1.5 py-0.5 text-[11px] font-medium leading-4 text-foreground shadow-sm">
          <span className="size-2 shrink-0 animate-pulse rounded-full bg-red-600 motion-reduce:animate-none" aria-hidden />
          Camera on · stays on this device
        </p>
      ) : null}
    </div>
  );
}

/**
 * A proctored quiz covers the page, so nothing can be read or answered while the
 * learner is outside the quiz screen: a warning after leaving, a "go back to full
 * screen" cover, and the cover shown while the answers are handed in.
 */
function ProctorGuard({ integrity }: { integrity: QuizIntegrity }) {
  const action = useRef<HTMLButtonElement>(null);
  const warning = integrity.leaveWarning;
  const variant = integrity.limitReached
    ? "limit"
    : integrity.cameraLost
      ? "camera"
      : warning
        ? "warning"
        : integrity.needsFullscreen && integrity.dialog === null
          ? "fullscreen"
          : null;
  useEffect(() => {
    if (variant === "warning" || variant === "fullscreen" || variant === "camera") action.current?.focus();
  }, [variant]);
  if (!variant) return null;
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="proctor-guard-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background p-4"
    >
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-2xl">
        <div className="flex items-center gap-2 text-primary">
          {variant === "limit" ? <Lock className="size-4" aria-hidden /> : variant === "warning" ? <TriangleAlert className="size-4" aria-hidden /> : variant === "camera" ? <CameraOff className="size-4" aria-hidden /> : <Maximize className="size-4" aria-hidden />}
          <p className="text-xs font-semibold uppercase tracking-wider">Proctored quiz</p>
        </div>
        {variant === "limit" ? (
          <>
            <h2 id="proctor-guard-title" className="mt-2 text-xl font-semibold tracking-tight">You left the quiz screen too many times</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Your answers so far are being submitted. Questions you did not answer count as wrong. Please wait.</p>
          </>
        ) : variant === "camera" ? (
          <>
            <h2 id="proctor-guard-title" className="mt-2 text-xl font-semibold tracking-tight">Your camera stopped</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The quiz is covered until your camera is on again. This counts like leaving the quiz screen, and your mentor can see it. Your video is not recorded.
            </p>
            {integrity.camera.issue ? (
              <p role="alert" className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm leading-5 text-foreground">
                {CAMERA_HELP[integrity.camera.issue] ?? CAMERA_HELP.error}
              </p>
            ) : null}
            <Button ref={action} type="button" className="mt-5 w-full gap-1.5" disabled={integrity.camera.starting} onClick={() => void integrity.camera.start()}>
              <Camera className="size-4" aria-hidden />
              {integrity.camera.starting ? "Starting camera…" : "Turn camera on"}
            </Button>
          </>
        ) : variant === "warning" && warning ? (
          <>
            <h2 id="proctor-guard-title" className="mt-2 text-xl font-semibold tracking-tight">
              You left the quiz screen. Warning {warning.leaves} of {PROCTORED_RULE.warnings}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {warning.warningsLeft === 1
                ? "If you leave once more, your answers are submitted as they are."
                : `You can leave ${warning.warningsLeft - 1} more time before your answers are submitted as they are.`}{" "}
              Your mentor can see this.
            </p>
            <Button ref={action} type="button" className="mt-5 w-full gap-1.5" onClick={integrity.acknowledgeLeave}>
              <Maximize className="size-4" aria-hidden />
              Back to the quiz
            </Button>
          </>
        ) : (
          <>
            <h2 id="proctor-guard-title" className="mt-2 text-xl font-semibold tracking-tight">Full screen is needed to continue</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">The questions are hidden until you are back in full screen.</p>
            <Button ref={action} type="button" className="mt-5 w-full gap-1.5" onClick={integrity.returnToFullscreen}>
              <Maximize className="size-4" aria-hidden />
              Go full screen
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function QuizIntegrityPanel({ integrity }: { integrity: QuizIntegrity }) {
  const { camera, notice } = integrity;
  const cameraOn = camera.status === "ON";

  return (
    <>
      <CameraPreview attach={camera.attachVideo} visible={cameraOn} proctored={integrity.proctored} />
      {integrity.active ? (
        <div className="mt-3 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={integrity.openInfo}
              aria-label={`Proctored quiz. ${integrity.flagCount} ${integrity.flagCount === 1 ? "note" : "notes"} for your mentor. Show what is noted.`}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary/15"
            >
              <ShieldCheck className="size-3.5 text-primary" aria-hidden />
              Proctored
              <span className="rounded-full bg-primary/15 px-1.5 font-mono tabular-nums">{integrity.flagCount}</span>
            </button>
            {integrity.proctored && integrity.armed ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <TriangleAlert className="size-3.5" aria-hidden />
                Warnings used: {Math.min(integrity.leaves, PROCTORED_RULE.warnings)} of {PROCTORED_RULE.warnings}
              </span>
            ) : null}
            {camera.enabled || camera.required ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                {cameraOn ? <Camera className="size-3.5" aria-hidden /> : <CameraOff className="size-3.5" aria-hidden />}
                {camera.starting ? "Starting camera…" : cameraOn ? "Camera on" : "Camera off"}
              </span>
            ) : null}
            {integrity.proctored && integrity.armed && integrity.faceCheck ? (
              <span className="text-xs text-muted-foreground">Face check on this device</span>
            ) : null}
          </div>

          <p role="status" aria-live="polite" className={cn("text-sm text-foreground", !notice && "sr-only")}>
            {notice?.text ?? ""}
          </p>

          {integrity.fullscreenPrompt ? (
            <div role="status" className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
              <span className="mr-auto">You left full screen. This is noted for your mentor.</span>
              <Button type="button" size="sm" onClick={integrity.returnToFullscreen} className="gap-1.5">
                <Maximize className="size-3.5" aria-hidden />
                Return to full screen
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={integrity.dismissFullscreenPrompt}>
                Not now
              </Button>
            </div>
          ) : null}

          {camera.enabled && !camera.required && camera.status === "UNAVAILABLE" ? (
            <div role="status" className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm">
              <CameraOff className="size-4 text-muted-foreground" aria-hidden />
              <span className="mr-auto text-muted-foreground">
                Camera is off. You can keep going. {camera.issue ? CAMERA_HELP[camera.issue] ?? CAMERA_HELP.error : ""}
              </span>
              <Button type="button" size="sm" variant="outline" onClick={() => void camera.start()}>
                Try camera again
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
      <IntegrityDialog integrity={integrity} />
      <ProctorGuard integrity={integrity} />
    </>
  );
}
