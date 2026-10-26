# Results: challenge 2, part 1 (reference run)

What a correct run shows. Times, ids and MAC addresses differ on every run. The MAC addresses below are examples.

## The test

`bash test.sh` ends with:

```
PASS namespaces laptop, router and server exist
PASS all four plugs have their addresses
PASS mid-point: laptop reaches its own router, 192.168.1.1
PASS mid-point: server reaches its own router, 203.0.113.1
PASS GAP 1: the laptop has a default route via 192.168.1.1
PASS GAP 2: forwarding is on in the router
PASS GAP 3: the server has a route to 192.168.1.0/24 via 203.0.113.1
PASS laptop pings the server, 203.0.113.80, with 0% loss
PASS server pings the laptop, 192.168.1.23, with 0% loss
PASS traceroute shows two hops: 192.168.1.1, then 203.0.113.80
PASS 198.51.100.7: the router, 192.168.1.1, answers Destination Net Unreachable, as it should
PASS inside link: the echo goes from the laptop's MAC to the router's inside MAC, ttl 64
PASS outside link: the same echo goes from the router's outside MAC to the server's MAC, ttl 63
PASS the IP addresses are the same on both sides: 192.168.1.23 > 203.0.113.80
RESULT: all checks passed
```

## The mid-point: each side reaches its own router

`ip netns exec laptop ping -c2 -W1 192.168.1.1`

```
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.060 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.040 ms

--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
```

The reply has `ttl=64`: the router is one cable away, so no router lowered it.

## The ping across the router

`ip netns exec laptop ping -c2 -W1 203.0.113.80`

```
PING 203.0.113.80 (203.0.113.80) 56(84) bytes of data.
64 bytes from 203.0.113.80: icmp_seq=1 ttl=63 time=0.110 ms
64 bytes from 203.0.113.80: icmp_seq=2 ttl=63 time=0.070 ms

--- 203.0.113.80 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
```

The reply has `ttl=63`: the server started it at 64 and one router lowered it.

## The routes

`ip netns exec laptop ip route`

```
default via 192.168.1.1 dev veth-laptop
192.168.1.0/24 dev veth-laptop proto kernel scope link src 192.168.1.23
```

`ip netns exec router ip route`

```
192.168.1.0/24 dev veth-rin proto kernel scope link src 192.168.1.1
203.0.113.0/24 dev veth-rout proto kernel scope link src 203.0.113.1
```

`ip netns exec server ip route`

```
192.168.1.0/24 via 203.0.113.1 dev veth-server
203.0.113.0/24 dev veth-server proto kernel scope link src 203.0.113.80
```

The router has no default route. It only knows its two connected networks.

## traceroute

`ip netns exec laptop traceroute -n 203.0.113.80`

```
traceroute to 203.0.113.80 (203.0.113.80), 30 hops max, 60 byte packets
 1  192.168.1.1  0.120 ms  0.020 ms  0.015 ms
 2  203.0.113.80  0.040 ms  0.020 ms  0.018 ms
```

Hop 1 is the router. Hop 2 is the server.

## An address the router has no route for

`ip netns exec laptop ping -c1 -W1 198.51.100.7`

```
PING 198.51.100.7 (198.51.100.7) 56(84) bytes of data.
From 192.168.1.1 icmp_seq=1 Destination Net Unreachable

--- 198.51.100.7 ping statistics ---
1 packets transmitted, 0 received, +1 errors, 100% packet loss, time 0ms
```

The router answered. It had the packet, but no route to send it on. This is different from silent loss.

## The capture

Inside cable (`veth-rin`):

```
12:00:01.000100 02:00:00:00:00:a1 > 02:00:00:00:00:b1, ethertype IPv4 (0x0800), length 98: (tos 0x0, ttl 64, id 31210, offset 0, flags [DF], proto ICMP (1), length 84)
    192.168.1.23 > 203.0.113.80: ICMP echo request, id 5, seq 1, length 64
12:00:01.000140 02:00:00:00:00:b1 > 02:00:00:00:00:a1, ethertype IPv4 (0x0800), length 98: (tos 0x0, ttl 63, id 15012, offset 0, flags [none], proto ICMP (1), length 84)
    203.0.113.80 > 192.168.1.23: ICMP echo reply, id 5, seq 1, length 64
```

Outside cable (`veth-rout`):

```
12:00:01.000120 02:00:00:00:00:b2 > 02:00:00:00:00:c1, ethertype IPv4 (0x0800), length 98: (tos 0x0, ttl 63, id 31210, offset 0, flags [DF], proto ICMP (1), length 84)
    192.168.1.23 > 203.0.113.80: ICMP echo request, id 5, seq 1, length 64
12:00:01.000130 02:00:00:00:00:c1 > 02:00:00:00:00:b2, ethertype IPv4 (0x0800), length 98: (tos 0x0, ttl 64, id 15012, offset 0, flags [none], proto ICMP (1), length 84)
    203.0.113.80 > 192.168.1.23: ICMP echo reply, id 5, seq 1, length 64
```

| Plug | Example MAC |
|---|---|
| laptop `veth-laptop` | `02:00:00:00:00:a1` |
| router `veth-rin` | `02:00:00:00:00:b1` |
| router `veth-rout` | `02:00:00:00:00:b2` |
| server `veth-server` | `02:00:00:00:00:c1` |

What changed at the router: the MAC pair (laptop to router inside, then router outside to server) and the TTL (64 to 63). What did not change: the IP addresses, `192.168.1.23 > 203.0.113.80`, and the ping id and sequence number.

## What the three gaps do

| Gap | If it is missing |
|---|---|
| 1 default route on the laptop | The laptop says `Network is unreachable` at once and sends nothing |
| 2 forwarding in the router | The echo arrives on `veth-rin` and never leaves `veth-rout`. Silent loss |
| 3 route on the server | The echo reaches the server, but the answer has no way back. Silent loss |

## Three questions about my home network that I cannot answer yet

1. My own router must have a default route. Where does it point, and who owns that address?
2. If my laptop and my phone both send a ping to the internet, how does the reply find the right one?
3. The server's route back to `192.168.1.0/24` was needed here. Why does a real website never need a route back to my private network? (Challenge 4 answers this.)
