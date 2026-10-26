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

# A usage-limit message names the time to try again; wait until two minutes after it.
wait_limit() {
  local t when now
  t="$(grep -oiE 'try again at [0-9]{1,2}:[0-9]{2} ?(AM|PM)?|resets? in [0-9]+h ?[0-9]*m?' "$1" | tail -1)"
  [ -n "$t" ] || return 1
  now=$(date +%s)
  if [[ "$t" =~ [Tt]ry ]]; then
    when=$(date -d "$(sed -E 's/try again at //I' <<< "$t")" +%s 2>/dev/null || echo "$now")
    [ "$when" -le "$now" ] && when=$((when + 86400))
  else
    local h m; h=$(grep -oE '[0-9]+h' <<< "$t" | tr -d h); m=$(grep -oE '[0-9]+m' <<< "$t" | tr -d m)
    when=$((now + ${h:-0} * 3600 + ${m:-0} * 60))
  fi
  log "usage limit, waiting until $(date -d @$((when + 120)) '+%F %T')"
  while [ "$(date +%s)" -lt $((when + 120)) ]; do sleep 60; done
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
  wait_limit "$lf" || { [ "$rc" -ne 0 ] && [ ! -s "$DIR/$DONE" ] && grep -qiE 'auth|401|login' "$lf" && { log "STOPPED: the $CLI login needs renewing"; exit 3; }; }
done
if [ -s "$DIR/$DONE" ]; then log "DONE $DONE"; exit 0; fi
log "GAVE UP after $tries tries"; exit 1
