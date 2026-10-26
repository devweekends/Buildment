# Results: challenge 6, part 4 (reference run)

What a correct run shows. Part 4 has no network code of its own. The learner's result is `fault-writeup.md`. This file is for whoever verifies the reference solution.

## The verification script

`bash verify-faults.sh` rebuilds the healthy network for each fault, injects only that fault (`bash break.sh --only Fx`), runs the test sets of parts 1, 2 and 3, applies the reference fix (`bash fix.sh Fx`) and runs the test sets again. It ends with:

```
PASS F1: after injection, N test set(s) fail and a FAIL line matches the symptom
PASS F1: after the fix, all three test sets pass
...
PASS F7: after the fix, all three test sets pass
PASS seed alpha draws three different faults: F1 F5 F6
PASS seed beta draws three different faults: F5 F6 F7
PASS seed gamma draws three different faults: F1 F4 F5
PASS seed kahn-2026 draws three different faults: F3 F6 F7
PASS seed 42 draws three different faults: F1 F5 F6
PASS seed mentor-demo draws three different faults: F1 F4 F5
RESULT: all checks passed
```

## Which test shows which fault

Right after injection, these are the lines to expect (the words, not the exact text):

| Fault | Part | A FAIL line that names it |
|---|---|---|
| F1 wrong mask on `homeweb` | 1 | `homeweb should have 192.168.1.20/24`, `homeweb reaches its router ... FAILED. Ping said: ping: connect: Network is unreachable`, `hrouter reaches homeweb ... FAILED`, `hrouter cannot read http://192.168.1.20/` |
| | 2 | `http://198.51.100.2:8080/ did not return the home web server's page (curl exit 28)` |
| F2 forwarding off | 1 | `forwarding must be on in both routers. hrouter: 0` |
| | 2 | `home1 cannot get the page from http://203.0.113.80:8080/cgi-bin/whoami (curl exit 28)` |
| F3 default route missing | 1 | `hrouter reaches the public server ... FAILED. Ping said: ping: connect: Network is unreachable`, and the route and traceroute lines |
| | 2 | `home1 cannot get the page ... (curl exit ...)` |
| F4 DNS port blocked | 3 | `home1: dig @192.168.1.1 web.test should return 203.0.113.80`, and `curl http://web.test:8080/ failed` |
| F5 masquerade missing | 2 | `hrouter has no masquerade rule`, `home1 cannot get the page ... (curl exit 28)` |
| F6 pool too small | 3 | `a brand-new device could not get a lease` |
| F7 isolation rule missing | 2 | `guest1 reached the home web server. The isolation rule is missing or wrong` |

F2 with F5 can be drawn together. The learner finds F2 first, because with forwarding off the packet never leaves. After fixing F2, the symptom of F5 shows.

## The draw

The matrix in the module brief keeps F2 apart from F1, F3, F5 and F7, and F4 apart from F6. With those rules F2 has no partner, so it could never be drawn, and 28 of 150 test seeds failed to draw at all. `break.sh` keeps every other rule and lets F2 and F5 be drawn together. That leaves 8 possible draws, all reachable:

| Draw | Share of 3000 test seeds |
|---|---|
| F3 F6 F7 | 15% |
| F2 F5 F6 | 14% |
| F3 F4 F7 | 14% |
| F2 F4 F5 | 13% |
| F1 F5 F6 | 13% |
| F1 F4 F5 | 13% |
| F4 F5 F7 | 9% |
| F5 F6 F7 | 9% |

Same seed, same draw: the seed goes through `cksum`, then a small linear generator. `bash break.sh --list SEED` prints a draw without changing anything.

## The write-up

`fault-writeup.md` is a filled example for the seed `gamma` (F1, F4 and F5).
