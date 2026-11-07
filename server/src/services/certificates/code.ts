import { randomInt } from "node:crypto";
import { CERTIFICATE_CODE_ALPHABET, type CertificateSettings } from "../../shared/lib/certificates.js";

/** A public certificate id like DW-L2-7K3F9QXM: 8 random Crockford characters, about 10^12 values. */
export function newCertificateCode(settings: Pick<CertificateSettings, "prefix" | "code">): string {
  let suffix = "";
  for (let i = 0; i < 8; i++) suffix += CERTIFICATE_CODE_ALPHABET[randomInt(CERTIFICATE_CODE_ALPHABET.length)];
  return `${settings.prefix}-${settings.code}-${suffix}`;
}
