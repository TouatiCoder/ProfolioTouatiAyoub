import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/login",    authController.login);
router.post("/register", authController.register);
router.get("/me",        requireAuth, authController.me);
router.patch("/email",   requireAuth, authController.updateEmail);
router.patch("/password",requireAuth, authController.updatePassword);

export default router;
