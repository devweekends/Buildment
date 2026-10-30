import { env } from "../../config/env.js";
import { logger } from "../../utils/logger.js";
import { ServiceUnavailableError } from "../../utils/errors.js";

const CONTENT_COMMAND = "bash server/scripts/run-content-from-core.sh";

export type StartedContentDyno = {
  id: string;
  name: string;
};

/** Starts a detached one-off dyno on this Heroku app to clone core and run courses:check. */
export async function startContentSyncDyno(): Promise<StartedContentDyno> {
  const apiKey = env.HEROKU_API_KEY;
  const appName = env.HEROKU_APP_NAME;
  if (!apiKey || !appName) {
    throw new ServiceUnavailableError("Content sync is not configured (HEROKU_API_KEY / HEROKU_APP_NAME).", "CONTENT_SYNC_DISABLED");
  }
  if (!env.CONTENT_GITHUB_SSH_KEY) {
    throw new ServiceUnavailableError("Content sync is not configured (CONTENT_GITHUB_SSH_KEY).", "CONTENT_SYNC_DISABLED");
  }

  const response = await fetch(`https://api.heroku.com/apps/${encodeURIComponent(appName)}/dynos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/vnd.heroku+json; version=3",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attach: false,
      command: CONTENT_COMMAND,
      type: "run",
      time_to_live: 3_600,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    logger.error({ status: response.status, detail }, "failed to start content sync dyno");
    throw new ServiceUnavailableError("Could not start the content sync job on Heroku.", "CONTENT_SYNC_START_FAILED");
  }

  const body = (await response.json()) as { id?: string; name?: string };
  if (!body.id || !body.name) {
    throw new ServiceUnavailableError("Heroku returned an unexpected dyno response.", "CONTENT_SYNC_START_FAILED");
  }

  logger.info({ dynoId: body.id, dynoName: body.name, publish: env.CONTENT_PUBLISH }, "started content sync dyno");
  return { id: body.id, name: body.name };
}
