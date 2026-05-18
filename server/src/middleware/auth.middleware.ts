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
 * Middleware — verifies Bearer JWT and httpOnly cookie (Hybrid approach).
 * Returns 401 if the token is missing or invalid.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const cookieToken = req.cookies?.token;
  const header = req.headers.authorization;
  const bearerToken = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  const token = cookieToken || bearerToken;

  if (!token) {
    console.log("[Auth] Failed: No token found in cookies or headers");
    res.status(401).json({ error: "Non autorisé — token manquant" });
    return;
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (cookieToken) {
      console.log(`[Auth] Success: Authenticated via secure cookie (User ID: ${req.user.userId})`);
    } else {
      console.log(`[Auth] Success: Authenticated via legacy Bearer token (User ID: ${req.user.userId})`);
    }
    next();
  } catch {
    console.log("[Auth] Failed: Token is invalid or expired");
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
}

/** Sign a JWT that expires in 7 days */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
}
