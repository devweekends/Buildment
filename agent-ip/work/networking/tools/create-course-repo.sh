#!/usr/bin/env bash
# Create a course repository in the instructor's GitHub and push a source folder to it.
# Usage: bash create-course-repo.sh <owner> <name> <source-dir> <public|private> [template]
# Needs the GitHub CLI (gh) logged in as someone who may create repositories for <owner>.
# See agent-ip/proposals/2026-10-26-course-repos-with-instructor.md.
set -euo pipefail

OWNER="$1"; NAME="$2"; SRC="$3"; VISIBILITY="$4"; TEMPLATE="${5:-}"
[ -d "$SRC" ] || { echo "source folder not found: $SRC"; exit 1; }
case "$VISIBILITY" in public|private) ;; *) echo "visibility must be public or private"; exit 1;; esac

if gh repo view "$OWNER/$NAME" >/dev/null 2>&1; then
  echo "$OWNER/$NAME already exists; refusing to overwrite it"; exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
(cd "$SRC" && tar -cf - .) | (cd "$WORK" && tar -xf -)
cd "$WORK"
git init -q -b main
git add -A
git commit -q -m "Initial course template"
gh repo create "$OWNER/$NAME" "--$VISIBILITY" --source . --remote origin --push >/dev/null
if [ "$TEMPLATE" = "template" ]; then
  gh api -X PATCH "repos/$OWNER/$NAME" -F is_template=true >/dev/null
fi
echo "created https://github.com/$OWNER/$NAME ($VISIBILITY${TEMPLATE:+, template})"
