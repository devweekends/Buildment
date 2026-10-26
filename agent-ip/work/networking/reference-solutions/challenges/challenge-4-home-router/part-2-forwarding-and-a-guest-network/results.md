# Results: challenge 4, part 2 (reference run)

What a correct run shows. Times and ports differ on every run. `PORT` stands for a high port Linux chose.

## The test

`bash test.sh` ends with:

```
PASS namespaces laptop, phone, router, server and guest exist
PASS part 1 still works: the laptop reaches the server, which sees 203.0.113.1
PASS mid-point: the router can read the laptop's web page at 192.168.1.23:80
PASS mid-point: the guest reaches the router, 192.168.50.1
PASS GAP 1: from the server, http://203.0.113.1:8080/ returns the laptop's page
PASS an unforwarded port, 203.0.113.1:22, is refused at once (exit 7, Connection refused)
PASS from the server, 192.168.1.23 is not reachable (curl exit 7, at once)
PASS the guest reaches the server, which sees 203.0.113.1
PASS GAP 2: the guest cannot reach the laptop (curl timed out, exit 28)
PASS the phone still reaches the laptop's page (the rule only blocks the guest)
PASS GAP 3: outside-tests.txt has forwarded 0, unforwarded 7 and direct 7
RESULT: all checks passed
```

## The router's rules

`ruleset.txt` (`ip netns exec router nft list ruleset`):

```
table ip nat {
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
		oifname "veth-rout" masquerade
	}

	chain prerouting {
		type nat hook prerouting priority dstnat; policy accept;
		iifname "veth-rout" tcp dport 8080 dnat to 192.168.1.23:80
	}
}
table ip filter {
	chain forward {
		type filter hook forward priority filter; policy accept;
		ip saddr 192.168.50.0/24 ip daddr 192.168.1.0/24 drop
	}
}
```

nft prints `priority 100` as `srcnat`, `priority -100` as `dstnat` and `priority 0` as `filter`. They are the same numbers with names.

## The three outside tests

`outside-tests.txt`:

```
forwarded: exit 0
unforwarded: exit 7
direct: exit 7
```

| Test | Result | Meaning |
|---|---|---|
| forwarded | exit 0 | `203.0.113.1:8080` reaches the laptop's web page |
| unforwarded | exit 7 | `203.0.113.1:22` is refused at once. Nothing listens there. It is not a timeout |
| direct | exit 7 | `192.168.1.23` is not reachable from the server. It has no route to a private address |

`ip netns exec server curl -sS http://203.0.113.1:8080/`:

```
home web server
```

## The forwarded request, on both sides

`outside.txt` (on `veth-rout`):

```
listening on veth-rout, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.300000 IP 203.0.113.80.PORT > 203.0.113.1.8080: Flags [S], seq 1, win 64240, length 0
12:00:00.300060 IP 203.0.113.1.8080 > 203.0.113.80.PORT: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.300070 IP 203.0.113.80.PORT > 203.0.113.1.8080: Flags [.], ack 1, win 502, length 0
```

`inside.txt` (on `br-home`):

```
listening on br-home, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.300020 IP 203.0.113.80.PORT > 192.168.1.23.80: Flags [S], seq 1, win 64240, length 0
12:00:00.300040 IP 192.168.1.23.80 > 203.0.113.80.PORT: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.300055 IP 203.0.113.80.PORT > 192.168.1.23.80: Flags [.], ack 1, win 502, length 0
```

The destination changed from `203.0.113.1:8080` to `192.168.1.23:80`. The source, `203.0.113.80.PORT`, did not change. The laptop answers to the real server address. The router turns the answer back using its table.

## The guest

`ip netns exec guest curl -sS -m 3 http://203.0.113.80:8080/cgi-bin/whoami`:

```
the server sees you as 203.0.113.1:PORT
```

`ip netns exec guest curl -sS -m 3 http://192.168.1.23/`:

```
curl: (28) Connection timed out after 3001 milliseconds
```

The guest reaches the internet and appears as `203.0.113.1`, just like the home devices. It cannot reach the laptop. The drop rule is silent, so the guest waits and times out. Compare that with the refused port: a refusal answers at once, a drop never answers.

## Answers

1. **Why is `203.0.113.1:22` refused and not a timeout?** The router's own computer got the SYN. Nothing listens on port 22, so it answered at once with a "no" (RST). A drop rule would give a timeout instead.
2. **Why does the forwarded port work but `192.168.1.23` directly does not?** The forward rule rewrites the destination of one port. Without it, the server has no route to a private address.
3. **Which hook does the guest rule use, and why not `prerouting`?** The `forward` hook. It sees packets that pass through the router. The packet from the guest to the home network passes through, so this is the right place.

## Three questions about my home network that I cannot answer yet

1. If my provider also does NAT, can a friend still reach my forwarded port?
2. Does my own home router have a guest network, and is it a filter or only a different name?
3. What would happen if two devices both wanted port 80 forwarded?
