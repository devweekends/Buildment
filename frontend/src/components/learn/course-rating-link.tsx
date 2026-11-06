"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, X } from "lucide-react";
import { saveCourseRatingAction } from "@/server/actions/course-rating";
import { StarRatingInput } from "@/components/learn/star-rating";
import { Button } from "@/components/ui/button";

/**
 * The on-demand path left after the learner dismisses the full prompt.
 * Clicking it opens the form; it never expands on its own.
 */
export function CourseRatingLink({ courseSlug }: { courseSlug: string }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

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
      setOpen(false);
      router.refresh();
    } else {
      setError(res.error);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <Star className="size-4" aria-hidden /> Rate this course
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-5 text-card-foreground backdrop:bg-foreground/30"
        aria-labelledby="course-rating-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="course-rating-title" className="text-lg font-semibold">
              Rate this course
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your rating helps other learners decide.
            </p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-3">
          <StarRatingInput value={rating} onChange={setRating} disabled={pending} />
        </div>
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="Add a few words (optional)"
          className="mt-3 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
        />
        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}

        <div className="mt-3 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={rating < 1 || pending}>
            {pending ? "Saving…" : "Submit rating"}
          </Button>
        </div>
      </dialog>
    </>
  );
}
