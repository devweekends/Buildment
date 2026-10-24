---
artifact: canvas-spec
course: data-engineering
chapter: 11.03-personal-data
slug: hash-is-not-anonymous
version: 1
owner: chapter-writer-f
renderer: slider (HTML controls, stat cards)
---

# Canvas spec: Can a hashed phone number be reversed?

## Teaching claim
A plain hash of a phone number can be reversed by hashing every possible number and comparing, because phone numbers come from a small set. A keyed hash (HMAC) with a secret key cannot be reversed this way while the key stays secret. A hash of a phone number is pseudonymised data at best.

## Why a canvas
Learners tend to believe that "one-way" means "safe". Watching 10 million guesses take 11.3 seconds, then watching the time grow with each extra digit but stay finite, and then watching the key remove the attack altogether, makes the point in numbers they can check.

## Model
- Inputs: unknown digits (5 to 9, step 1, default 7) and secret key (0 or 1, default 0).
- Rate: the dossier's researcher test (finding 33): 10,000,000 hashes in 11.3 seconds, plain Python, one laptop core.
- Rule: possible numbers = 10^digits; time to try all = possible x 11.3 / 10,000,000 seconds; reversible = (secret key is 0).
- Worked values: 5 digits 100,000 numbers in 0.11 s; 6 digits 1,000,000 in 1.1 s; 7 digits 10,000,000 in 11.3 s; 8 digits 100,000,000 in 1 min 53 s (the dossier's "about two minutes"); 9 digits 1,000,000,000 in 18 min 50 s. With the key set to 1 the time and the recovery are replaced by "Not possible" and "No".
- Assumptions: the attacker knows the prefix and the hash method; one core; the rate of the test.
- Limitations: a different computer or program changes the speed; a leaked or stored-next-to-the-data key removes the protection; the model says nothing about how hard it is to guess a long random key.

## Rendering
Shared slider renderer: two sliders, three stat cards, no bars (the claim is a yes or no with a time).

## Copy
- What this shows: how many guesses an attacker needs for a phone number with some unknown digits, and how long that takes, with and without a secret key.
- Try this: (1) 7 digits and no key: 11.3 seconds, recovered (matches the chapter's predict). (2) 9 digits: 18 min 50 s. (3) key on: not possible.
- What changed: `describeHashChange` explains the new number of possible phone numbers, the new time, or why the key removes the attack.
- Limits: as in `limits` in `data.ts`.

## Edge cases
5 digits (0.11 s) and 9 digits (18 min 50 s) are the corners; the key set to 1 hides the time on purpose and never shows a number for it.

## Accessibility
Native range inputs with visible values and units; the summary sentence is read to screen readers.

## Acceptance criteria
- [x] The claim is testable: the 11.3 quiz applies it to a nine-digit identifier and a stored key.
- [x] The model is tested in `frontend/tests/unit/canvas/hash-is-not-anonymous.test.ts`.
- [x] Predict before (11.3), transfer after (11.3 quiz, 11.6 quiz).

## Build plan
`packages/learning-ui/src/canvas/hash-is-not-anonymous/data.ts`, to be registered by the orchestrator in `registry.ts` and `slugs.ts`.
