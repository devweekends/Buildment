#!/usr/bin/env bash
# Clone private Buildment-core with the read-only deploy key, then check (and
# optionally publish) courses against this platform slug. Intended for a Heroku
# one-off dyno started by the GitHub content webhook.
set -euo pipefail

if [[ -z "${CONTENT_GITHUB_SSH_KEY:-}" ]]; then
  echo "CONTENT_GITHUB_SSH_KEY is required" >&2
  exit 1
fi

ROOT="${TMPDIR:-/tmp}/buildment-core-content-$$"
KEY_FILE="${TMPDIR:-/tmp}/buildment-core-deploy-$$.key"
REPO_REF="${CONTENT_REPO_REF:-main}"

cleanup() {
  rm -rf "$ROOT" "$KEY_FILE"
}
trap cleanup EXIT

# Heroku config vars often flatten newlines to literal \n sequences.
printf '%s\n' "$CONTENT_GITHUB_SSH_KEY" | sed 's/\r$//' | sed 's/\\n/\n/g' >"$KEY_FILE"
chmod 600 "$KEY_FILE"

export GIT_SSH_COMMAND="ssh -i ${KEY_FILE} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
git clone --depth 1 --branch "$REPO_REF" git@github.com:devweekends/Buildment-core.git "$ROOT"

export BUILDMENT_CONTENT_ROOT="$ROOT"

# Root slug uses pnpm --dir server; APP_BASE=server slugs already sit in server/.
if [[ -f package.json && -d server ]]; then
  pnpm --dir server courses:check
  if [[ "${CONTENT_PUBLISH:-}" == "true" ]]; then
    pnpm --dir server courses:publish
  fi
elif [[ -f package.json ]]; then
  pnpm courses:check
  if [[ "${CONTENT_PUBLISH:-}" == "true" ]]; then
    pnpm courses:publish
  fi
else
  echo "Could not find the Buildment server package in the slug" >&2
  exit 1
fi
