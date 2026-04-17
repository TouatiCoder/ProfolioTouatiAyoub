import { Request, Response, NextFunction } from "express";
import { leadService, createLeadSchema } from "../services/lead.service";

export const leadController = {
  // ── Admin ──────────────────────────────────────────────────────────────────
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, search } = req.query as { status?: string; search?: string };
      res.json(await leadService.findAll(status, search));
    } catch (err) { next(err); }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = req.body as { status?: string };
      if (!status) { res.status(400).json({ error: "status requis" }); return; }
      res.json(await leadService.updateStatus(Number(req.params.id), status));
    } catch (err) { next(err); }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await leadService.remove(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },

  // ── Public ─────────────────────────────────────────────────────────────────
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createLeadSchema.parse(req.body);
      const lead = await leadService.create(data);
      res.status(201).json({ id: lead.id, ok: true });
    } catch (err) { next(err); }
  },
};
