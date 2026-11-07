"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { dismissCourseRatingAction, saveCourseRatingAction } from "@/server/actions/course-rating";
import { RatingHappyDot, StarRatingInput } from "@/components/learn/star-rating";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROMPT_OPEN_DELAY_MS = 280;

function promptStorageKey(courseSlug: string) {
  return `buildment:rating-prompt-handled:${courseSlug}`;
}

export function CourseRatingModal({
  open,
  onClose,
  courseSlug,
  courseTitle,
  dismissLabel = "Cancel",
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  courseSlug: string;
  courseTitle?: string;
  dismissLabel?: string;
  onSubmitted?: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  function handleClose() {
    if (pending) return;
    setRating(0);
    setReview("");
    setSaved(false);
    setError(null);
    onClose();
  }

  async function submit() {
    if (rating < 1) {
      setError("Choose a star rating first.");
      return;
    }
    setPending(true);
    setError(null);
    const res = await saveCourseRatingAction({ courseSlug, rating, review: review.trim() || null });
    setPending(false);
    if (res.ok) {
      setSaved(true);
      onSubmitted?.();
    } else {
      setError(res.error);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          "button:not(:disabled), textarea:not(:disabled), a[href]",
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      aria-labelledby="course-rating-title"
      aria-describedby="course-rating-description"
      className="fixed inset-0 z-50 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-lg backdrop:bg-foreground/30"
    >
      {open ? (
        <div className="p-5 sm:p-6">
          {saved ? (
            <div className="text-center">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  aria-label="Close"
                  className="size-9"
                >
                  <X className="size-4" aria-hidden />
                </Button>
              </div>
              <RatingHappyDot rating={rating || 5} size={84} />
              <h2 id="course-rating-title" className="mt-4 text-xl font-semibold tracking-tight">
                Thanks for your review!
              </h2>
              <p id="course-rating-description" className="mt-1.5 text-sm text-muted-foreground">
                Your rating helps other learners decide and helps us improve the course.
              </p>
              <Button type="button" onClick={handleClose} className="mt-5 w-full min-h-11">
                Continue learning
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="course-rating-title" className="text-lg font-semibold tracking-tight sm:text-xl">
                    {courseTitle ? `How is ${courseTitle} so far?` : "Rate this course"}
                  </h2>
                  <p id="course-rating-description" className="mt-1 text-sm text-muted-foreground">
                    Your rating helps other learners decide.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  aria-label="Close"
                  className="size-9 shrink-0"
                >
                  <X className="size-4" aria-hidden />
                </Button>
              </div>

              {rating > 0 ? (
                <div className="mt-4">
                  <RatingHappyDot rating={rating} size={76} />
                </div>
              ) : null}

              <div className={cn("mt-4 flex justify-center", rating > 0 && "mt-3")}>
                <StarRatingInput value={rating} onChange={setRating} disabled={pending} />
              </div>

              <label className="mt-4 block text-sm">
                <span className="sr-only">Review (optional)</span>
                <textarea
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Add a few words (optional)"
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                />
              </label>

              {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}

              <div className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={handleClose} disabled={pending}>
                  {dismissLabel}
                </Button>
                <Button type="button" onClick={submit} disabled={rating < 1 || pending}>
                  {pending ? "Saving…" : "Submit rating"}
                </Button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </dialog>
  );
}

/**
 * One-time pop-up shown after the learner completes a chapter and moves on to
 * the next chapter. Dismissing or submitting remembers the choice so it never
 * interrupts subsequent lessons.
 */
export function CourseRatingPrompt({
  courseSlug,
  courseTitle,
  shouldPrompt,
}: {
  courseSlug: string;
  courseTitle: string;
  shouldPrompt: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handledRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!shouldPrompt || handledRef.current) return;
    try {
      if (window.sessionStorage.getItem(promptStorageKey(courseSlug)) === "1") {
        handledRef.current = true;
        return;
      }
    } catch {
      // sessionStorage unavailable
    }
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, PROMPT_OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [courseSlug, shouldPrompt]);

  function markHandled() {
    handledRef.current = true;
    try {
      window.sessionStorage.setItem(promptStorageKey(courseSlug), "1");
    } catch {
      // sessionStorage unavailable
    }
  }

  function handleClose() {
    setOpen(false);
    markHandled();
    if (!submittedRef.current) {
      void dismissCourseRatingAction({ courseSlug });
    }
  }

  return (
    <CourseRatingModal
      open={open}
      onClose={handleClose}
      courseSlug={courseSlug}
      courseTitle={courseTitle}
      dismissLabel="Not now"
      onSubmitted={() => {
        submittedRef.current = true;
        markHandled();
      }}
    />
  );
}
