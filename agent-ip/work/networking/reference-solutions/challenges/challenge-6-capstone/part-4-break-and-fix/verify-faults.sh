#!/usr/bin/env bash
# Verify the capstone fault matrix in the lab. Reference solution only.
# For each fault F1 to F7:
#   1. rebuild the healthy network and inject only that fault   (bash break.sh --only Fx)
#   2. run the test sets of parts 1, 2 and 3: at least one must FAIL, and a FAIL line must match the symptom
#   3. apply the reference fix                                   (bash fix.sh Fx)
#   4. run the test sets again: all must PASS
# Then it checks that a few seeds draw three different faults that may be combined.
# It takes a while (each rebuild is about 30 seconds). Run it in the lab:  bash verify-faults.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../../../toolkit/lib.sh"
require_root

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# run_tests: run the three test sets. Sets FAILED_SETS (a number) and writes all FAIL lines to $TMP/fails.txt
run_tests() {
  local part out rc
  FAILED_SETS=0
  : > "$TMP/fails.txt"
  for part in part-1-addresses-and-routes part-2-nat-forwarding-isolation part-3-dhcp-and-dns; do
    rc=0
    out="$(bash "$HERE/../$part/test.sh" 2>&1)" || rc=$?
    grep '^FAIL' <<< "$out" >> "$TMP/fails.txt" || true
    if [ "$rc" -ne 0 ]; then
      FAILED_SETS=$((FAILED_SETS + 1))
    fi
  done
}

# symptom FAULT: a pattern that at least one FAIL line must match
symptom() {
  case "$1" in
    F1) echo 'homeweb|192\.168\.1\.20' ;;
    F2) echo 'cannot get the page|cannot read|curl exit 28' ;;
    F3) echo 'Network is unreachable|hrouter reaches the public server|ip route get' ;;
    F4) echo 'dig' ;;
    F5) echo 'cannot get the page|curl exit 28' ;;
    F6) echo 'brand-new device' ;;
    F7) echo 'isolation rule is missing' ;;
  esac
}

for fault in F1 F2 F3 F4 F5 F6 F7; do
  echo "=== $fault: inject"
  bash "$HERE/break.sh" --only "$fault" > "$TMP/break.log" 2>&1 || { cat "$TMP/break.log"; t_fail "$fault: break.sh failed"; continue; }
  run_tests
  if [ "$FAILED_SETS" -ge 1 ] && grep -Eq "$(symptom "$fault")" "$TMP/fails.txt"; then
    t_pass "$fault: after injection, $FAILED_SETS test set(s) fail and a FAIL line matches the symptom"
  else
    t_fail "$fault: after injection, expected a FAIL line matching '$(symptom "$fault")'. Failed sets: $FAILED_SETS. FAIL lines: $(cat "$TMP/fails.txt")"
  fi
  sed 's/^/    /' "$TMP/fails.txt" | cut -c1-200
  echo "=== $fault: fix"
  bash "$HERE/fix.sh" "$fault" > "$TMP/fix.log" 2>&1 || { cat "$TMP/fix.log"; t_fail "$fault: fix.sh failed"; continue; }
  run_tests
  if [ "$FAILED_SETS" -eq 0 ]; then
    t_pass "$fault: after the fix, all three test sets pass"
  else
    t_fail "$fault: after the fix, $FAILED_SETS test set(s) still fail: $(cat "$TMP/fails.txt")"
  fi
done

echo "=== the draw"
for seed in alpha beta gamma kahn-2026 42 mentor-demo; do
  PICKS="$(bash "$HERE/break.sh" --list "$seed" | sed -n '1s/.*picks: //p')"
  COUNT="$(wc -w <<< "$PICKS" | tr -d ' ')"
  UNIQUE="$(tr ' ' '\n' <<< "$PICKS" | sort -u | wc -l | tr -d ' ')"
  if [ "$COUNT" = "3" ] && [ "$UNIQUE" = "3" ]; then
    t_pass "seed $seed draws three different faults: $PICKS"
  else
    t_fail "seed $seed drew '$PICKS'"
  fi
done

t_done
