import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { upload, uploadMedia, uploadServiceImage } from "../middleware/upload.middleware";
import { leadController }        from "../controllers/lead.controller";
import { blogController }        from "../controllers/blog.controller";
import { projectController }     from "../controllers/project.controller";
import { serviceController }     from "../controllers/service.controller";
import { testimonialController } from "../controllers/testimonial.controller";
import { technologyController }  from "../controllers/technology.controller";
import { activityController }    from "../controllers/activity.controller";
import { uploadController }      from "../controllers/upload.controller";

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
router.get("/projects", projectController.findAll);

router.post("/projects",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video",     maxCount: 1 },
    { name: "image",     maxCount: 1 }, // legacy alias
  ]),
  projectController.create,
);

router.put("/projects/:id",
  uploadMedia.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video",     maxCount: 1 },
    { name: "image",     maxCount: 1 },
  ]),
  projectController.update,
);

router.delete("/projects/:id", projectController.remove);

// Gallery images
router.post("/projects/:projectId/images", upload.array("images", 20), projectController.addImages);
router.delete("/projects/images/:id",      projectController.removeImage);

// ── Services ──────────────────────────────────────────────────────────────────
router.get("/services",        serviceController.findAll);
router.post("/services",       uploadServiceImage.single("image"), serviceController.create);
router.put("/services/:id",    uploadServiceImage.single("image"), serviceController.update);
router.patch("/services/:id",  serviceController.patch);
router.delete("/services/:id", serviceController.remove);

// ── Upload ──────────────────────────────────────────────────────────────────────
router.post("/upload", uploadServiceImage.single("file"), uploadController.upload);

// ── Testimonials ──────────────────────────────────────────────────────────────
router.get("/testimonials",        testimonialController.findAll);
router.post("/testimonials",       testimonialController.create);
router.put("/testimonials/:id",    testimonialController.update);
router.patch("/testimonials/:id",  testimonialController.patch);
router.delete("/testimonials/:id", testimonialController.remove);

// ── Technologies ─────────────────────────────────────────────────────────────
router.get("/technologies",        technologyController.findAll);
router.post("/technologies",       technologyController.create);
router.put("/technologies/:id",    technologyController.update);
router.patch("/technologies/:id",  technologyController.patch);
router.delete("/technologies/:id", technologyController.remove);

export default router;
