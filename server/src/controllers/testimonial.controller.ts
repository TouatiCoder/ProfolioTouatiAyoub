import { Request, Response, NextFunction } from "express";
import { testimonialService, testimonialSchema, patchTestimonialSchema } from "../services/testimonial.service";

export const testimonialController = {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await testimonialService.findAll());
    } catch (err) { next(err); }
  },

  async findPublished(req: Request, res: Response, next: NextFunction) {
    try {
      const featuredParam = req.query.featured;
      const featured = featuredParam === undefined ? undefined : featuredParam === "true" || featuredParam === "1";
      const limitParam = req.query.limit ? Number(req.query.limit) : undefined;
      const limit = limitParam && Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

      res.json(await testimonialService.findPublished({ featured, limit }));
    } catch (err) { next(err); }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = testimonialSchema.parse(req.body);
      res.status(201).json(await testimonialService.create(data));
    } catch (err) { next(err); }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = testimonialSchema.parse(req.body);
      res.json(await testimonialService.update(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const data = patchTestimonialSchema.parse(req.body);
      res.json(await testimonialService.patch(Number(req.params.id), data));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await testimonialService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
