# Results: challenge 6, part 3 (reference run)

What a correct run shows. Times, addresses in the pools, ports and ids differ on every run. `1xx` stands for the last number of an address in a pool.

## The test

`bash test.sh` ends with:

```
PASS all seven namespaces exist
PASS dnsmasq is running (started with bg_start dnsmasq)
PASS home1 has 192.168.1.1xx/24 and home2 has 192.168.1.1xx/24, both in 192.168.1.100 to 192.168.1.150
PASS guest1 has 192.168.50.1xx/24, in 192.168.50.100 to 192.168.50.150
PASS home1's gateway is 192.168.1.1 and guest1's is 192.168.50.1
PASS home1's resolver is 192.168.1.1 and guest1's is 192.168.50.1
PASS home1: dig @192.168.1.1 web.test returns 203.0.113.80
PASS guest1: dig @192.168.50.1 web.test returns 203.0.113.80 (the guest can ask the router for names)
PASS home1: curl http://web.test:8080/ works, and the server sees 198.51.100.2
PASS guest1: curl http://web.test:8080/ works, and the server sees 198.51.100.2
PASS dig @192.168.1.1 nosuch.test returns no answer
PASS a brand-new device gets a lease (192.168.1.1xx/24), so the home pool still has room
PASS with dnsmasq stopped, a new device gets no lease and ends with no address after about 3 seconds
PASS dnsmasq is running again with your dnsmasq.conf
RESULT: all checks passed
```

## The leases

The lease lines printed by the hook script:

```
lease applied: 192.168.1.112/24 router=192.168.1.1 dns=192.168.1.1 lease=3600s
lease applied: 192.168.1.131/24 router=192.168.1.1 dns=192.168.1.1 lease=3600s
lease applied: 192.168.50.140/24 router=192.168.50.1 dns=192.168.50.1 lease=3600s
```

| Device | Subnet | Address | Gateway | DNS server |
|---|---|---|---|---|
| `home1` | home | `192.168.1.112/24` | `192.168.1.1` | `192.168.1.1` |
| `home2` | home | `192.168.1.131/24` | `192.168.1.1` | `192.168.1.1` |
| `guest1` | guest | `192.168.50.140/24` | `192.168.50.1` | `192.168.50.1` |

Each subnet got its own gateway and its own DNS address from the same dnsmasq. That is what the tags do.

## The names

`ip netns exec home1 dig +short @192.168.1.1 web.test`:

```
203.0.113.80
```

`ip netns exec guest1 dig +short @192.168.50.1 web.test`:

```
203.0.113.80
```

`ip netns exec home1 curl -sS http://web.test:8080/cgi-bin/whoami`:

```
the server sees you as 198.51.100.2:39012
```

`ip netns exec guest1 curl -sS http://web.test:8080/cgi-bin/whoami`:

```
the server sees you as 198.51.100.2:46418
```

Both subnets turned `web.test` into `203.0.113.80`, and the public server saw only the router's outside address.

## One lease on camera

`ip netns exec hrouter tcpdump -n -v -i br-home -c 4 'port 67 or port 68'` while `home2` asked again (the message types are shown by `-v`):

```
0.0.0.0.68 > 255.255.255.255.67: BOOTP/DHCP, Request from 02:00:00:00:00:b2, length 300
	  DHCP-Message (53), length 1: Discover
192.168.1.1.67 > 192.168.1.131.68: BOOTP/DHCP, Reply, length 300
	  DHCP-Message (53), length 1: Offer
0.0.0.0.68 > 255.255.255.255.67: BOOTP/DHCP, Request from 02:00:00:00:00:b2, length 300
	  DHCP-Message (53), length 1: Request
192.168.1.1.67 > 192.168.1.131.68: BOOTP/DHCP, Reply, length 300
	  DHCP-Message (53), length 1: ACK
```

The exact layout varies. The shape is four packets: Discover, Offer, Request, Ack.

## The things that must fail

| Check | Result | Why |
|---|---|---|
| `dig @192.168.1.1 nosuch.test` | no answer, `status: REFUSED` | no upstream DNS in the lab |
| a new device with dnsmasq stopped | no address after about 3 seconds | a Linux DHCP client leaves the interface empty |

## Answers

1. **Does the isolation rule match a guest's question to `192.168.50.1`?** No. The rule drops packets that pass *through* the router, from the guest subnet to the home subnet. A question to the router's own address is addressed *to* the router, so it never goes through the `forward` hook.
2. **Why can the guest still get a lease and a name, but not reach the laptop?** DHCP and DNS are services of the router itself. The home web server is another computer on another subnet. Only the second path crosses the `forward` hook.
3. **What if the home pool had only two addresses?** `home1` and `home2` would take both, and a third device would get no offer. It would end with no address, like the stopped dnsmasq case.

## Three questions about my home network that I cannot answer yet

1. Which pool size does my own home router use, and how many devices do I have?
2. If I move a device to the guest network, does it keep its name?
3. Who answers `web.test` if the router is the only DNS server and it is switched off?
