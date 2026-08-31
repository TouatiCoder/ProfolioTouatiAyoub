import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/login",    authController.login);
// SECURITY FIX (Stage 2 admin audit): this endpoint had NO auth guard and
// registerSchema/register() have no invite/allowlist check — anyone on the
// internet could POST here and get a fresh admin JWT (User.role defaults to
// "admin" in schema.prisma), full access to every /api/admin/* route. Now
// requires an existing admin session, so it's an "invite a co-admin" action,
// not a public signup form.
router.post("/register", requireAuth, authController.register);
router.post("/logout",   authController.logout);
router.get("/me",        requireAuth, authController.me);
router.patch("/email",   requireAuth, authController.updateEmail);
router.patch("/password",requireAuth, authController.updatePassword);

export default router;
