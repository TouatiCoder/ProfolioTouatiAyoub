import { Request, Response, NextFunction } from "express";
import { serviceService, serviceSchema, patchServiceSchema } from "../services/service.service";

export const serviceController = {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await serviceService.findAll());
    } catch (err) { next(err); }
  },

  async findPublished(req: Request, res: Response, next: NextFunction) {
    try {
      const featuredParam = req.query.featured;
      const featured = featuredParam === undefined ? undefined : featuredParam === "true" || featuredParam === "1";
      const limitParam = req.query.limit ? Number(req.query.limit) : undefined;
      const limit = limitParam && Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

      res.json(await serviceService.findPublished({ featured, limit }));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = serviceSchema.parse(req.body);
      res.status(201).json(await serviceService.create(data));
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = serviceSchema.parse(req.body);
      res.json(await serviceService.update(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = patchServiceSchema.parse(req.body);
      res.json(await serviceService.patch(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await serviceService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
