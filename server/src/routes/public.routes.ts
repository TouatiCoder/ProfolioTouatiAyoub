import { Router } from "express";
import { blogController }        from "../controllers/blog.controller";
import { leadController }        from "../controllers/lead.controller";
import { projectController }     from "../controllers/project.controller";
import { serviceController }     from "../controllers/service.controller";
import { testimonialController } from "../controllers/testimonial.controller";

const router = Router();

// ── Blog (public) ──────────────────────────────────────────────────────────────
router.get("/blog",         blogController.findPublished);
router.get("/blog/:slug",   blogController.findBySlug);

// ── Leads / contact form ───────────────────────────────────────────────────────
router.post("/leads", leadController.create);

router.get("/services", serviceController.findPublished);

// ── Testimonials (public) ──────────────────────────────────────────────────────
router.get("/testimonials", testimonialController.findPublished);

// ── Projects (public) ──────────────────────────────────────────────────────────
router.get("/projects", projectController.findPublished);
router.get("/projects/:projectId/images", projectController.getImages);

export default router;
