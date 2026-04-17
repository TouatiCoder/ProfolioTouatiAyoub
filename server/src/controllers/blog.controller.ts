import { Request, Response, NextFunction } from "express";
import { blogService, blogSchema } from "../services/blog.service";

export const blogController = {
  // ── Admin ──────────────────────────────────────────────────────────────────
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await blogService.findAll());
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = blogSchema.parse(req.body);
      res.status(201).json(await blogService.create(data));
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = blogSchema.parse(req.body);
      res.json(await blogService.update(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await blogService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },

  // ── Public ─────────────────────────────────────────────────────────────────
  async findPublished(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await blogService.findPublished());
    } catch (err) { next(err); }
  },

  async findBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await blogService.findBySlug(req.params.slug));
    } catch (err) { next(err); }
  },
};
