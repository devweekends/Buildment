import type { Request, Response } from "express";
import { ok } from "../utils/responses.js";
import { getCapstoneState, sendCapstoneToMentor, startCapstoneCheck } from "../services/capstone/service.js";

// The learner's capstone checks for one block. The rubric pack never appears in a response.

const blockId = (req: Request) => req.params.blockId as string;

// GET /api/v1/blocks/:blockId/capstone
export async function state(req: Request, res: Response) {
  ok(res, { state: await getCapstoneState(blockId(req), req.user) });
}

// POST /api/v1/blocks/:blockId/capstone/check
export async function check(req: Request, res: Response) {
  ok(res, { check: await startCapstoneCheck({ blockId: blockId(req), user: req.user, body: req.body }) });
}

// POST /api/v1/blocks/:blockId/capstone/send
export async function send(req: Request, res: Response) {
  const { checkId } = req.body as { checkId: string };
  ok(res, { check: await sendCapstoneToMentor({ blockId: blockId(req), user: req.user, checkId }) });
}
