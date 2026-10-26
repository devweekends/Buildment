# Results: challenge 6, part 1 (reference run)

What a correct run shows. Times, ids and counters differ on every run.

## The test

`bash test.sh` ends with:

```
PASS all seven namespaces exist
PASS hrouter has 192.168.1.1/24, 192.168.50.1/24 and 198.51.100.2/30
PASS prouter has 198.51.100.1/30 and 203.0.113.1/24, and the server has 203.0.113.80/24
PASS homeweb has 192.168.1.20/24
PASS home1 (192.168.1.30) and home2 (192.168.1.31) are on 192.168.1.0/24, guest1 (192.168.50.30) is on 192.168.50.0/24
PASS forwarding is on in hrouter and prouter
PASS home1 reaches its router, 192.168.1.1
PASS home2 reaches its router, 192.168.1.1
PASS homeweb reaches its router, 192.168.1.1
PASS guest1 reaches its router, 192.168.50.1
PASS hrouter reaches homeweb, 192.168.1.20
PASS hrouter reaches prouter, 198.51.100.1
PASS prouter reaches the public server, 203.0.113.80
PASS hrouter reaches the public server, 203.0.113.80, through prouter
PASS the public server sees hrouter as 198.51.100.2
PASS hrouter can read the home web server's page at 192.168.1.20:80
PASS home1: the route to 203.0.113.80 goes via 192.168.1.1
PASS hrouter: the route to 203.0.113.80 goes via 198.51.100.1
PASS traceroute from hrouter shows 198.51.100.1, then 203.0.113.80
PASS no NAT yet: home1 gets no reply from 203.0.113.80 (100% loss), as it should
PASS the capture on veth-hout shows the private source 192.168.1.30 leaving the home router
RESULT: all checks passed
```

## The address plan, as built

`ip netns exec hrouter ip -4 -o addr` (without the loopback):

```
br-home         inet 192.168.1.1/24
veth-hguest     inet 192.168.50.1/24
veth-hout       inet 198.51.100.2/30
```

`ip netns exec prouter ip -4 -o addr` (without the loopback):

```
veth-pin        inet 198.51.100.1/30
veth-pout       inet 203.0.113.1/24
```

## The routes

`ip netns exec hrouter ip route`:

```
default via 198.51.100.1 dev veth-hout
192.168.1.0/24 dev br-home proto kernel scope link src 192.168.1.1
192.168.50.0/24 dev veth-hguest proto kernel scope link src 192.168.50.1
198.51.100.0/30 dev veth-hout proto kernel scope link src 198.51.100.2
```

`ip netns exec prouter ip route`:

```
198.51.100.0/30 dev veth-pin proto kernel scope link src 198.51.100.1
203.0.113.0/24 dev veth-pout proto kernel scope link src 203.0.113.1
```

The provider router has no default route and no route to the home networks. It only knows its two connected subnets. That is why nothing can come back to a private address.

`ip netns exec home1 ip route get 203.0.113.80`:

```
203.0.113.80 via 192.168.1.1 dev veth-home1 src 192.168.1.30 uid 0
    cache
```

`ip netns exec hrouter ip route get 203.0.113.80`:

```
203.0.113.80 via 198.51.100.1 dev veth-hout src 198.51.100.2 uid 0
    cache
```

## traceroute from the home router

`ip netns exec hrouter traceroute -n 203.0.113.80`:

```
traceroute to 203.0.113.80 (203.0.113.80), 30 hops max, 60 byte packets
 1  198.51.100.1  0.120 ms  0.020 ms  0.015 ms
 2  203.0.113.80  0.040 ms  0.020 ms  0.018 ms
```

## The public server sees the home router

`ip netns exec hrouter curl -sS http://203.0.113.80:8080/cgi-bin/whoami`:

```
the server sees you as 198.51.100.2:40536
```

## The failing ping, and the private source leaving

`ip netns exec home1 ping -c2 -W1 203.0.113.80`:

```
PING 203.0.113.80 (203.0.113.80) 56(84) bytes of data.

--- 203.0.113.80 ping statistics ---
2 packets transmitted, 0 received, 100% packet loss, time 1010ms
```

`tcpdump -n -i veth-hout -c 1 icmp` in `hrouter` during that ping:

```
listening on veth-hout, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.500000 IP 192.168.1.30 > 203.0.113.80: ICMP echo request, id 12, seq 1, length 64
```

The request left the home router with `192.168.1.30` still on it. No reply came. Nothing on the public side knows a way back to `192.168.1.30`. Part 2 fixes this with NAT.

## Answers

1. **Why does `prouter` need no default route?** It is plugged into both subnets it forwards between (`198.51.100.0/30` and `203.0.113.0/24`). Connected routes are enough.
2. **Why does the server need a default route?** Later, the server will answer `198.51.100.2`. That address is not on its own subnet, so it must send the answer to `prouter`.
3. **Why a `/30` for the link between the routers?** Two routers need two addresses. A `/30` has exactly two usable addresses.

## Three questions about my home network that I cannot answer yet

1. My provider's router sits between my home router and the internet. How many routers are between me and a big website?
2. Does my provider's router have a route to my private addresses?
3. Why does the server need to be told to send answers to the provider router, and my laptop too?
