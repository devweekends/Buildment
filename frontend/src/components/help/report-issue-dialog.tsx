"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Flag, X } from "lucide-react";
import { reportLessonIssue } from "@/server/actions/lesson-report";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "ERROR", label: "Incorrect information" },
  { value: "TYPO", label: "Typo or broken formatting" },
  { value: "CONFUSING", label: "Confusing explanation" },
  { value: "BROKEN_LINK", label: "Broken link" },
  { value: "SUGGESTION", label: "Improvement idea" },
  { value: "OTHER", label: "Something else" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

export function ReportIssueDialog({
  courseId,
  chapterId,
  chapterTitle,
}: {
  courseId: string;
  chapterId: string;
  chapterTitle: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("ERROR");
  const [body, setBody] = useState("");
  const [quote, setQuote] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function start() {
    // Capture the learner's selection before the click clears it.
    setQuote(window.getSelection()?.toString().trim().slice(0, 500) ?? "");
    setSubmitted(false);
    setError(null);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  async function submit() {
    if (body.trim().length < 10) {
      setError("Please add a bit more detail (at least 10 characters).");
      return;
    }
    setPending(true);
    setError(null);
    const res = await reportLessonIssue({
      courseId,
      chapterId,
      category,
      body,
      quote: quote || undefined,
    });
    setPending(false);
    if (res.ok) {
      setSubmitted(true);
      setBody("");
      setQuote("");
    } else {
      setError(res.error);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={start}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-input bg-transparent px-2.5 text-[15px] font-semibold text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow sm:px-4"
        aria-label="Report an issue with this lesson"
      >
        <Flag className="size-5 shrink-0" aria-hidden />
        <span className="hidden sm:inline">Report</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-foreground/40 backdrop:backdrop-blur-[2px] open:flex open:items-end open:justify-center sm:open:items-center sm:open:p-4"
        aria-labelledby="report-issue-title"
      >
        <div className="w-full max-w-none rounded-t-3xl border border-border bg-card text-card-foreground p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="report-issue-title" className="text-lg font-semibold">
                Report an issue
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{chapterTitle}</p>
            </div>
            <button type="button" onClick={close} aria-label="Close" className="rounded p-1 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="size-10 text-primary" aria-hidden />
              <p className="text-sm font-medium">Thanks. Your instructor will review this.</p>
              <p className="text-xs text-muted-foreground">
                You can follow the conversation in your questions inbox.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">What kind of issue?</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as Category)}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              {quote && (
                <div className="rounded-lg border border-border bg-secondary/60 px-3 py-2 text-sm">
                  <p className="text-xs font-medium text-muted-foreground">Selected passage</p>
                  <p className="mt-1 line-clamp-3 italic">&ldquo;{quote}&rdquo;</p>
                </div>
              )}

              <label className="block text-sm">
                <span className="mb-1 block font-medium">What should be fixed?</span>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={4}
                  maxLength={4000}
                  placeholder="Tell your instructor what is wrong or what would make this clearer."
                  className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                />
              </label>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button type="button" onClick={close} className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={pending}
                  className={cn("rounded-md bg-foreground px-4 py-1.5 text-sm font-medium text-background", pending && "opacity-60")}
                >
                  {pending ? "Sending…" : "Send report"}
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
