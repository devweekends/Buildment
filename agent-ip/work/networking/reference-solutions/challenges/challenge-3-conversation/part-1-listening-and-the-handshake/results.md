# Results: challenge 3, part 1 (reference run)

What a correct run shows. Times, port numbers, process ids and sequence numbers differ on every run. `PORT` below stands for the high port Linux chose for the laptop's end.

## The test

`bash test.sh` ends with:

```
PASS namespaces laptop and server exist
PASS GAP 1: the server listens on 0.0.0.0:8080
PASS curl from the laptop to 192.168.1.80:8080 works
PASS GAP 2: listen-loopback.txt shows the server on 127.0.0.1:8080 only
PASS GAP 2: listen-all.txt shows the server on 0.0.0.0:8080
PASS GAP 3: the laptop says 192.168.1.23:PORT to 192.168.1.80:8080, the server says the same numbers the other way round
PASS GAP 4: handshake.txt shows SYN, SYN-ACK, ACK in that order
PASS GAP 4: the SYN goes laptop to server:8080, the SYN-ACK comes back
PASS the test server listens on 127.0.0.1:8080
PASS with the server on 127.0.0.1, curl from the laptop is refused at once (exit 7)
PASS server is back on 0.0.0.0 and the laptop reaches it again
RESULT: all checks passed
```

## Step 3: the server on 127.0.0.1

`listen-loopback.txt`:

```
State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      9          127.0.0.1:8080      0.0.0.0:*     users:(("busybox",pid=2101,fd=3))
```

The curl from the laptop:

```
curl: (7) Failed to connect to 192.168.1.80 port 8080 after 0 ms: Couldn't connect to server
curl from the laptop exited with 7. Exit code 7 means: connection refused.
```

It failed at once. The server's computer got the SYN, found nothing listening on `192.168.1.80:8080`, and said no. The server itself is running, but it only promised to answer on `127.0.0.1`.

## Step 4: the server on 0.0.0.0

`listen-all.txt`:

```
State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      9            0.0.0.0:8080      0.0.0.0:*     users:(("busybox",pid=2140,fd=3))
```

The curl from the laptop:

```
hello from the server
```

## Step 5: the handshake

`handshake.txt`:

```
tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on veth-server, link-type EN10MB (Ethernet), snapshot length 262144 bytes
12:00:00.101000 IP 192.168.1.23.PORT > 192.168.1.80.8080: Flags [S], seq 2851002322, win 64240, options [mss 1460,sackOK,TS val 1 ecr 0,nop,wscale 7], length 0
12:00:00.101020 IP 192.168.1.80.8080 > 192.168.1.23.PORT: Flags [S.], seq 1403559, ack 2851002323, win 65160, options [mss 1460,sackOK,TS val 1 ecr 1,nop,wscale 7], length 0
12:00:00.101030 IP 192.168.1.23.PORT > 192.168.1.80.8080: Flags [.], ack 1, win 502, options [nop,nop,TS val 1 ecr 1], length 0
3 packets captured
3 packets received by filter
0 packets dropped by kernel
```

| Line | What it is |
|---|---|
| `Flags [S]` | SYN. The laptop asks to talk. Its sequence number is `2851002322` |
| `Flags [S.]` | SYN-ACK. The server agrees. It says `ack 2851002323`, which is the laptop's number plus one |
| `Flags [.]` | ACK. The laptop confirms. The conversation is open |

## Step 6: one open conversation, from both sides

`connected-laptop.txt`:

```
State Recv-Q Send-Q Local Address:Port    Peer Address:Port Process
ESTAB 0      0      192.168.1.23:PORT   192.168.1.80:8080
```

`connected-server.txt`:

```
State Recv-Q Send-Q  Local Address:Port    Peer Address:Port Process
ESTAB 0      0      192.168.1.80:8080   192.168.1.23:PORT
```

The two files show the same conversation. Each side lists itself as Local and the other as Peer, so the numbers swap.

## Answers

1. **What changed between `listen-loopback.txt` and `listen-all.txt`?** Only the Local Address: `127.0.0.1:8080` became `0.0.0.0:8080`. The same program, the same port. The promise changed from "only this computer" to "anyone who can reach me".
2. **Why was the first curl refused and not stuck?** A computer with an address answers at once when nothing listens on a port. The answer is an RST packet. No answer would have meant a timeout, exit code 28.
3. **Who sends the first packet of a conversation?** The client. The server only answers.
4. **Why do the two `ss -tn` files show the same numbers in a different order?** Each side calls itself Local and the other Peer.

## Three questions about my home network that I cannot answer yet

1. My phone connects to my laptop's app on port 3000, and it fails. Is the app listening on `127.0.0.1` or on `0.0.0.0`?
2. A website sees many connections from my one address. How does my router keep them apart? (Challenge 4.)
3. What would the same handshake look like if the first packet were lost on the way?
