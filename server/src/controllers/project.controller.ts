import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service";

function toBoolean(val: unknown): boolean {
  return val === true || val === "true" || val === "1";
}

export const projectController = {
  // ── Admin ──────────────────────────────────────────────────────────────────
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await projectService.findAll());
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, results, service_type, client_name, live_url, featured } = req.body;
      if (!title) { res.status(400).json({ error: "title requis" }); return; }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const project  = await projectService.create(
        { title, description, results, service_type, client_name, live_url, featured: toBoolean(featured) },
        imageUrl,
      );
      res.status(201).json(project);
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, results, service_type, client_name, live_url, featured } = req.body;
      const newImageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      res.json(await projectService.update(
        Number(req.params.id),
        { title, description, results, service_type, client_name, live_url, featured: toBoolean(featured) },
        newImageUrl,
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
      const urls = files.map(f => `/uploads/${f.filename}`);
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
