import Link from "next/link";
import { ArrowUpRight, KeyRound, ListChecks, Rocket, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  INTEGRATION_ACCESS_KEY_HEADER,
  INTEGRATION_API_CATALOG,
  INTEGRATION_SECRET_KEY_HEADER,
} from "@/lib/integration-api-catalog";
import { CopyCodeButton } from "@/components/integrations/copy-code-button";

const SETUP_STEPS = [
  {
    icon: KeyRound,
    title: "Get organization credentials",
    body: "An Edorax platform admin creates your organization and issues an access key and secret. Store the secret safely: it is shown only once, when it is created or rotated.",
  },
  {
    icon: ListChecks,
    title: "Obtain course access",
    body: "Your org needs an approved allocation for each published course. Request access with POST /integrations/v1/course-requests, or ask an admin to approve the queue in the admin console.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticate every request",
    body: `Send both ${INTEGRATION_ACCESS_KEY_HEADER} and ${INTEGRATION_SECRET_KEY_HEADER} on every API call. Missing or invalid credentials return 401.`,
  },
  {
    icon: Rocket,
    title: "Enroll learners",
    body: "Use POST /integrations/v1/enrollments with student_email and course_id. Pass external_assignment_id when you need idempotent assignment IDs from your LMS.",
  },
] as const;

function connectionExample(origin: string) {
  return `curl -sS "${origin}/integrations/v1/connection" \\
  -H "${INTEGRATION_ACCESS_KEY_HEADER}: <access-key>" \\
  -H "${INTEGRATION_SECRET_KEY_HEADER}: <secret-key>"`;
}

function enrollmentExample(origin: string) {
  return `curl -sS -X POST "${origin}/integrations/v1/enrollments" \\
  -H "Content-Type: application/json" \\
  -H "${INTEGRATION_ACCESS_KEY_HEADER}: <access-key>" \\
  -H "${INTEGRATION_SECRET_KEY_HEADER}: <secret-key>" \\
  -d '{
    "student_email": "learner@example.com",
    "course_id": "<course-id>",
    "external_assignment_id": "your-lms-assignment-123"
  }'`;
}

function progressExample(origin: string) {
  return `curl -sS -G "${origin}/integrations/v1/progress" \\
  --data-urlencode "course_id=<course-id>" \\
  --data-urlencode "learner_email=learner@example.com" \\
  -H "${INTEGRATION_ACCESS_KEY_HEADER}: <access-key>" \\
  -H "${INTEGRATION_SECRET_KEY_HEADER}: <secret-key>"`;
}

const PROGRESS_RESPONSE_EXAMPLE = `{
  "overall_progress": 50,
  "completed_chapters": 1,
  "total_chapters": 2,
  "time_spent_seconds": 3600,
  "current_chapter": {
    "id": "chapter-b",
    "title": "Chapter B",
    "module_title": "Module 1",
    "status": "IN_PROGRESS",
    "progress": 25
  },
  "modules": [
    {
      "id": "module-1",
      "title": "Module 1",
      "status": "IN_PROGRESS",
      "progress_percent": 63,
      "completed_chapters": 1,
      "total_chapters": 2,
      "chapters": [
        {
          "id": "chapter-a",
          "title": "Chapter A",
          "status": "COMPLETED",
          "completed": true,
          "progress_percent": 100,
          "blocks_completed": 4,
          "blocks_total": 4,
          "score": 8,
          "max_score": 10,
          "time_spent_seconds": 2400
        },
        {
          "id": "chapter-b",
          "title": "Chapter B",
          "status": "IN_PROGRESS",
          "completed": false,
          "progress_percent": 25,
          "blocks_completed": 1,
          "blocks_total": 4,
          "time_spent_seconds": 1200
        }
      ]
    }
  ]
}`;

export function IntegrationDocsContent({ baseUrl }: { baseUrl: string }) {
  const origin = baseUrl.replace(/\/$/, "");
  const connectionCurl = connectionExample(origin);
  const enrollCurl = enrollmentExample(origin);
  const progressCurl = progressExample(origin);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:px-6 sm:pt-14">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Organization API</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Connect your platform to Edorax
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Enroll learners, sync progress, and manage course access from Pathment, your internal LMS, or any
          backend that can send HTTP requests with organization credentials.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">REST · JSON</Badge>
          <Badge variant="outline">{INTEGRATION_API_CATALOG.version}</Badge>
          <Link
            href="/integrations/v1"
            className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            OpenAPI-style catalog
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mt-12 max-w-4xl space-y-10">
          <section id="setup" aria-labelledby="setup-heading">
            <h2 id="setup-heading" className="text-xl font-semibold tracking-tight">
              Setup checklist
            </h2>
            <ol className="mt-6 space-y-4">
              {SETUP_STEPS.map((step, index) => (
                <li key={step.title}>
                  <Card className="border-border/80 shadow-sm">
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                        <step.icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <CardTitle className="text-base">
                          <span className="mr-2 font-mono text-xs text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {step.title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-sm leading-relaxed">{step.body}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          <section id="endpoints" aria-labelledby="endpoints-heading">
            <h2 id="endpoints-heading" className="text-xl font-semibold tracking-tight">
              Endpoints
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All routes live under{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{INTEGRATION_API_CATALOG.basePath}</code>
              . Responses are JSON unless noted.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Path</th>
                    <th className="px-4 py-3 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {INTEGRATION_API_CATALOG.endpoints.map((endpoint) => (
                    <tr key={endpoint.path} className="bg-card">
                      <td className="px-4 py-3 align-top">
                        <Badge variant={endpoint.method === "POST" ? "default" : "secondary"} className="font-mono text-[10px]">
                          {endpoint.method}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <code className="font-mono text-xs">{endpoint.path}</code>
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">{endpoint.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="verify-connection" aria-labelledby="verify-connection-heading">
            <h2 id="verify-connection-heading" className="text-xl font-semibold tracking-tight">
              Verify credentials
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Call{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">GET /integrations/v1/connection</code> from
              your server or terminal. A successful response includes{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">connected: true</code> and your organization
              slug.
            </p>
            <div className="mt-4 rounded-2xl border bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sample request</p>
                <CopyCodeButton text={connectionCurl} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed">
                {connectionCurl}
              </pre>
            </div>
          </section>

          <section id="enrollment-example" aria-labelledby="enrollment-heading">
            <h2 id="enrollment-heading" className="text-xl font-semibold tracking-tight">
              Enroll a learner
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              After{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">GET /integrations/v1/courses</code> shows an
              allocation, create an enrollment. A 201 means a new row was created; 200 means the idempotent assignment
              already existed.
            </p>
            <div className="mt-4 rounded-2xl border bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sample request</p>
                <CopyCodeButton text={enrollCurl} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed">
                {enrollCurl}
              </pre>
            </div>
          </section>

          <section id="learner-progress-report" aria-labelledby="learner-progress-heading">
            <h2 id="learner-progress-heading" className="text-xl font-semibold tracking-tight">
              Read a learner&apos;s course progress
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enroll the learner once, then request this report as they make progress. It includes every chapter in
              their assigned course release, including chapters they have not started. Check each chapter&apos;s
              <code className="mx-1 rounded bg-muted px-1 font-mono text-xs">status</code>
              and
              <code className="mx-1 rounded bg-muted px-1 font-mono text-xs">completed</code>
              fields to show progress in your platform. The report is scoped to your organization&apos;s enrollment.
            </p>
            <div className="mt-4 rounded-2xl border bg-muted/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sample request</p>
                <CopyCodeButton text={progressCurl} />
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed">
                {progressCurl}
              </pre>
            </div>
            <div className="mt-4 rounded-2xl border bg-muted/20 p-4 sm:p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Response fields</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed">
                {PROGRESS_RESPONSE_EXAMPLE}
              </pre>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              The response also includes enrollment lifecycle, dates, review counts, course-level scores, and a
              report timestamp. See <code className="rounded bg-muted px-1 font-mono text-xs">docs/organization-api.mdx</code> in the repository for the complete contract.
            </p>
          </section>

      </div>
    </div>
  );
}
