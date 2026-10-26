# Fault write-up (reference example)

This is a filled example for the seed `gamma`. It shows the shape of a good write-up: exact output, the finder, what it means, the fix, the test again. A mentor can check it with `bash break.sh --list gamma`, which draws F1, F4 and F5. Outputs are the shape a real run shows. Times, ports and addresses in the pool differ.

Seed: `gamma` (saved in `fault-seed.txt`)

## Starting point

`bash test.sh` right after `bash break.sh gamma`:

```
FAIL homeweb has 192.168.1.20/24 ...
FAIL homeweb reaches its router, 192.168.1.1 FAILED. Ping said: ping: connect: Network is unreachable
FAIL hrouter cannot read http://192.168.1.20/ (curl exit 28) ...
FAIL home1 cannot get the page from http://203.0.113.80:8080/cgi-bin/whoami (curl exit 28) ...
FAIL home1: dig @192.168.1.1 web.test should return 203.0.113.80. It returned: ;; communications error to 192.168.1.1#53: timed out
RESULT: ... check(s) failed
```

I work down the layers: address first, then gateway, then route, then name, then page.

## Fault 1: wrong mask on the home web server (F1)

**Symptom.** `ip netns exec homeweb ping -c1 -W1 192.168.1.1`:

```
ping: connect: Network is unreachable
```

It failed at once, and nothing was sent. That means `homeweb` has no route to `192.168.1.1`.

**Finder.** `ip netns exec homeweb ip addr`:

```
2: veth-homeweb    inet 192.168.1.20/28 brd 192.168.1.31 scope global veth-homeweb
```

and `ip netns exec homeweb ip route`:

```
192.168.1.16/28 dev veth-homeweb proto kernel scope link src 192.168.1.20
```

**What it means.** The mask is `/28`, not `/24`. A `/28` holds 16 addresses: `192.168.1.16` to `192.168.1.31`. The router, `192.168.1.1`, is outside that block, and there is no default route. So `homeweb` thinks `192.168.1.1` is not on its own network and has nowhere to send to.

**Fix.**

```
ip netns exec homeweb ip addr flush dev veth-homeweb
ip netns exec homeweb ip addr add 192.168.1.20/24 dev veth-homeweb
ip netns exec homeweb ip route add default via 192.168.1.1
```

**Test again.** `ip netns exec homeweb ping -c1 -W1 192.168.1.1` now says `1 received`. In `bash test.sh` the two `homeweb` lines pass. The `hrouter cannot read http://192.168.1.20/` line passes too.

## Fault 2: the masquerade rule is missing (F5)

**Symptom.** `ip netns exec home1 curl -sS -m 3 http://203.0.113.80:8080/cgi-bin/whoami`:

```
curl: (28) Connection timed out after 3001 milliseconds
```

The address is right and the router is reachable, but the page hangs.

**Finder.** `ip netns exec hrouter tcpdump -n -i veth-hout -c 2 tcp port 8080` while the curl runs:

```
IP 192.168.1.112.52144 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
IP 192.168.1.112.52144 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
```

and `ip netns exec hrouter nft list ruleset`:

```
table ip nat {
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
	}
	...
```

**What it means.** The SYN leaves the outside plug with the private source `192.168.1.112` and no answer comes back. The `postrouting` chain has no `masquerade` rule. The public server cannot answer a private address.

**Fix.**

```
ip netns exec hrouter nft add rule ip nat postrouting oifname "veth-hout" masquerade
```

**Test again.** `curl` prints `the server sees you as 198.51.100.2:...`. In `bash test.sh`, the part 2 lines about `home1` and `guest1` pass again.

## Fault 3: the DNS port is blocked on the home router (F4)

**Symptom.** `ip netns exec home1 curl -sS -m 3 http://web.test:8080/cgi-bin/whoami`:

```
curl: (6) Could not resolve host: web.test
```

But `ip netns exec home1 curl -sS -m 3 http://203.0.113.80:8080/cgi-bin/whoami` works. So the network path is fine and only the name is broken. `home1` still has its lease, so DHCP is fine.

**Finder.** `ip netns exec home1 dig @192.168.1.1 web.test`:

```
;; communications error to 192.168.1.1#53: timed out
;; no servers could be reached
```

and `ip netns exec hrouter nft list ruleset` shows a table I did not write:

```
table ip fault4 {
	chain input {
		type filter hook input priority filter; policy accept;
		udp dport 53 drop
		tcp dport 53 drop
	}
}
```

**What it means.** A rule in the router's `input` chain drops everything addressed to port 53. dnsmasq never sees the question, so `dig` waits and times out. DHCP uses ports 67 and 68, so leases still work.

**Fix.**

```
ip netns exec hrouter nft delete table ip fault4
```

**Test again.** `dig @192.168.1.1 web.test` prints `203.0.113.80`. `bash test.sh` ends with `RESULT: all checks passed`.

## Final test

```
PASS part-1-addresses-and-routes: all checks passed
PASS part-2-nat-forwarding-isolation: all checks passed
PASS part-3-dhcp-and-dns: all checks passed
RESULT: all checks passed
```

## What I would check first next time

I would run `bash test.sh` and read the first `FAIL`, then work down the layers in order. Two of my three faults showed up as the same word, "hangs", and only a capture on the outside plug told them apart from a missing route.
