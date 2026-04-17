import { Request, Response, NextFunction } from "express";
import { testimonialService, testimonialSchema } from "../services/testimonial.service";

export const testimonialController = {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await testimonialService.findAll());
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

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await testimonialService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },
};
