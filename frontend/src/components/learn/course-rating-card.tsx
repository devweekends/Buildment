"use client";

import { useState } from "react";
import { CheckCircle2, Pencil, Star } from "lucide-react";
import { saveCourseRatingAction, dismissCourseRatingAction, type CourseRatingView } from "@/server/actions/course-rating";
import { RatingHappyDot, StarRating, StarRatingInput } from "@/components/learn/star-rating";
import { cn } from "@/lib/utils";

/**
 * One card on the course overview once the learner has completed at least one chapter.
 * Skippable, editable, never repeated after dismissal.
 */
export function CourseRatingCard({
  courseSlug,
  courseTitle,
  initialRating,
  initialDismissed = false,
}: {
  courseSlug: string;
  courseTitle: string;
  initialRating: CourseRatingView | null;
  initialDismissed?: boolean;
}) {
  const [rating, setRating] = useState(initialRating?.rating ?? 0);
  const [review, setReview] = useState(initialRating?.review ?? "");
  const [saved, setSaved] = useState<CourseRatingView | null>(initialRating);
  const [editing, setEditing] = useState(!initialRating);
  const [dismissed, setDismissed] = useState(initialDismissed);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function notNow() {
    setPending(true);
    await dismissCourseRatingAction({ courseSlug });
    setPending(false);
    setDismissed(true);
    setEditing(false);
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
      setSaved(res.data);
      setEditing(false);
    } else {
      setError(res.error);
    }
  }

  if (dismissed && !saved && !editing) {
    return (
      <div className="mx-auto mt-6 w-full max-w-4xl px-6">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Star className="size-4" aria-hidden /> Rate this course
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto mt-6 w-full max-w-4xl px-6">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        {saved && !editing ? (
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Your rating</p>
              <div className="mt-1 flex items-center gap-2">
                <StarRating value={saved.rating} size={18} />
                <span className="text-sm text-muted-foreground">{saved.rating} / 5</span>
              </div>
              {saved.review ? (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">&ldquo;{saved.review}&rdquo;</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <Pencil className="size-3.5" aria-hidden /> Edit review
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-base font-semibold text-foreground">How was {courseTitle}?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your rating helps other learners decide and helps us fix the parts that did not work.
            </p>

            {rating > 0 ? (
              <div className="mt-3">
                <RatingHappyDot rating={rating} size={68} />
              </div>
            ) : null}

            <div className="mt-3">
              <StarRatingInput value={rating} onChange={setRating} disabled={pending} />
            </div>

            <label className="mt-3 block text-sm">
              <span className="sr-only">Review (optional)</span>
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="Anything you want to add? (optional)"
                className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
              />
            </label>

            {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}

            <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={notNow}
                disabled={pending}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={pending || rating < 1}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background",
                  (pending || rating < 1) && "opacity-60",
                )}
              >
                {saved ? "Update rating" : "Submit rating"}
              </button>
            </div>
          </>
        )}

        {saved && !editing ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-primary" aria-hidden /> Thanks. You can change this any time.
          </p>
        ) : null}
      </div>
    </section>
  );
}
