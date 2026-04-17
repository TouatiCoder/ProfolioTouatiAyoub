import { Request, Response, NextFunction } from "express";
import { activityService } from "../services/activity.service";

export const activityController = {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await activityService.findAll());
    } catch (err) { next(err); }
  },

  async stats(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await activityService.stats());
    } catch (err) { next(err); }
  },
};
