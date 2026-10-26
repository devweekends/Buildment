# Results: challenge 5, part 1 (reference run)

What a correct run shows. Times, addresses in the pool, ports and ids differ on every run. `1xx` stands for the last number of an address in the pool.

## The test

`bash test.sh` ends with:

```
PASS namespaces laptop, phone, router and server exist
PASS dnsmasq is running in the router
PASS GAP 2: the laptop has 192.168.1.1xx/24, inside the pool 192.168.1.100 to 192.168.1.150
PASS the phone has 192.168.1.1xx/24, a different address from the laptop
PASS GAP 3: the laptop has a default route via 192.168.1.1, from the lease
PASS GAP 3: /etc/netns/laptop/resolv.conf says nameserver 192.168.1.1, from the lease
PASS GAP 4: dig @192.168.1.1 web.test returns 203.0.113.80
PASS curl http://web.test:8080/ works from the laptop, and the server sees 203.0.113.1
PASS the server cannot ask the router for names on 203.0.113.1, as it should
PASS dig @192.168.1.1 nosuch.test returns no answer
PASS dhcp-capture.txt holds four DHCP packets
PASS with dnsmasq stopped, the phone gets no lease and ends with no address after about 3 seconds
PASS dnsmasq is back and the phone has a lease again
RESULT: all checks passed
```

## The leases

One client's output (`udhcpc` with the hook script):

```
udhcpc: started, v1.36.1
udhcpc: broadcasting discover
udhcpc: broadcasting select for 192.168.1.149, server 192.168.1.1
udhcpc: lease of 192.168.1.149 obtained from 192.168.1.1, lease time 3600
lease applied: 192.168.1.149/24 router=192.168.1.1 dns=192.168.1.1 lease=3600s
```

The laptop after its lease:

```
2: veth-laptop    inet 192.168.1.149/24 brd 192.168.1.255 scope global veth-laptop
default via 192.168.1.1 dev veth-laptop
192.168.1.0/24 dev veth-laptop proto kernel scope link src 192.168.1.149
nameserver 192.168.1.1
```

| Part of the lease | Value | Where it ended up |
|---|---|---|
| address and mask | `192.168.1.149/24` | on `veth-laptop` |
| gateway (option router) | `192.168.1.1` | the default route |
| DNS server (option dns-server) | `192.168.1.1` | `/etc/netns/laptop/resolv.conf` |
| lease time | 3600 seconds (1 hour) | printed by the hook; after that the device must ask again |

## The names

`dig +short @192.168.1.1 web.test` (asks that one server):

```
203.0.113.80
```

`dig @192.168.1.1 nosuch.test`, the status line:

```
;; ->>HEADER<<- opcode: QUERY, status: REFUSED, id: 31337
```

`curl -sS http://web.test:8080/cgi-bin/whoami` (asks the servers in the resolver file):

```
the server sees you as 203.0.113.1:41532
```

The name turned into `203.0.113.80`. The page came back through the router. The server saw only the router's outside address.

## The lease on camera

`dhcp-capture.txt` (message types shown by `-v`):

```
12:00:00.400000 IP (tos 0x10, ttl 128, id 1, offset 0, flags [none], proto UDP (17), length 328)
    0.0.0.0.68 > 255.255.255.255.67: BOOTP/DHCP, Request from 02:00:00:00:00:aa, length 300, xid 0x1, Flags [none]
	  DHCP-Message (53), length 1: Discover
12:00:00.400500 IP (tos 0x0, ttl 64, id 2, offset 0, flags [none], proto UDP (17), length 328)
    192.168.1.1.67 > 192.168.1.149.68: BOOTP/DHCP, Reply, length 300, xid 0x1, Flags [none]
	  Your-IP 192.168.1.149
	  DHCP-Message (53), length 1: Offer
12:00:00.401000 IP (tos 0x10, ttl 128, id 3, offset 0, flags [none], proto UDP (17), length 328)
    0.0.0.0.68 > 255.255.255.255.67: BOOTP/DHCP, Request from 02:00:00:00:00:aa, length 300, xid 0x1, Flags [none]
	  DHCP-Message (53), length 1: Request
12:00:00.401500 IP (tos 0x0, ttl 64, id 4, offset 0, flags [none], proto UDP (17), length 328)
    192.168.1.1.67 > 192.168.1.149.68: BOOTP/DHCP, Reply, length 300, xid 0x1, Flags [none]
	  Your-IP 192.168.1.149
	  DHCP-Message (53), length 1: ACK
```

The exact layout varies. The shape is four packets: Discover, Offer, Request, Ack. The client has no address in the first and third, so it sends from `0.0.0.0` to everyone.

## Things that must fail

| Check | Result | Why |
|---|---|---|
| `dig @203.0.113.1 web.test` from the server | no answer | dnsmasq listens on `br-home` only, so the outside plug has nothing on port 53 |
| `dig @192.168.1.1 nosuch.test` | no answer, `status: REFUSED` | no upstream DNS in the lab, so an unknown name is refused |
| the phone with dnsmasq stopped | no lease after about 3 seconds, no address | a Linux DHCP client leaves the interface empty. There is no `169.254.x.x` fallback here |

## Answers

1. **Which asks whom: `dig @192.168.1.1 web.test` or `curl http://web.test:8080/`?** `dig @...` asks the server it names. `curl` asks the servers in the computer's resolver file, which the lease filled in.
2. **What was in the lease?** Address and mask, gateway, DNS server, and lease time.
3. **Why four packets and not two?** The first two find a server and offer an address. The last two make the client's choice official, because more than one server may have offered.

## Three questions about my home network that I cannot answer yet

1. How long is the lease on my own phone, and what happens at the halfway point?
2. If my router's DHCP pool is 50 addresses and I have 51 devices, what does the 51st see?
3. Which DNS server does my home router give out: itself, or my provider's?
