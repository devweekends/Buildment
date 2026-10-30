import type { Request, Response } from "express";
import { env } from "../../config/env.js";
import { logger } from "../../utils/logger.js";
import { ok } from "../../utils/responses.js";
import { UnauthorizedError, ServiceUnavailableError } from "../../utils/errors.js";
import {
  isPushToBranch,
  pushTouchesCourses,
  verifyGithubSignature,
  type GithubPushPayload,
} from "../../services/content/github-push.js";
import { startContentSyncDyno } from "../../services/content/start-content-dyno.js";

/**
 * POST /api/v1/webhooks/github/content
 * GitHub push webhook for Buildment-core. When main changes under courses/, start
 * a Heroku one-off dyno that clones core and runs courses:check (optional publish).
 */
export async function handleGithubContentWebhook(req: Request, res: Response) {
  const secret = env.CONTENT_WEBHOOK_SECRET;
  if (!secret) {
    throw new ServiceUnavailableError("CONTENT_WEBHOOK_SECRET is not configured", "CONTENT_WEBHOOK_DISABLED");
  }

  const rawBody = Buffer.isBuffer(req.body)
    ? req.body
    : Buffer.from(typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {}), "utf8");

  const signature = req.header("x-hub-signature-256") ?? undefined;
  if (!verifyGithubSignature(rawBody, signature, secret)) {
    throw new UnauthorizedError("Invalid GitHub webhook signature", "WEBHOOK_SIGNATURE_INVALID");
  }

  const event = req.header("x-github-event") ?? "";
  if (event === "ping") {
    return ok(res, { received: true, event: "ping" });
  }
  if (event !== "push") {
    return ok(res, { received: true, skipped: true, reason: "not_a_push", event });
  }

  let payload: GithubPushPayload;
  try {
    payload = JSON.parse(rawBody.toString("utf8")) as GithubPushPayload;
  } catch {
    throw new UnauthorizedError("Invalid webhook JSON", "WEBHOOK_PAYLOAD_INVALID");
  }

  if (!isPushToBranch(payload.ref, "main")) {
    return ok(res, { received: true, skipped: true, reason: "not_main", ref: payload.ref ?? null });
  }

  if (!pushTouchesCourses(payload)) {
    return ok(res, { received: true, skipped: true, reason: "no_course_changes" });
  }

  const dyno = await startContentSyncDyno();
  logger.info({ dyno }, "content webhook accepted course push on main");
  return ok(res, { received: true, started: true, dyno }, { status: 202 });
}
