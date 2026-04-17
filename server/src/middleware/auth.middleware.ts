import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  userId: number;
  email:  string;
  role:   string;
}

// Extend Express Request to carry the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware — verifies Bearer JWT and attaches decoded payload to req.user.
 * Returns 401 if the token is missing or invalid.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Non autorisé — token manquant" });
    return;
  }

  try {
    const token = header.slice(7);
    req.user    = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
}

/** Sign a JWT that expires in 7 days */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}
