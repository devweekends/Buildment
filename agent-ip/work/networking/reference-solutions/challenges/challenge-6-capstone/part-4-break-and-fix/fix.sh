#!/usr/bin/env bash
# Reference fixes for the capstone faults. Reference solution only: this file is not in the learner template.
#   bash fix.sh F3       apply the fix for one fault
#   bash fix.sh all      apply every fix (each fix is safe on a network that does not have that fault)
# Each fix is the smallest change that removes the cause.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../../../toolkit/lib.sh"
require_root

PART3="$HERE/../part-3-dhcp-and-dns"
CONF_BACKUP=/tmp/networking-course-dnsmasq.conf.orig

# F1: put the right mask back on the home web server, and its default route.
fix_F1() {
  local dev
  dev="$(first_if homeweb)"
  ip netns exec homeweb ip addr flush dev "$dev"
  ip netns exec homeweb ip addr add 192.168.1.20/24 dev "$dev"
  ip netns exec homeweb ip route add default via 192.168.1.1
}

# F2: forwarding back on.
fix_F2() {
  ip netns exec hrouter sysctl -qw net.ipv4.ip_forward=1
}

# F3: the home router's default route, through the provider router.
fix_F3() {
  ip netns exec hrouter ip route replace default via 198.51.100.1
}

# F4: remove the table that drops port 53.
fix_F4() {
  ip netns exec hrouter nft delete table ip fault4 2>/dev/null || true
}

# F5: the masquerade rule, back in the postrouting chain, if it is missing.
fix_F5() {
  local rules
  rules="$(ip netns exec hrouter nft list ruleset)"
  if ! grep -q masquerade <<< "$rules"; then
    ip netns exec hrouter nft add rule ip nat postrouting oifname '"veth-hout"' masquerade
  fi
}

# F6: the full home pool again, dnsmasq restarted, and the new device asks again.
fix_F6() {
  local hook
  if [ -f "$CONF_BACKUP" ]; then
    cp "$CONF_BACKUP" "$PART3/dnsmasq.conf"
    stop_proc dnsmasq
    bg_start dnsmasq hrouter dnsmasq --keep-in-foreground --conf-file="$PART3/dnsmasq.conf"
    sleep 3
  fi
  if ns_exists home3; then
    hook="$(udhcpc_hook_path)"
    NS_NAME=home3 ip netns exec home3 busybox udhcpc -i "$(first_if home3)" -s "$hook" -n -q -t 5 -T 2 || true
  fi
}

# F7: the guest isolation rule, back in the forward chain, if it is missing.
fix_F7() {
  local rules
  rules="$(ip netns exec hrouter nft list ruleset)"
  if ! grep -q 'drop' <<< "$(grep -v fault4 <<< "$rules")"; then
    ip netns exec hrouter nft add rule ip filter forward ip saddr 192.168.50.0/24 ip daddr 192.168.1.0/24 drop
  fi
}

case "${1:-}" in
  F1|F2|F3|F4|F5|F6|F7) "fix_$1" ;;
  all) for f in F1 F2 F3 F4 F5 F6 F7; do "fix_$f"; done ;;
  *) die "usage: bash fix.sh F1..F7 | all" ;;
esac
echo "Applied the fix for ${1}. Run: bash test.sh"
