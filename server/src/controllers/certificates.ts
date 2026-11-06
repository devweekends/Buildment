import type { Request, Response } from "express";
import { ok } from "../utils/responses.js";
import { claimCertificate, getMyCertificate, getPublicCertificate, revokeCertificate } from "../services/certificates/service.js";

// GET /api/v1/certificates/verify/:code  (public)
export async function verify(req: Request, res: Response) {
  res.setHeader("Cache-Control", "public, max-age=60");
  ok(res, { certificate: await getPublicCertificate(req.params.code as string) });
}

// GET /api/v1/courses/:courseSlug/certificate
export async function mine(req: Request, res: Response) {
  ok(res, await getMyCertificate(req.params.courseSlug as string, req.user));
}

// POST /api/v1/courses/:courseSlug/certificate
export async function claim(req: Request, res: Response) {
  const { recipientName } = req.body as { recipientName: string };
  ok(res, { certificate: await claimCertificate(req.params.courseSlug as string, req.user, { recipientName }) });
}

// POST /api/v1/certificates/:code/revoke  (course mentors and admins)
export async function revoke(req: Request, res: Response) {
  const { reason } = req.body as { reason: string };
  ok(res, { certificate: await revokeCertificate(req.user!, req.params.code as string, reason) });
}
