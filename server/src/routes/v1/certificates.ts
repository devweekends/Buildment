import { Router } from "express";
import * as certificates from "../../controllers/certificates.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { validate, validateParams } from "../../middlewares/validate.js";
import { certificateCodeParams, certificateRevokeBody } from "../../validations/capstone.js";

const router = Router();

// Public verify page data: anyone with the link can check a certificate. The global API limiter applies.
router.get("/verify/:code", validateParams(certificateCodeParams), certificates.verify);
router.post("/:code/revoke", authenticate, validate({ params: certificateCodeParams, body: certificateRevokeBody }), certificates.revoke);

export default router;
