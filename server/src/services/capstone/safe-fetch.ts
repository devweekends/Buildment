import https from "node:https";
import dns from "node:dns";
import net from "node:net";
import type { LookupFunction } from "node:net";

// Fetching a learner's live URL is the one place the platform requests an address a
// learner chose, so the rules are strict (docs/16-capstone-checker-and-certificates.mdx):
// HTTPS only, GET only, no cookies, 5 s, 512 KB, at most 3 redirects, and every
// resolved address must be public. The check runs inside the socket's own DNS lookup,
// so the address we vet is the address we connect to (no rebinding window).

export type PublicPage = {
  ok: boolean;
  status: number | null;
  finalUrl: string;
  /** Decoded body text, cut at maxBytes. Empty when the request failed. */
  body: string;
  error?: string;
};

const BLOCKED_V4: Array<[string, number]> = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

function v4ToInt(ip: string): number {
  return ip.split(".").reduce((acc, part) => (acc << 8) + Number(part), 0) >>> 0;
}

function inV4Range(ip: string, [base, bits]: [string, number]): boolean {
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (v4ToInt(ip) & mask) === (v4ToInt(base) & mask);
}

/** True for a routable public unicast address. */
export function isPublicAddress(ip: string): boolean {
  if (net.isIPv4(ip)) return !BLOCKED_V4.some((range) => inV4Range(ip, range));
  if (!net.isIPv6(ip)) return false;
  const lower = ip.toLowerCase();
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(lower);
  if (mapped) return isPublicAddress(mapped[1]!);
  if (lower === "::" || lower === "::1") return false;
  const first = parseInt(lower.split(":")[0] || "0", 16);
  if ((first & 0xfe00) === 0xfc00) return false; // fc00::/7 unique local
  if ((first & 0xffc0) === 0xfe80) return false; // fe80::/10 link local
  if ((first & 0xff00) === 0xff00) return false; // ff00::/8 multicast
  if (lower.startsWith("2001:db8")) return false; // documentation
  if (lower.startsWith("64:ff9b:")) return false; // NAT64 can reach private v4
  return true;
}

/** Rejects hosts that are IP literals or obviously internal names before any lookup. */
export function assertFetchableUrl(raw: string): URL {
  const url = new URL(raw);
  if (url.protocol !== "https:") throw new Error("Only https:// links can be checked.");
  if (url.username || url.password) throw new Error("Links with a username or password cannot be checked.");
  if (url.port && url.port !== "443") throw new Error("Only the standard https port can be checked.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host)) throw new Error("Use the site's domain name, not an IP address.");
  if (!host.includes(".") || /\.(local|internal|localhost|lan|home|corp)$/i.test(host)) {
    throw new Error("That address is not on the public internet.");
  }
  return url;
}

export const publicOnlyLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { all: true, verbatim: true }, (error, addresses) => {
    if (error) return callback(error, "", 0);
    const list = addresses as dns.LookupAddress[];
    if (!list.length || list.some((entry) => !isPublicAddress(entry.address))) {
      return callback(Object.assign(new Error("That address is not on the public internet."), { code: "EBLOCKED" }), "", 0);
    }
    if ((options as { all?: boolean }).all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list);
    return callback(null, list[0]!.address, list[0]!.family);
  });
};

type Options = { timeoutMs?: number; maxBytes?: number; maxRedirects?: number; lookup?: LookupFunction };

function requestOnce(url: URL, options: Required<Options>): Promise<{ status: number; location: string | null; body: string }> {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "GET",
        lookup: options.lookup,
        timeout: options.timeoutMs,
        headers: { "User-Agent": "EdoraxCapstoneChecker/1.0", Accept: "text/html,application/xhtml+xml,*/*;q=0.5" },
      },
      (response) => {
        const status = response.statusCode ?? 0;
        if (status >= 300 && status < 400) {
          response.resume();
          resolve({ status, location: response.headers.location ?? null, body: "" });
          return;
        }
        const chunks: Buffer[] = [];
        let size = 0;
        response.on("data", (chunk: Buffer) => {
          if (size >= options.maxBytes) return;
          chunks.push(chunk.subarray(0, options.maxBytes - size));
          size += chunk.length;
          if (size >= options.maxBytes) response.destroy();
        });
        const done = () => resolve({ status, location: null, body: Buffer.concat(chunks).toString("utf8") });
        response.on("end", done);
        response.on("close", done);
        response.on("error", (error) => (size >= options.maxBytes ? done() : reject(error)));
      }
    );
    const timer = setTimeout(() => request.destroy(new Error("The site took longer than 5 seconds to answer.")), options.timeoutMs);
    request.on("timeout", () => request.destroy(new Error("The site took longer than 5 seconds to answer.")));
    request.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    request.on("close", () => clearTimeout(timer));
    request.end();
  });
}

export async function fetchPublicPage(raw: string, options: Options = {}): Promise<PublicPage> {
  const settings: Required<Options> = {
    timeoutMs: options.timeoutMs ?? 5_000,
    maxBytes: options.maxBytes ?? 512 * 1024,
    maxRedirects: options.maxRedirects ?? 3,
    lookup: options.lookup ?? publicOnlyLookup,
  };
  let current: URL;
  try {
    current = assertFetchableUrl(raw);
  } catch (error) {
    return { ok: false, status: null, finalUrl: raw, body: "", error: (error as Error).message };
  }
  for (let hop = 0; hop <= settings.maxRedirects; hop++) {
    try {
      const result = await requestOnce(current, settings);
      if (result.location) {
        if (hop === settings.maxRedirects) return { ok: false, status: result.status, finalUrl: current.toString(), body: "", error: "Too many redirects." };
        current = assertFetchableUrl(new URL(result.location, current).toString());
        continue;
      }
      return { ok: result.status >= 200 && result.status < 300, status: result.status, finalUrl: current.toString(), body: result.body };
    } catch (error) {
      return { ok: false, status: null, finalUrl: current.toString(), body: "", error: (error as Error).message };
    }
  }
  return { ok: false, status: null, finalUrl: current.toString(), body: "", error: "Too many redirects." };
}
