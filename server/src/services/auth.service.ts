import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client";
import { signToken } from "../middleware/auth.middleware";
import { AppError } from "../middleware/error.middleware";
import { z } from "zod";

// ─── Validation schemas ───────────────────────────────────────────────────────
export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(6),
});

// ─── Service functions ────────────────────────────────────────────────────────

/** Authenticate a user and return a signed JWT + public user data */
export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError(401, "Email ou mot de passe incorrect");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError(401, "Email ou mot de passe incorrect");

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { token, user: { userId: user.id, email: user.email, role: user.role } };
}

/** Register a new admin user */
export async function register(name: string, email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError(409, "Cet email est déjà utilisé");

  const hashed = await bcrypt.hash(password, 10);
  const user   = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const token = signToken({ userId: user.id, email: user.email, role: user.role });
  return { token, user: { userId: user.id, email: user.email, role: user.role } };
}

/** Update the email of the currently authenticated user */
export async function updateEmail(userId: number, email: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== userId) throw new AppError(409, "Email déjà utilisé");

  await prisma.user.update({ where: { id: userId }, data: { email } });
  return { ok: true };
}

/** Update the password of the currently authenticated user */
export async function updatePassword(userId: number, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
  return { ok: true };
}
