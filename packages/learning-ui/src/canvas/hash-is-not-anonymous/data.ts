import type { SliderResult, SliderSpec, SliderValues } from "../renderers/slider/types";

// Data Engineering course, chapter 11.3 "Personal data: minimise, pseudonymise,
// retain". A plain hash of a phone number can be undone by hashing every
// possible number and comparing; a keyed hash (HMAC) with a secret key cannot,
// while the key stays secret. The guessing rate is the dossier's researcher
// test: SHA-256 of 10 million synthetic phone-style numbers took 11.3 seconds
// in plain Python on one laptop core. See spec.md.

/** Numbers hashed in the researcher test. */
export const TEST_NUMBERS = 10_000_000;

/** Seconds the researcher test took for those numbers. */
export const TEST_SECONDS = 11.3;

export type HashInputs = {
  /** Digits of the phone number the attacker does not know yet (the rest is a known prefix). */
  digits: number;
  /** 1 when the code is a keyed hash with a secret key, 0 for a plain hash. */
  secretKey: number;
};

export type HashAttack = {
  possible: number;
  /** Seconds to hash every possible number at the test rate. */
  seconds: number;
  /** True when the attacker can reverse the codes by guessing. */
  reversible: boolean;
};

/** Every unknown digit multiplies the possible numbers by ten. */
export function possibleNumbers(digits: number): number {
  return 10 ** digits;
}

/** Time to hash every possible number at the rate of the researcher test. */
export function secondsToTryAll(digits: number): number {
  return (possibleNumbers(digits) * TEST_SECONDS) / TEST_NUMBERS;
}

export function attack({ digits, secretKey }: HashInputs): HashAttack {
  return {
    possible: possibleNumbers(digits),
    seconds: secondsToTryAll(digits),
    reversible: secretKey === 0,
  };
}

function inputsFrom(values: SliderValues): HashInputs {
  return { digits: values.digits ?? 7, secretKey: values.secretKey ?? 0 };
}

export function formatCount(count: number): string {
  return Math.round(count).toLocaleString("en-US");
}

/** Under a second with two decimals, under a minute with one, then minutes and seconds. */
export function formatDuration(seconds: number): string {
  if (seconds < 1) return `${seconds.toFixed(2)} s`;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  let minutes = Math.floor(seconds / 60);
  let rest = Math.round(seconds - minutes * 60);
  if (rest === 60) {
    minutes += 1;
    rest = 0;
  }
  return `${minutes} min ${rest} s`;
}

export function computeHash(values: SliderValues): SliderResult {
  const inputs = inputsFrom(values);
  const result = attack(inputs);
  const keyed = !result.reversible;

  return {
    stats: [
      { label: "Possible numbers", value: formatCount(result.possible), detail: `${inputs.digits} unknown digits` },
      keyed
        ? { label: "Time to try them all", value: "Not possible", detail: "a guess needs the key" }
        : { label: "Time to try them all", value: formatDuration(result.seconds), detail: "one laptop core" },
      keyed
        ? { label: "Phone number recovered", value: "No", detail: "while the key stays secret" }
        : { label: "Phone number recovered", value: "Yes", detail: "hash each number, compare" },
    ],
    summary: keyed
      ? `With a secret key, there are still ${formatCount(result.possible)} possible numbers, but nobody without the key can compute a code to compare with, so the codes cannot be reversed by guessing.`
      : `With a plain hash, an attacker hashes all ${formatCount(result.possible)} possible numbers in about ${formatDuration(result.seconds)} on one laptop core and compares each result with the codes, so the phone numbers are recovered.`,
  };
}

export function describeHashChange(before: SliderValues, after: SliderValues): string {
  const a = inputsFrom(before);
  const b = inputsFrom(after);
  const x = attack(a);
  const y = attack(b);
  const digitsChanged = a.digits !== b.digits;
  const keyChanged = a.secretKey !== b.secretKey;
  if (!digitsChanged && !keyChanged) return "Nothing changed.";

  if (keyChanged && !digitsChanged) {
    return b.secretKey === 1
      ? `Adding the secret key changes nothing about the ${formatCount(y.possible)} possible numbers, but the attacker can no longer test a guess: every code depends on a key they do not have.`
      : `Removing the secret key lets the attacker test guesses again: ${formatCount(y.possible)} numbers take about ${formatDuration(y.seconds)} to try.`;
  }

  if (digitsChanged && !keyChanged) {
    const factor = 10 ** Math.abs(b.digits - a.digits);
    const more = b.digits > a.digits;
    const steps = Math.abs(b.digits - a.digits);
    const digitWord = `unknown digit${steps === 1 ? "" : "s"}`;
    const numbers = more
      ? `Adding ${steps} ${digitWord} makes ${formatCount(factor)} times as many possible numbers (${formatCount(x.possible)} to ${formatCount(y.possible)}).`
      : `Removing ${steps} ${digitWord} leaves ${formatCount(factor)} times fewer possible numbers (${formatCount(x.possible)} to ${formatCount(y.possible)}).`;
    return b.secretKey === 1
      ? `${numbers} With the secret key, the count does not help the attacker, because they cannot check any guess.`
      : `${numbers} Trying them all takes ${formatCount(factor)} times ${more ? "as long" : "less time"}: ${formatDuration(x.seconds)} to ${formatDuration(y.seconds)}.`;
  }

  return b.secretKey === 1
    ? `With the secret key and ${b.digits} unknown digits, there are ${formatCount(y.possible)} possible numbers, but a guess cannot be checked without the key.`
    : `With a plain hash and ${b.digits} unknown digits, there are ${formatCount(y.possible)} possible numbers and about ${formatDuration(y.seconds)} is enough to try them all.`;
}

export const hashIsNotAnonymous: SliderSpec = {
  kind: "slider",
  title: "Can a hashed phone number be reversed?",
  purpose: "Change how many digits of a phone number are unknown and whether the code uses a secret key, and see when guessing works.",
  intro:
    "Mizan's phone numbers start with a known prefix, then 7 unknown digits. An attacker holds the codes from a shared file and hashes every possible number to compare. The speed comes from a researcher's test: 10 million hashes in 11.3 seconds on one laptop core. Predict how long 7 unknown digits take, then add the secret key.",
  inputs: [
    { id: "digits", label: "Unknown digits", min: 5, max: 9, step: 1, default: 7, unit: "digits" },
    { id: "secretKey", label: "Secret key in the code", min: 0, max: 1, step: 1, default: 0, unit: "0 no, 1 yes" },
  ],
  compute: computeHash,
  describeChange: describeHashChange,
  tryThis: [
    "Leave the unknown digits at 7 and no key. Trying all 10,000,000 numbers takes 11.3 seconds, so the phone numbers are recovered.",
    "Raise the unknown digits to 9. That is 100 times as many numbers and 100 times the time: 18 min 50 s. A longer number only slows the attacker down.",
    "Set the secret key to 1. The numbers are still there, but a guess can no longer be checked, so the codes cannot be reversed while the key stays secret.",
  ],
  limits:
    "This is a simple illustration. The speed is one researcher's test on one laptop core in plain Python, and a different computer or a special program would be faster. It also assumes the attacker knows the known prefix and the code was made with an unsalted hash. If the secret key leaks, or sits next to the data, the protection is gone.",
};
