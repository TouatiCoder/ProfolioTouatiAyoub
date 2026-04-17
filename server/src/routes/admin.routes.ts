import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { leadController }        from "../controllers/lead.controller";
import { blogController }        from "../controllers/blog.controller";
import { projectController }     from "../controllers/project.controller";
import { serviceController }     from "../controllers/service.controller";
import { testimonialController } from "../controllers/testimonial.controller";
import { activityController }    from "../controllers/activity.controller";

const router = Router();

// All admin routes require authentication
router.use(requireAuth);

// ── Stats & activity ──────────────────────────────────────────────────────────
router.get("/stats",    activityController.stats);
router.get("/activity", activityController.findAll);

// ── Leads ─────────────────────────────────────────────────────────────────────
router.get("/leads",       leadController.findAll);
router.patch("/leads/:id", leadController.updateStatus);
router.delete("/leads/:id",leadController.remove);

// ── Blog ──────────────────────────────────────────────────────────────────────
router.get("/blog",       blogController.findAll);
router.post("/blog",      blogController.create);
router.put("/blog/:id",   blogController.update);
router.delete("/blog/:id",blogController.remove);

// ── Projects ──────────────────────────────────────────────────────────────────
router.get("/projects",          projectController.findAll);
router.post("/projects",         upload.single("image"), projectController.create);
router.put("/projects/:id",      upload.single("image"), projectController.update);
router.delete("/projects/:id",   projectController.remove);

// Gallery images
router.post("/projects/:projectId/images", upload.array("images", 20), projectController.addImages);
router.delete("/projects/images/:id",      projectController.removeImage);

// ── Services ──────────────────────────────────────────────────────────────────
router.get("/services",        serviceController.findAll);
router.post("/services",       serviceController.create);
router.put("/services/:id",    serviceController.update);
router.patch("/services/:id",  serviceController.patch);
router.delete("/services/:id", serviceController.remove);

// ── Testimonials ──────────────────────────────────────────────────────────────
router.get("/testimonials",        testimonialController.findAll);
router.post("/testimonials",       testimonialController.create);
router.put("/testimonials/:id",    testimonialController.update);
router.delete("/testimonials/:id", testimonialController.remove);

export default router;
