"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/app-toast";
import { adminSelectClassName } from "@/components/admin/admin-ui";
import { enrollUserInCourseAction } from "@/server/actions/admin/users";
import type { AdminActionState } from "@/server/actions/admin/action-result";

const initialState: AdminActionState = { ok: false, message: "" };

export function AdminEnrollUserDialog({
  userId,
  userEmail,
  courses,
}: {
  userId: string;
  userEmail: string;
  courses: Array<{ id: string; title: string; slug: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(enrollUserInCourseAction, initialState);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!state.message) return;
    toast(state.message, state.ok ? "success" : "error");
    if (state.ok) setOpen(false);
  }, [state]);

  if (courses.length === 0) {
    return null;
  }

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <GraduationCap className="size-4" aria-hidden />
        Enroll in course
      </Button>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-labelledby={`${selectId}-title`}
        className="fixed inset-0 z-[70] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-background/70 open:flex open:items-center open:justify-center open:p-4"
      >
        <form
          action={formAction}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl"
        >
          <input type="hidden" name="userId" value={userId} />
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 id={`${selectId}-title`} className="text-base font-semibold">
                Enroll in course
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Grant {userEmail} immediate active access to a course.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close enroll dialog"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label htmlFor={selectId}>Select course</Label>
              <select id={selectId} name="courseId" required className={adminSelectClassName} defaultValue="">
                <option value="" disabled>
                  Choose a course…
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-5 py-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Enrolling…" : "Enroll user"}
            </Button>
          </div>
        </form>
      </dialog>
    </>
  );
}

