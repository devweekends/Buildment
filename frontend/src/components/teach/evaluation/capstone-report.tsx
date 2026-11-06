import type { ReviewDetailView } from "@/shared/api/teach";
import type { CapstoneMentorView } from "@/shared/blocks/capstone-check/report";

// The mentor's view of a capstone check: the same report the learner saw, plus the
// evidence the grader cited, the commit, the model and what the check cost.

const money = (usd: number) => (usd === 0 ? "free" : `$${usd.toFixed(usd < 0.01 ? 4 : 2)}`);

function CheckSummary({ check }: { check: CapstoneMentorView }) {
  const report = check.report;
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-muted-foreground">AI result</dt>
        <dd className="font-medium">
          {report ? `${report.percent}%, ${report.completed ? "complete" : "not complete"}` : check.status === "FAILED" ? "did not finish" : "running"}
        </dd>
        <dt className="text-muted-foreground">Repo</dt>
        <dd className="break-all">
          <a href={check.repoUrl} className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer noopener">{check.repoUrl.replace("https://github.com/", "")}</a>
          {check.commitSha ? <span className="text-muted-foreground"> at {check.commitSha.slice(0, 7)}</span> : null}
        </dd>
        {check.liveUrl ? (
          <>
            <dt className="text-muted-foreground">Live site</dt>
            <dd className="break-all">
              <a href={check.liveUrl} className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer noopener">{check.liveUrl}</a>
            </dd>
          </>
        ) : null}
        <dt className="text-muted-foreground">Grader</dt>
        <dd>
          {check.reused ? "reused the grade for this commit" : (check.model ?? "no model call")}
          {check.reused ? null : `, ${check.inputTokens.toLocaleString()} in / ${check.outputTokens.toLocaleString()} out, ${money(check.costUsd)}`}
        </dd>
        <dt className="text-muted-foreground">Rubric</dt>
        <dd>{check.packId} v{check.packVersion}{report ? `, confidence ${report.confidence}` : ""}</dd>
      </dl>

      {report?.summary ? <p className="text-sm leading-relaxed">{report.summary}</p> : null}

      <div>
        <h3 className="text-xs font-medium text-muted-foreground">Automated checks</h3>
        <ul className="mt-1.5 space-y-1 text-sm">
          {check.automated.map((result) => (
            <li key={result.id}>
              <span className={result.status === "pass" ? "text-ok" : result.status === "fail" ? "text-destructive" : "text-muted-foreground"}>{result.status}</span>{" "}
              {result.message}
            </li>
          ))}
        </ul>
      </div>

      {report?.graded ? (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground">Criteria and evidence</h3>
          {report.criteria.map((criterion) => (
            <div key={criterion.id} className="rounded-lg border p-3 text-sm">
              <p className="flex justify-between gap-3 font-medium">
                <span>{criterion.title}{criterion.required ? " (required)" : ""}</span>
                <span className="tabular-nums">{criterion.score}/{criterion.max} · weight {criterion.weight}</span>
              </p>
              {criterion.gatedBy.length ? <p className="mt-1 text-xs text-destructive">Capped at 0 by {criterion.gatedBy.join(", ")}</p> : null}
              {criterion.evidence.length ? (
                <ul className="mt-1.5 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
                  {criterion.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
              {criterion.missing.length ? (
                <ul className="mt-1.5 space-y-0.5 text-xs leading-relaxed">
                  {criterion.missing.map((item) => <li key={item}>Missing: {item}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {report && report.qualityNotes.strengths.length + report.qualityNotes.improvements.length > 0 ? (
        <div>
          <h3 className="text-xs font-medium text-muted-foreground">Quality notes</h3>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-sm">
            {[...report.qualityNotes.strengths, ...report.qualityNotes.improvements].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function CapstoneReport({ capstone }: { capstone: NonNullable<ReviewDetailView["capstone"]> }) {
  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-sm font-semibold">{capstone.title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">AI capstone check. Advisory only: your verdict decides.</p>
      <div className="mt-4">{capstone.current ? <CheckSummary check={capstone.current} /> : <p className="text-sm">No check is linked to this submission.</p>}</div>
      {capstone.history.length > 0 ? (
        <div className="mt-5 border-t pt-4">
          <h3 className="text-sm font-semibold">Earlier checks</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {capstone.history.map((check) => (
              <li key={check.id} className="flex flex-wrap justify-between gap-2">
                <span>Check {check.attempt} · {new Date(check.createdAt).toLocaleString()}</span>
                <span className="tabular-nums text-muted-foreground">
                  {check.report ? `${check.report.percent}%` : check.status.toLowerCase()} · {money(check.costUsd)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

/** Feedback text the mentor can send as it is (confirm) or edit (override). */
export function capstoneDraftFeedback(check: CapstoneMentorView | null): string {
  const report = check?.report;
  if (!report) return "";
  const left = report.whatIsLeft.map((item) => `- ${item.title}: ${item.steps[0] ?? ""}`).join("\n");
  return [
    `Confirmed the AI check: ${report.percent}%, ${report.completed ? "complete" : "not complete yet"}.`,
    report.summary,
    left ? `Still to do:\n${left}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}
