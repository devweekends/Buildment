"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle, CircleAlert, Clock3, Loader2, Send } from "lucide-react";
import { ApiError, apiFetch } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SanitizedCapstoneCheckConfig } from "@/shared/blocks/capstone-check/schema";
import type { AutomatedCheckResult, CapstoneCheckState, CapstoneCheckView } from "@/shared/blocks/capstone-check/report";
import { CertificateCard } from "./CertificateCard";

// The learner's capstone check: submit links, watch the check run, read what is left.
// The report is advisory; the mentor's decision is the one that counts.

const POLL_MS = 3_000;

function StatusIcon({ status }: { status: AutomatedCheckResult["status"] }) {
  if (status === "pass") return <CheckCircle2 className="size-4 shrink-0 text-ok" aria-label="Passed" />;
  if (status === "pending") return <Clock3 className="size-4 shrink-0 text-muted-foreground" aria-label="Still running" />;
  if (status === "skipped") return <Circle className="size-4 shrink-0 text-muted-foreground" aria-label="Skipped" />;
  return <CircleAlert className="size-4 shrink-0 text-destructive" aria-label="Needs work" />;
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function Meter({ percent, passPercent }: { percent: number; passPercent: number }) {
  return (
    <div className="relative h-2 w-full overflow-hidden bg-muted" role="img" aria-label={`${percent}% complete, ${passPercent}% needed`}>
      <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
      <div className="absolute inset-y-0 w-px bg-foreground" style={{ left: `${passPercent}%` }} />
    </div>
  );
}

function Report({ check, onSend, sending }: { check: CapstoneCheckView; onSend: () => void; sending: boolean }) {
  const report = check.report!;
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-heading text-xl font-bold tracking-tight">
            {report.completed ? "Complete" : "Not complete yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-2xl font-bold text-foreground tabular-nums">{report.percent}%</span> of {report.passPercent}% needed
          </p>
        </div>
        <Meter percent={report.percent} passPercent={report.passPercent} />
        {report.summary ? <p className="text-sm leading-6">{report.summary}</p> : null}
        {check.reused ? <p className="text-xs text-muted-foreground">Same commit as your last check, so this is the same result.</p> : null}
      </div>

      {report.whatIsLeft.length > 0 ? (
        <section className="space-y-3">
          <h4 className="text-sm font-semibold">What is left</h4>
          <ol className="space-y-3">
            {report.whatIsLeft.map((item, index) => (
              <li key={`${item.criterionId ?? "check"}-${index}`} className="border p-3">
                <p className="text-sm font-semibold">{item.title}</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6">
                  {item.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="space-y-2">
        <h4 className="text-sm font-semibold">Checks</h4>
        <ul className="space-y-1.5">
          {check.automated.map((result) => (
            <li key={result.id} className="flex items-start gap-2 text-sm leading-6">
              <span className="mt-1"><StatusIcon status={result.status} /></span>
              <span>{result.message}</span>
            </li>
          ))}
        </ul>
      </section>

      {report.graded ? (
        <section className="space-y-2">
          <h4 className="text-sm font-semibold">Rubric</h4>
          <ul className="divide-y border">
            {report.criteria.map((criterion) => (
              <li key={criterion.id} className="flex items-start justify-between gap-3 px-3 py-2 text-sm">
                <span className="flex items-start gap-2">
                  <span className="mt-1"><StatusIcon status={criterion.met ? "pass" : "fail"} /></span>
                  <span>
                    {criterion.title}
                    {criterion.required ? <span className="text-muted-foreground"> (required)</span> : null}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {criterion.score}/{criterion.max}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {report.qualityNotes.strengths.length + report.qualityNotes.improvements.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2">
          {report.qualityNotes.strengths.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold">Working well</h4>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6">
                {report.qualityNotes.strengths.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </div>
          ) : null}
          {report.qualityNotes.improvements.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold">Would make it better</h4>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-6">
                {report.qualityNotes.improvements.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 border-t pt-4">
        {check.sentToMentor ? (
          <p className="text-sm text-muted-foreground">Your mentor has this check and will confirm the result.</p>
        ) : (
          <>
            <Button type="button" variant="outline" size="sm" onClick={onSend} loading={sending} disabled={sending}>
              <Send />
              Ask my mentor to look
            </Button>
            <p className="text-xs text-muted-foreground">This is an AI check. A mentor confirms every pass.</p>
          </>
        )}
      </div>
    </div>
  );
}

export function CapstoneCheckClient({
  id,
  config,
  initialState,
}: {
  id: string;
  config: SanitizedCapstoneCheckConfig;
  initialState: CapstoneCheckState | null;
}) {
  const params = useParams<{ courseSlug?: string }>();
  const [state, setState] = useState<CapstoneCheckState | null>(initialState);
  const latest = state?.checks[0] ?? null;
  const [repoUrl, setRepoUrl] = useState(latest?.repoUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(latest?.liveUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"check" | "send" | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const running = latest?.status === "QUEUED" || latest?.status === "RUNNING";

  const refresh = useCallback(async () => {
    try {
      const result = await apiFetch<{ state: CapstoneCheckState }>(`/api/v1/blocks/${encodeURIComponent(id)}/capstone`);
      setState(result.state);
    } catch {
      // A failed poll is retried on the next tick.
    }
  }, [id]);

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(refresh, POLL_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, refresh, state]);

  if (!state) {
    return (
      <section className="my-6 border bg-card p-5 text-card-foreground">
        <h3 className="font-heading text-lg font-bold tracking-tight">{config.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to check your capstone.</p>
      </section>
    );
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy("check");
    try {
      await apiFetch(`/api/v1/blocks/${encodeURIComponent(id)}/capstone/check`, {
        method: "POST",
        json: { repoUrl, ...(config.liveUrl !== "none" && liveUrl ? { liveUrl } : {}) },
      });
      await refresh();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not start the check. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function send() {
    if (!latest) return;
    setError(null);
    setBusy("send");
    try {
      await apiFetch(`/api/v1/blocks/${encodeURIComponent(id)}/capstone/send`, { method: "POST", json: { checkId: latest.id } });
      await refresh();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not send it. Try again.");
    } finally {
      setBusy(null);
    }
  }

  const earlier = state.checks.slice(1);
  const outOfChecks = state.remainingToday <= 0;

  return (
    <section className="my-6 border bg-card text-card-foreground" aria-labelledby={`capstone-${id}`}>
      <header className="space-y-2 border-b px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Capstone check</p>
        <h3 id={`capstone-${id}`} className="font-heading text-lg font-bold leading-snug tracking-tight">{config.title}</h3>
        {config.intro ? <p className="text-sm leading-6 text-muted-foreground">{config.intro}</p> : null}
      </header>

      <div className="space-y-6 px-4 py-5 sm:px-6">
        <div>
          <p className="text-sm font-semibold">What the check looks for</p>
          <ul className="mt-2 space-y-1 text-sm leading-6">
            {config.checklist.map((item) => (
              <li key={item.id} className="flex gap-2">
                <span aria-hidden className="text-muted-foreground">·</span>
                <span>
                  {item.title}
                  {item.required ? <span className="text-muted-foreground"> (required)</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">GitHub repo</span>
            <Input
              type="url"
              inputMode="url"
              required
              placeholder="https://github.com/you/your-project"
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              disabled={running || busy !== null}
            />
          </label>
          {config.liveUrl !== "none" ? (
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">
                Live site{config.liveUrl === "optional" ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
              </span>
              <Input
                type="url"
                inputMode="url"
                required={config.liveUrl === "required"}
                placeholder="https://your-site.com"
                value={liveUrl}
                onChange={(event) => setLiveUrl(event.target.value)}
                disabled={running || busy !== null}
              />
            </label>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="h-11 w-full sm:w-auto" loading={busy === "check"} disabled={!state.available || running || busy !== null || outOfChecks}>
              {latest ? "Check again" : "Check my capstone"}
            </Button>
            <p className="text-xs text-muted-foreground">
              {state.available
                ? `${state.remainingToday} of ${state.dailyLimit} checks left today. Push your latest work first.`
                : "Checks are not switched on yet. Your mentor can still review your work."}
            </p>
          </div>
          {error ? (
            <p className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>
          ) : null}
        </form>

        {state.decision ? (
          <div className={cn("border p-4 text-sm", state.decision.verdict === "APPROVED" ? "border-ok bg-ok-soft" : "bg-muted/40")}>
            <p className="font-semibold">
              {state.decision.verdict === "APPROVED" ? "Your mentor approved your capstone" : "Your mentor asked for changes"}
              {state.decision.reviewerName ? ` (${state.decision.reviewerName})` : ""}
            </p>
            <p className="mt-1.5 whitespace-pre-wrap leading-6">{state.decision.feedback}</p>
          </div>
        ) : null}

        {latest ? (
          <div aria-live="polite">
            {running ? (
              <div className="flex items-center gap-3 border bg-muted/40 p-4 text-sm">
                <Loader2 className="size-4 animate-spin" />
                <span>Checking your repo{latest.liveUrl ? " and your site" : ""}. This takes about a minute.</span>
              </div>
            ) : latest.status === "FAILED" ? (
              <div className="space-y-3">
                <p className="border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{latest.error}</p>
                {latest.automated.length > 0 ? (
                  <ul className="space-y-1.5">
                    {latest.automated.map((result) => (
                      <li key={result.id} className="flex items-start gap-2 text-sm leading-6">
                        <span className="mt-1"><StatusIcon status={result.status} /></span>
                        <span>{result.message}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : latest.report ? (
              <Report check={latest} onSend={send} sending={busy === "send"} />
            ) : null}
          </div>
        ) : null}

        {earlier.length > 0 ? (
          <div>
            <button type="button" className="text-sm font-medium underline-offset-4 hover:underline" onClick={() => setShowHistory((value) => !value)} aria-expanded={showHistory}>
              {showHistory ? "Hide earlier checks" : `Earlier checks (${earlier.length})`}
            </button>
            {showHistory ? (
              <ul className="mt-2 divide-y border text-sm">
                {earlier.map((check) => (
                  <li key={check.id} className="flex flex-wrap justify-between gap-2 px-3 py-2">
                    <span>Check {check.attempt} · {shortDate(check.createdAt)}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {check.report ? `${check.report.percent}%${check.report.completed ? ", complete" : ""}` : check.status === "FAILED" ? "did not finish" : "running"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {params.courseSlug && state.decision?.verdict === "APPROVED" ? <CertificateCard courseSlug={params.courseSlug} /> : null}
      </div>
    </section>
  );
}
