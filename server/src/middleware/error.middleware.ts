import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { env } from "../config/env";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Global error handler — must be the last middleware registered in app.ts.
 * Handles Zod validation errors, AppErrors, and unexpected errors.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  // Zod validation error
  if (err instanceof ZodError) {
    res.status(400).json({
      error:   "Données invalides",
      details: err.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
    });
    return;
  }

  if (err instanceof multer.MulterError) {
    const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    const message = err.code === "LIMIT_FILE_SIZE"
      ? "Fichier trop volumineux. Images: 20 MB max. Videos: 500 MB max."
      : err.message;

    res.status(statusCode).json({ error: message });
    return;
  }

  if (err instanceof Error && /(images|videos|image|video|jpg|png|webp|mp4|webm|mov)/i.test(err.message)) {
    res.status(400).json({ error: err.message });
    return;
  }

  // Known application error
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Prisma unique constraint violation (P2002)
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "P2002"
  ) {
    res.status(409).json({ error: "Cette valeur existe déjà (doublon)" });
    return;
  }

  // Unknown error — hide details in production
  console.error("[ERROR]", err);
  res.status(500).json({
    error: env.isProd ? "Erreur serveur interne" : String(err),
  });
}
