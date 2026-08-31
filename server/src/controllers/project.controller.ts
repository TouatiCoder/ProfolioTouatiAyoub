import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { projectService } from "../services/project.service";
import { uploadUrlFor } from "../middleware/upload.middleware";

function toBoolean(val: unknown): boolean {
  return val === true || val === "true" || val === "1";
}

// SECURITY FIX (Stage 2 admin audit): every other admin resource (services,
// testimonials, blog) validates req.body with Zod before touching the
// database; this controller used to destructure req.body directly with only
// a truthiness check on `title` — no length caps, no URL shape check.
// Caps are deliberately generous — this only needs to stop unbounded abuse
// (the old code had no limit at all), not constrain realistic existing data.
const projectBodySchema = z.object({
  title:        z.string().min(1).max(300),
  description:  z.string().max(5000).optional().nullable().or(z.literal("")),
  results:      z.string().max(1000).optional().nullable().or(z.literal("")),
  service_type: z.string().max(160).optional().nullable().or(z.literal("")),
  client_name:  z.string().max(200).optional().nullable().or(z.literal("")),
  live_url:     z.string().url().max(500).optional().nullable().or(z.literal("")),
});

function getUploadedFile(req: Request, fieldName: string): Express.Multer.File | undefined {
  if (req.file) return req.file;
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  return files?.[fieldName]?.[0];
}

export const projectController = {
  // ── Admin ──────────────────────────────────────────────────────────────────
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await projectService.findAll());
    } catch (err) { next(err); }
  },

  async findPublished(req: Request, res: Response, next: NextFunction) {
    try {
      const featuredParam = req.query.featured;
      const featured = featuredParam === undefined ? undefined : featuredParam === "true" || featuredParam === "1";
      const limitParam = req.query.limit ? Number(req.query.limit) : undefined;
      const limit = limitParam && Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;
      const service = typeof req.query.service === "string" ? req.query.service : undefined;

      res.json(await projectService.findPublished({ featured, limit, service }));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, results, service_type, client_name, live_url } = projectBodySchema.parse(req.body);
      const { featured } = req.body;

      const thumbFile = getUploadedFile(req, "thumbnail") ?? getUploadedFile(req, "image");
      const videoFile = getUploadedFile(req, "video");

      const imageUrl = thumbFile ? uploadUrlFor(thumbFile) : null;
      const videoUrl = videoFile ? uploadUrlFor(videoFile) : null;

      const project = await projectService.create(
        { title, description, results, service_type, client_name, live_url, featured: toBoolean(featured) },
        imageUrl,
        videoUrl,
      );
      res.status(201).json(project);
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, results, service_type, client_name, live_url } = projectBodySchema.parse(req.body);
      const { featured } = req.body;

      const thumbFile = getUploadedFile(req, "thumbnail") ?? getUploadedFile(req, "image");
      const videoFile = getUploadedFile(req, "video");

      const newImageUrl = thumbFile ? uploadUrlFor(thumbFile) : undefined;
      const newVideoUrl = videoFile ? uploadUrlFor(videoFile) : undefined;

      res.json(await projectService.update(
        Number(req.params.id),
        { title, description, results, service_type, client_name, live_url, featured: toBoolean(featured) },
        newImageUrl,
        newVideoUrl,
      ));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },

  // ── Gallery images ──────────────────────────────────────────────────────────
  async getImages(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await projectService.getImages(Number(req.params.projectId)));
    } catch (err) { next(err); }
  },

  async addImages(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files?.length) { res.status(400).json({ error: "Aucune image" }); return; }
      const urls = files.map(uploadUrlFor);
      res.status(201).json(await projectService.addImages(Number(req.params.projectId), urls));
    } catch (err) { next(err); }
  },

  async removeImage(req: Request, res: Response, next: NextFunction) {
    try {
      await projectService.removeImage(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
