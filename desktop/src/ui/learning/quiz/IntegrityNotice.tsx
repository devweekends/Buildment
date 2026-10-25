import { useEffect, useRef } from 'react';
import type { QuizIntegrity } from '@buildment/learning-ui/lib/integrity/use-quiz-integrity';
import { PROCTORED_RULE } from '@buildment/learning-ui/shared/api/integrity';

export function IntegrityNotice({ integrity }: { integrity: QuizIntegrity }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (integrity.dialog && !dialog.current?.open) dialog.current?.showModal();
    if (!integrity.dialog && dialog.current?.open) dialog.current.close();
  }, [integrity.dialog]);
  const intro = integrity.dialog === 'intro';
  const strict = integrity.proctored;
  // On a proctored quiz the intro only closes with Start: the rules have to be read first.
  function close() {
    if (intro && strict) return;
    if (intro) integrity.begin(false);
    else integrity.closeInfo();
  }
  const warning = integrity.leaveWarning;
  const cover = integrity.limitReached
    ? 'limit'
    : warning
      ? 'warning'
      : integrity.needsFullscreen && integrity.dialog === null
        ? 'fullscreen'
        : null;
  return (
    <div className="my-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={integrity.openInfo}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium"
        >
          Quiz integrity · {integrity.flagCount} notes
        </button>
        <span className="text-xs text-muted-foreground">
          Notes are reviewed by your mentor; they do not change your score.
        </span>
      </div>
      {integrity.notice && (
        <p
          role="status"
          className="rounded-lg border border-border bg-muted p-3 text-sm"
        >
          {integrity.notice.text}
        </p>
      )}
      {integrity.fullscreenPrompt && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted p-3 text-sm">
          <span>Return to full screen when you’re ready.</span>
          <button className="underline" onClick={integrity.returnToFullscreen}>
            Full screen
          </button>
          <button
            className="underline"
            onClick={integrity.dismissFullscreenPrompt}
          >
            Not now
          </button>
        </div>
      )}
      {integrity.camera.status === 'ON' && (
        <div className="flex items-center gap-3">
          <video
            ref={integrity.camera.attachVideo}
            muted
            autoPlay
            playsInline
            className="w-32 rounded-lg"
          />
          <button
            onClick={integrity.camera.turnOff}
            className="text-sm underline"
          >
            Turn camera off
          </button>
        </div>
      )}
      {integrity.camera.issue && (
        <p role="status" className="text-sm text-muted-foreground">
          {integrity.camera.issue}
        </p>
      )}
      <dialog
        ref={dialog}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className="m-auto w-[min(92vw,560px)] rounded-2xl border border-border bg-card p-7 text-foreground shadow-xl backdrop:bg-black/50"
      >
        <h2 className="text-2xl font-semibold">
          {strict ? 'Stay on this screen until you finish' : 'Before you start'}
        </h2>
        {strict ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
            <li>The quiz opens in full screen and has to stay there.</li>
            <li>
              You cannot switch windows, copy, paste, print, right-click, reload
              or go back.
            </li>
            <li>
              If you leave the quiz screen, you get a warning. You have{' '}
              {PROCTORED_RULE.warnings} warnings. The next time you leave, your
              answers are submitted as they are, and questions you did not
              answer count as wrong.
            </li>
            <li>Your mentor can see every note.</li>
          </ul>
        ) : (
          <>
            <p className="mt-3 leading-7">
              Your mentor can review window switches, leaving full screen,
              copy/paste attempts, screenshot keys, extra screens, and unusually
              fast answers. These signals are advisory; they never automatically
              fail or lock your quiz.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Copy, paste, and right-click are disabled within the quiz.
              Screenshot detection is best effort. You can leave full screen
              with Esc.
            </p>
          </>
        )}
        {integrity.camera.enabled && (
          <div className="mt-5 rounded-xl bg-muted p-4">
            <h3 className="font-semibold">Camera photos are your choice</h3>
            <p className="mt-2 text-sm leading-6">
              This course requests small 320 × 240 still photos about once a
              minute. No sound or video is recorded. Course mentors and admins
              can view them; photos are deleted after{' '}
              {integrity.session?.camera.retentionDays || 30} days. You can
              continue without a camera.
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            hidden={intro && strict}
            onClick={close}
            className="rounded-lg border border-border px-4 py-2"
          >
            {intro
              ? integrity.camera.enabled
                ? 'Start without camera'
                : 'Start quiz'
              : 'Close'}
          </button>
          {integrity.camera.enabled && integrity.camera.status !== 'ON' && (
            <button
              onClick={() => {
                if (intro) integrity.begin(true);
                else {
                  void integrity.camera.start();
                  integrity.closeInfo();
                }
              }}
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
            >
              Turn on camera{intro ? ' and start' : ''}
            </button>
          )}
        </div>
      </dialog>
      {cover && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="proctor-guard-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Proctored quiz
            </p>
            {cover === 'limit' && (
              <>
                <h2
                  id="proctor-guard-title"
                  className="mt-2 text-xl font-semibold"
                >
                  You left the quiz screen too many times
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your answers so far are being submitted. Questions you did not
                  answer count as wrong. Please wait.
                </p>
              </>
            )}
            {cover === 'warning' && warning && (
              <>
                <h2
                  id="proctor-guard-title"
                  className="mt-2 text-xl font-semibold"
                >
                  You left the quiz screen. Warning {warning.leaves} of{' '}
                  {PROCTORED_RULE.warnings}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {warning.warningsLeft === 1
                    ? 'If you leave once more, your answers are submitted as they are.'
                    : 'You can leave ' +
                      (warning.warningsLeft - 1) +
                      ' more time before your answers are submitted as they are.'}{' '}
                  Your mentor can see this.
                </p>
                <button
                  autoFocus
                  onClick={integrity.acknowledgeLeave}
                  className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                >
                  Back to the quiz
                </button>
              </>
            )}
            {cover === 'fullscreen' && (
              <>
                <h2
                  id="proctor-guard-title"
                  className="mt-2 text-xl font-semibold"
                >
                  Full screen is needed to continue
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The questions are hidden until you are back in full screen.
                </p>
                <button
                  autoFocus
                  onClick={integrity.returnToFullscreen}
                  className="mt-5 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                >
                  Go full screen
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
