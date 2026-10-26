#!/usr/bin/env bash
# Challenge 6, part 3 (reference solution): DHCP and DNS.
# Builds parts 1 and 2, then starts one dnsmasq in the home router. home1, home2 and guest1
# give up their placeholder addresses and ask for leases. Names work through the resolver files.
#
# Run it in the lab:  bash dhcp-and-dns.sh
# Safe to run again: part 1 deletes the old network first.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../../../toolkit/lib.sh"
require_root

PART2="$HERE/../part-2-nat-forwarding-isolation/nat-forwarding-isolation.sh"
LEASES=/tmp/networking-course-dnsmasq.leases
[ -f "$PART2" ] || die "part 2 is missing: $PART2"
echo "--- building parts 1 and 2"
if ! bash "$PART2" > /tmp/networking-course-capstone-part2.log 2>&1; then
  cat /tmp/networking-course-capstone-part2.log
  die "your part 2 script failed. Make parts 1 and 2 pass their tests first."
fi

# Start dnsmasq in the home router, under the name "dnsmasq" (the tests and break.sh stop it by that name).
rm -f "$LEASES"
bg_start dnsmasq hrouter dnsmasq --keep-in-foreground --conf-file="$HERE/dnsmasq.conf"
sleep 3
if ! kill -0 "$(cat "$NET_PID_DIR/dnsmasq.pid")" 2>/dev/null; then
  echo "dnsmasq stopped at once. Its message was:"
  cat "$NET_PID_DIR/dnsmasq.log"
  exit 1
fi
echo "dnsmasq is running."

# The three devices ask for leases. The hook script applies each lease and writes the resolver file.
HOOK="$(udhcpc_hook_path)"
get_lease() {
  local ns="$1"
  NS_NAME="$ns" ip netns exec "$ns" busybox udhcpc -i "$(first_if "$ns")" -s "$HOOK" -n -q -t 5 -T 2
}
for device in home1 home2 guest1; do
  echo "--- $device asks for a lease"
  get_lease "$device" || echo "($device got no lease)"
done

for device in home1 home2 guest1; do
  echo "--- $device"
  in_ns "$device" ip -4 -o addr show dev "$(first_if "$device")"
  in_ns "$device" ip route
  cat "/etc/netns/$device/resolv.conf" 2>/dev/null || echo "(no resolver file)"
done

echo "--- names: dig asks the router, curl uses the resolver file from the lease"
in_ns home1 dig +short +time=2 +tries=1 @192.168.1.1 web.test || true
in_ns guest1 dig +short +time=2 +tries=1 @192.168.50.1 web.test || true
in_ns home1 curl -sS -m 3 http://web.test:8080/cgi-bin/whoami || echo "(home1 failed)"
in_ns guest1 curl -sS -m 3 http://web.test:8080/cgi-bin/whoami || echo "(guest1 failed)"
echo "Done. Next: bash test.sh"
