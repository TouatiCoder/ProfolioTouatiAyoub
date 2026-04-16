import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin, signAdminToken } from '../middleware/auth.js';

type AuthRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
};

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
});

const passwordSchema = z.object({
  password: z.string().min(8).max(128),
});

const emailSchema = z.object({
  email: z.string().trim().email().max(255),
});

const authModel = {
  async findUserByEmail(email: string): Promise<AuthRow | null> {
    const [rows] = await pool.query<AuthRow[]>(
      `SELECT id, name, email, password_hash, role
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email],
    );

    return rows[0] ?? null;
  },

  async updatePassword(userId: number, passwordHash: string): Promise<void> {
    await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, userId]);
  },

  async updateEmail(userId: number, email: string): Promise<void> {
    await pool.query('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
  },

  async touchLastLogin(userId: number): Promise<void> {
    await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [userId]);
  },
};

async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const user = await authModel.findUserByEmail(parsed.data.email);

    if (!user) {
      res.status(401).json({ error: 'Identifiants incorrects' });
      return;
    }

    const passwordMatches = await bcrypt.compare(parsed.data.password, user.password_hash);

    if (!passwordMatches) {
      res.status(401).json({ error: 'Identifiants incorrects' });
      return;
    }

    if (user.role !== 'admin') {
      res.status(403).json({ error: 'Acces non autorise' });
      return;
    }

    await authModel.touchLastLogin(user.id);

    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({
      token: signAdminToken(payload),
      user: payload,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function me(req: Request, res: Response) {
  res.json({ user: req.admin });
}

async function updatePassword(req: Request, res: Response) {
  const parsed = passwordSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Mot de passe invalide' });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await authModel.updatePassword(req.admin!.userId, passwordHash);
    res.json({ message: 'Mot de passe mis a jour' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateEmail(req: Request, res: Response) {
  const parsed = emailSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Email invalide' });
    return;
  }

  try {
    await authModel.updateEmail(req.admin!.userId, parsed.data.email);
    res.json({ message: 'Email mis a jour' });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Cet email est deja utilise' });
      return;
    }

    console.error('Update email error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/me', requireAdmin, me);
authRouter.patch('/password', requireAdmin, updatePassword);
authRouter.patch('/email', requireAdmin, updateEmail);
