# Results: challenge 6, part 2 (reference run)

What a correct run shows. Times, ports and counters differ on every run. `PORT` stands for a high port Linux chose.

## The test

`bash test.sh` ends with:

```
PASS all seven namespaces exist
PASS hrouter has a masquerade rule
PASS hrouter has a rule that forwards a port to 192.168.1.20
PASS home1 reaches the public server, which sees 198.51.100.2
PASS guest1 reaches the public server, which sees 198.51.100.2
PASS conntrack -L in hrouter lists a connection to 203.0.113.80:8080
PASS the server reaches the home web server through 198.51.100.2:8080
PASS guest1 cannot reach the home web server (curl timed out, exit 28)
PASS the server cannot reach 192.168.1.20 directly (curl exit 7, at once)
PASS an unforwarded port, 198.51.100.2:22, is refused at once (exit 7, Connection refused)
RESULT: all checks passed
```

## The router's rules

`ip netns exec hrouter nft list ruleset`:

```
table ip nat {
	chain postrouting {
		type nat hook postrouting priority srcnat; policy accept;
		oifname "veth-hout" masquerade
	}

	chain prerouting {
		type nat hook prerouting priority dstnat; policy accept;
		iifname "veth-hout" tcp dport 8080 dnat to 192.168.1.20:80
	}
}
table ip filter {
	chain forward {
		type filter hook forward priority filter; policy accept;
		ip saddr 192.168.50.0/24 ip daddr 192.168.1.0/24 drop
	}
}
```

## What the public server sees

`ip netns exec home1 curl -sS http://203.0.113.80:8080/cgi-bin/whoami`:

```
the server sees you as 198.51.100.2:45110
```

`ip netns exec guest1 curl -sS http://203.0.113.80:8080/cgi-bin/whoami`:

```
the server sees you as 198.51.100.2:51876
```

Both show `198.51.100.2`. The server cannot tell a home device from a guest. The ports differ because Linux chose different source ports for the two devices. The router did not need to change them.

## The forwarded port, across the provider router

`ip netns exec server curl -sS http://198.51.100.2:8080/`:

```
home web server
```

The request went from `server`, through `prouter`, to `hrouter`. The router rewrote the destination to `192.168.1.20:80`. The home web server answered. The router turned the answer back using its table.

## The NAT table

`ip netns exec hrouter conntrack -L | grep 'dport=8080'`:

```
tcp      6 118 TIME_WAIT src=192.168.1.30 dst=203.0.113.80 sport=45110 dport=8080 src=203.0.113.80 dst=198.51.100.2 sport=8080 dport=45110 [ASSURED] mark=0 use=1
tcp      6 117 TIME_WAIT src=192.168.50.30 dst=203.0.113.80 sport=51876 dport=8080 src=203.0.113.80 dst=198.51.100.2 sport=8080 dport=51876 [ASSURED] mark=0 use=1
```

Each line is one conversation. The first half is what the device sent. The second half is the answer as it reaches the router: addressed to `198.51.100.2`. The port stayed the same in both cases, because nothing clashed.

## The capture, one `home1` curl

On the home side (`tcpdump -n -i br-home -c 3 tcp port 8080`):

```
12:00:00.600000 IP 192.168.1.30.45110 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
12:00:00.600040 IP 203.0.113.80.8080 > 192.168.1.30.45110: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.600050 IP 192.168.1.30.45110 > 203.0.113.80.8080: Flags [.], ack 1, win 502, length 0
```

On the outside (`tcpdump -n -i veth-hout -c 3 tcp port 8080`):

```
12:00:00.600010 IP 198.51.100.2.45110 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
12:00:00.600030 IP 203.0.113.80.8080 > 198.51.100.2.45110: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.600055 IP 198.51.100.2.45110 > 203.0.113.80.8080: Flags [.], ack 1, win 502, length 0
```

The source address changed from `192.168.1.30` to `198.51.100.2`. The port, `45110`, did not.

## The things that must fail

| Check | Result | Why |
|---|---|---|
| `guest1` to `http://192.168.1.20/` | `curl: (28)`, times out | The drop rule is silent. The guest hears nothing |
| `server` to `http://192.168.1.20/` | `curl: (7)` at once | The server has no route to a private address. `prouter` answers "Destination Net Unreachable" |
| `server` to `http://198.51.100.2:22/` | `curl: (7)`, `Connection refused` | The router's own computer got the SYN and nothing listens on 22. It says no at once |

## Answers

1. **Why does the server see only one address?** The masquerade rule rewrites the source of every packet that leaves by the outside plug to `198.51.100.2`.
2. **When does the port change?** Only when two conversations would look identical after the rewrite. Here it did not change.
3. **Why does the forwarded port work, but not the other ports of the home web server?** Only one rule exists: port 8080 on the outside address goes to port 80 on `homeweb`. For any other port the router has no mapping, and the server has no route to the private address.
4. **Why is the guest rule a filter, not NAT?** NAT rewrites addresses. It does not decide who may talk to whom. The `drop` rule in the `forward` chain does.

## Three questions about my home network that I cannot answer yet

1. If the guest subnet were a `/30`, how many guests fit?
2. What would the guest see if I used `reject` instead of `drop`?
3. If my provider also does NAT, can anyone reach my forwarded port?
