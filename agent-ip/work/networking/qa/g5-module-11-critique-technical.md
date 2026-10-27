# Module 11 critique, lens: technical (G5)

Checked every command, output line, path, script name, gap number and test message against `in/12-sessions.txt` and `in/13-challenge-template.txt`; every [S#] claim against `in/05-facts.md`; all arithmetic (84 to 96 to 156, -s 100 to 188, -s 200 to 300, 1500 - 80 = 1420); every quiz and predict key. The replay canvas data (`net-m11-replay-challenge-8/data.ts`) was read to confirm the step numbers the phone sections cite (1-2, 3-7, 8-13, predicts at 5 and 8): they match.

Counts: S1 0, S2 1, S3 12. All fixed.

| # | Sev | Chapter | Problem | Fix applied |
|---|---|---|---|---|
| 1 | S2 | 11.5 quiz | "10.99.0.1 answers, 10.20.0.5 gets none" also fits a Gap 2 AllowedIPs mistake (missing 10.20.0.0/24) and Gap 3, so the Gap 2 distractor was defensible | Stem now says the ping prints no error line, only 0 received; key explanation says what Gap 3 and a missing AllowedIPs entry would print instead |
| 2 | S3 | 11.5 quiz | Option "the two key pairs on each side": each side has one pair | "the key pair on each side" |
| 3 | S3 | 11.5 callout | Keepalive "every few seconds" contradicts the 25 s suggestion in the same callout | "at a fixed interval, shorter than the NAT timeout" |
| 4 | S3 | 11.1 prose and quiz | Stated as certain that the laptop always picks the home network on an overlap; 3.6 says the outcome depends on the configured routes | "In the usual set-up", plus one sentence that the result depends on the routes the VPN adds; same hedge in the key explanation |
| 5 | S3 | 11.1 | Docker pools "cover parts of 172.17 to 172.31" not what [S46] says | "cover 172.17 to 172.31 and 192.168.0.0/16" |
| 6 | S3 | 11.3 | "nested blocks ... common in a company": unsourced claim | "they can happen in a company" |
| 7 | S3 | 11.3 | "Most VPN apps work like wg-quick": unsourced count | "A VPN app does the same job as wg-quick: it sets the routes for you" |
| 8 | S3 | 11.6 | "A real VPN app changes the name server for you": unsourced generalisation | "A VPN app can change the name server" |
| 9 | S3 | 11.6 troubleshooting | "latest handshake old or missing means Gap 1": the handshake from the part 2 build is seconds old, so it can look fine with Gap 1 empty | Added the sure check: `ip netns exec laptop ip route get 203.0.113.2` must say `via 192.168.50.1`; `dev wg0` means Gap 1 |
| 10 | S3 | 11.7 beat 1 | "The café does not know which website you visited" contradicts the learner's own dns-cafe.txt in the full tunnel with café DNS | Qualified: once the name questions also go through the tunnel, as after Gap 4 |
| 11 | S3 | 11.7 beat 3 | "Your own address is hidden from the website": the website never saw the laptop's own address, even without a tunnel | "In the full tunnel, the café's address, where you really sit, is hidden" |
| 12 | S3 | 11.7 | "A VPN app normally sets its own name server": unsourced | "can set" |
| 13 | S3 | 11.7 | RFC 7359 called "a standard": it is an Informational RFC | "An RFC from 2014, one of the internet's public documents" |

Not fixed (out of scope):
- Part 4 README in the challenge template uses the same weak handshake check (its step 1 under "If it does not work"). Suggest adding the `ip route get 203.0.113.2` check there too.
- No code exercise tests in this module, so no test changes.

Checks after the edits: audit-course "Needs work: 0"; check_fences "problems: 0"; no em dashes.
