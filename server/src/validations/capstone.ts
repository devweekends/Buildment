import { z } from "zod";

export const capstoneCheckBody = z.object({
  repoUrl: z.string({ error: "Paste your GitHub repo link." }).trim().min(1, "Paste your GitHub repo link.").max(300),
  liveUrl: z.string().trim().max(500).optional(),
});

export const capstoneSendBody = z.object({ checkId: z.string().min(1).max(40) });

export const certificateCodeParams = z.object({ code: z.string().min(6).max(32) });

export const certificateClaimBody = z.object({
  recipientName: z.string({ error: "Write your name as it should appear." }).trim().min(2, "Write your full name.").max(80, "Keep the name under 80 characters."),
});

export const certificateRevokeBody = z.object({ reason: z.string().trim().min(3, "Give a short reason.").max(500) });
