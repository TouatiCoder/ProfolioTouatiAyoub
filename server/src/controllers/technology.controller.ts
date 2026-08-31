import { Request, Response, NextFunction } from "express";
import { technologyService, technologySchema, patchTechnologySchema } from "../services/technology.service";

export const technologyController = {
  // ── Admin ──────────────────────────────────────────────────────────────────
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await technologyService.findAll());
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = technologySchema.parse(req.body);
      res.status(201).json(await technologyService.create(data));
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = technologySchema.parse(req.body);
      res.json(await technologyService.update(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = patchTechnologySchema.parse(req.body);
      res.json(await technologyService.patch(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await technologyService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },

  // ── Public ─────────────────────────────────────────────────────────────────
  async findPublished(req: Request, res: Response, next: NextFunction) {
    try {
      const featuredParam = req.query.featured;
      const featured = featuredParam === undefined ? undefined : featuredParam === "true" || featuredParam === "1";
      const category = typeof req.query.category === "string" ? req.query.category : undefined;

      res.json(await technologyService.findPublished({ featured, category }));
    } catch (err) { next(err); }
  },
};
