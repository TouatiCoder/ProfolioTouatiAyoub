import { Request, Response, NextFunction, CookieOptions } from "express";
import * as authService from "../services/auth.service";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = authService.loginSchema.parse(req.body);
      const data = await authService.login(body.email, body.password);
      res.cookie("token", data.token, cookieOptions);
      res.json(data);
    } catch (err) { next(err); }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = authService.registerSchema.parse(req.body);
      const data = await authService.register(body.name, body.email, body.password);
      res.cookie("token", data.token, cookieOptions);
      res.status(201).json(data);
    } catch (err) { next(err); }
  },

  logout(req: Request, res: Response) {
    res.clearCookie("token", cookieOptions);
    res.json({ message: "Déconnecté" });
  },

  me(req: Request, res: Response) {
    res.json({ user: req.user });
  },

  async updateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body as { email?: string };
      if (!email) { res.status(400).json({ error: "Email requis" }); return; }
      const data = await authService.updateEmail(req.user!.userId, email);
      res.json(data);
    } catch (err) { next(err); }
  },

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body as { password?: string };
      if (!password || password.length < 6) {
        res.status(400).json({ error: "Mot de passe trop court (min 6)" });
        return;
      }
      const data = await authService.updatePassword(req.user!.userId, password);
      res.json(data);
    } catch (err) { next(err); }
  },
};
