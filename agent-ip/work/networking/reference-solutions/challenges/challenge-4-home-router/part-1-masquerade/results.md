# Results: challenge 4, part 1 (reference run)

What a correct run shows. Times, ports and counters differ on every run. `37613` stands for the port the router chose on a clash. Yours will differ.

## The test

`bash test.sh` ends with:

```
PASS namespaces laptop, phone, router and server exist
PASS mid-point: laptop and phone reach the router, 192.168.1.1
PASS mid-point: the router reaches the server, 203.0.113.80
PASS GAP 1: forwarding is on in the router
PASS GAP 1: laptop and phone both have a default route via 192.168.1.1
PASS GAP 2: the router has a masquerade rule
PASS laptop reaches the server, and the server sees 203.0.113.1
PASS phone reaches the server, and the server sees 203.0.113.1
PASS from the server, 192.168.1.23 is not reachable (curl exit 7, at once)
PASS both devices sent from the same source port, and the server saw two different ports (...)
PASS conntrack -L shows the phone's flow with the new port the server saw (...)
PASS GAP 3: your two files show two different ports (41000 and 37613)
PASS GAP 4: conntrack.txt lists two flows that both left from sport=41000
RESULT: all checks passed
```

## Before masquerade

`ip netns exec laptop ping -c1 -W1 203.0.113.80` (forwarding is on, masquerade is not):

```
PING 203.0.113.80 (203.0.113.80) 56(84) bytes of data.

--- 203.0.113.80 ping statistics ---
1 packets transmitted, 0 received, 100% packet loss, time 0ms
```

Silent loss. The packet left the router with the source `192.168.1.23` still on it. The server has no way to answer a private address.

## After masquerade: what the server sees

`ip netns exec laptop curl -sS http://203.0.113.80:8080/cgi-bin/whoami`

```
the server sees you as 203.0.113.1:42317
```

`ip netns exec phone curl -sS http://203.0.113.80:8080/cgi-bin/whoami`

```
the server sees you as 203.0.113.1:49566
```

Both show `203.0.113.1`, the router's outside address. Neither shows `192.168.1.x`. The two devices cannot be told apart by the server.

## The same source port

`same-port-laptop.txt` (the laptop sent from 41000):

```
the server sees you as 203.0.113.1:41000
```

`same-port-phone.txt` (the phone sent from 41000 too):

```
the server sees you as 203.0.113.1:37613
```

`conntrack.txt`:

```
tcp      6 117 TIME_WAIT src=192.168.1.23 dst=203.0.113.80 sport=41000 dport=8080 src=203.0.113.80 dst=203.0.113.1 sport=8080 dport=41000 [ASSURED] mark=0 use=1
tcp      6 118 TIME_WAIT src=192.168.1.24 dst=203.0.113.80 sport=41000 dport=8080 src=203.0.113.80 dst=203.0.113.1 sport=8080 dport=37613 [ASSURED] mark=0 use=1
```

| Device | Sent from | Server saw | Why |
|---|---|---|---|
| laptop | `41000` | `41000` | Nothing else used `203.0.113.1:41000` yet, so the port was kept |
| phone | `41000` | `37613` | The laptop's conversation was still open. The same port would have looked identical to the server, so the router changed it |

The address is always rewritten. The port changes only on a clash.

## The capture

`inside.txt` (on `br-home`):

```
listening on br-home, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.200000 IP 192.168.1.23.42317 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
12:00:00.200050 IP 203.0.113.80.8080 > 192.168.1.23.42317: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.200060 IP 192.168.1.23.42317 > 203.0.113.80.8080: Flags [.], ack 1, win 502, length 0
```

`outside.txt` (on `veth-rout`):

```
listening on veth-rout, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.200020 IP 203.0.113.1.42317 > 203.0.113.80.8080: Flags [S], seq 1, win 64240, length 0
12:00:00.200040 IP 203.0.113.80.8080 > 203.0.113.1.42317: Flags [S.], seq 2, ack 2, win 65160, length 0
12:00:00.200055 IP 203.0.113.1.42317 > 203.0.113.80.8080: Flags [.], ack 1, win 502, length 0
```

The source address changed from `192.168.1.23` to `203.0.113.1`. The port, `42317`, stayed the same. The server's reply goes to `203.0.113.1`, and the router turns it back into `192.168.1.23` using its table.

## A private address, from the outside

`ip netns exec server curl -sS -m 3 http://192.168.1.23/`

```
curl: (7) Failed to connect to 192.168.1.23 port 80 after 0 ms: Couldn't connect to server
```

It fails at once. The server has no route to `192.168.1.0/24`. It does not even try.

## Answers

1. **Why does the server need no route back to `192.168.1.0/24` now?** It never sees `192.168.1.x`. It answers to `203.0.113.1`, which is on its own network.
2. **When did the port change?** Only for the phone, because the laptop already used `203.0.113.1:41000` to reach the same server and port.
3. **Which line of `conntrack.txt` shows the new port?** The phone's line. It is the last `dport=` on the line.

## Three questions about my home network that I cannot answer yet

1. If a friend types my router's outside address, what happens to their packet? (Part 2.)
2. How long does the router remember a conversation that goes quiet?
3. My provider's router might also do NAT. How would I find out?
