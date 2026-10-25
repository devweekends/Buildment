import type { Request, Response } from "express";
import { ok } from "../utils/responses.js";
import { submitBlockResponse } from "../services/blocks/respond.js";
import { loadBlockState } from "../services/blocks/state.js";

// POST /api/v1/blocks/:blockId/respond
export async function respond(req: Request, res: Response) {
  const result = await submitBlockResponse({
    blockId: req.params.blockId as string,
    user: req.user,
    payload: req.body as Record<string, unknown>,
  });
  ok(res, result);
}

// GET /api/v1/blocks/:blockId/state
export async function state(req: Request, res: Response) {
  // A proctored quiz's questions must never sit in a browser or proxy cache.
  res.setHeader("Cache-Control", "no-store");
  ok(res, await loadBlockState(req.params.blockId as string, req.user));
}
