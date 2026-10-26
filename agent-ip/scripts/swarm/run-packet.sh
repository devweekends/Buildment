#!/usr/bin/env bash
# Run one work packet on any command-line model, wait out usage limits, and resume until it is done.
# A packet is a folder with a task file, an in/ folder of inputs and an out/ folder for results
# (proposals/2026-10-26-task-tiers-and-swarm-runner.md).
#
#   bash run-packet.sh <packet-dir> <task-file> <done-file> [--cli codex|claude|agy] [--model NAME] [--tries N]
#
# <done-file> is relative to the packet, for example out/REPORT.md; the packet is done when it exists and is not empty.
# The log is <packet-dir>/run.log. Stdin is closed so a headless run never waits for input (01-agent-system.md).
set -uo pipefail

DIR="$1"; TASK="$2"; DONE="$3"; shift 3
CLI=codex; MODEL=""; TRIES=8
while [ $# -gt 0 ]; do
  case "$1" in
    --cli) CLI="$2"; shift ;;
    --model) MODEL="$2"; shift ;;
    --tries) TRIES="$2"; shift ;;
    *) echo "unknown option $1"; exit 2 ;;
  esac
  shift
done
[ -f "$DIR/$TASK" ] || { echo "no task file $DIR/$TASK"; exit 2; }
LOG="$DIR/run.log"
log() { echo "$(date '+%F %T') $*" >> "$LOG"; }

# A usage-limit message names when to try again: "try again at 6:12 PM", "try again at Oct 27th, 2026 4:36 AM"
# or "resets in 99h30m". Wait until two minutes after it. Returns 1 when the log has no such message.
wait_limit() {
  local line when now h m
  now=$(date +%s)
  line="$(grep -oiE 'try again at [^.]*[0-9]{1,2}:[0-9]{2} ?(AM|PM)?' "$1" | tail -1 | sed -E 's/^try again at //I; s/([0-9])(st|nd|rd|th)/\1/')"
  if [ -n "$line" ]; then
    when=$(date -d "$line" +%s 2>/dev/null || echo 0)
    [ "$when" -gt 0 ] && [ "$when" -le "$now" ] && when=$((when + 86400))
  else
    line="$(grep -oiE 'resets? in [0-9]+h ?[0-9]*m?' "$1" | tail -1)"
    [ -n "$line" ] || return 1
    h=$(grep -oE '[0-9]+h' <<< "$line" | tr -d h); m=$(grep -oE '[0-9]+m' <<< "$line" | tr -d m)
    when=$((now + ${h:-0} * 3600 + ${m:-0} * 60))
  fi
  # A time we could not read: try again in an hour rather than give up.
  [ "$when" -gt 0 ] || when=$((now + 3600))
  log "usage limit, waiting until $(date -d @$((when + 120)) '+%F %T')"
  while [ "$(date +%s)" -lt $((when + 120)) ]; do sleep 60; done
}

# A login problem shows as an error line from the tool, not as words in the work it read.
login_expired() {
  grep -E '^(ERROR|Error|error)' "$1" | grep -qiE '401|unauthori[sz]ed|not logged in|log ?in again|token (has )?expired|re-?authenticate'
}

run_once() {   # prompt logfile
  case "$CLI" in
    codex)  (cd "$DIR" && timeout 3600 codex exec --skip-git-repo-check -s workspace-write ${MODEL:+-m "$MODEL"} -C "$(pwd -W 2>/dev/null || pwd)" "$1" < /dev/null > "$2" 2>&1) ;;
    claude) (cd "$DIR" && timeout 3600 claude -p ${MODEL:+--model "$MODEL"} --permission-mode acceptEdits "$1" < /dev/null > "$2" 2>&1) ;;
    agy)    (cd "$DIR" && timeout 3600 agy ${MODEL:+--model "$MODEL"} -p "$1" < /dev/null > "$2" 2>&1) ;;
    *) echo "unknown cli $CLI"; exit 2 ;;
  esac
}

tries=0
while [ ! -s "$DIR/$DONE" ] && [ "$tries" -lt "$TRIES" ]; do
  tries=$((tries + 1)); lf="$DIR/run-$tries.log"
  prompt="Read $TASK in this folder and do it completely. Write only into out/. Do not modify anything else."
  [ "$tries" -gt 1 ] && prompt="$prompt An earlier run stopped part way: keep what is in out/ and finish it."
  log "start $CLI ${MODEL:-default} try $tries"
  run_once "$prompt" "$lf"; rc=$?
  log "end try $tries rc=$rc"
  if ! wait_limit "$lf" && [ "$rc" -ne 0 ] && [ ! -s "$DIR/$DONE" ] && login_expired "$lf"; then
    log "STOPPED: the $CLI login needs renewing"
    exit 3
  fi
done
if [ -s "$DIR/$DONE" ]; then log "DONE $DONE"; exit 0; fi
log "GAVE UP after $tries tries"; exit 1
