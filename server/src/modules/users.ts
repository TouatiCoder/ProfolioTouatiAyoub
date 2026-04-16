import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

const createUserSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
  role: z.enum(['admin', 'editor', 'viewer']).default('admin'),
});

const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(255).optional(),
  password: z.string().min(8).max(128).optional(),
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
});

const userModel = {
  async list(): Promise<UserRow[]> {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT id, name, email, role, last_login_at, created_at, updated_at
       FROM users
       ORDER BY created_at DESC`,
    );

    return rows;
  },

  async findById(id: number): Promise<UserRow | null> {
    const [rows] = await pool.query<UserRow[]>(
      `SELECT id, name, email, role, last_login_at, created_at, updated_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [id],
    );

    return rows[0] ?? null;
  },

  async create(input: z.infer<typeof createUserSchema>): Promise<number> {
    const passwordHash = await bcrypt.hash(input.password, 10);
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, ?)`,
      [input.name, input.email, passwordHash, input.role],
    );

    return result.insertId;
  },

  async update(id: number, input: z.infer<typeof updateUserSchema>): Promise<void> {
    const fields: string[] = [];
    const params: unknown[] = [];

    if (input.name !== undefined) {
      fields.push('name = ?');
      params.push(input.name);
    }

    if (input.email !== undefined) {
      fields.push('email = ?');
      params.push(input.email);
    }

    if (input.role !== undefined) {
      fields.push('role = ?');
      params.push(input.role);
    }

    if (input.password !== undefined) {
      fields.push('password_hash = ?');
      params.push(await bcrypt.hash(input.password, 10));
    }

    if (!fields.length) {
      return;
    }

    params.push(id);

    await pool.query(
      `UPDATE users
       SET ${fields.join(', ')}
       WHERE id = ?`,
      params,
    );
  },

  async remove(id: number): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

async function listUsers(_req: Request, res: Response) {
  try {
    res.json(await userModel.list());
  } catch (error) {
    console.error('List users error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const user = await userModel.findById(Number(req.params.id));

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createUser(req: Request, res: Response) {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = await userModel.create(parsed.data);
    const user = await userModel.findById(id);
    res.status(201).json(user);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Cet email existe deja' });
      return;
    }

    console.error('Create user error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateUser(req: Request, res: Response) {
  const parsed = updateUserSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    await userModel.update(Number(req.params.id), parsed.data);
    const user = await userModel.findById(Number(req.params.id));

    if (!user) {
      res.status(404).json({ error: 'Utilisateur introuvable' });
      return;
    }

    res.json(user);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Cet email existe deja' });
      return;
    }

    console.error('Update user error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteUser(req: Request, res: Response) {
  const targetId = Number(req.params.id);

  if (req.admin?.userId === targetId) {
    res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte' });
    return;
  }

  try {
    await userModel.remove(targetId);
    res.status(204).send();
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const adminUsersRouter = Router();

adminUsersRouter.use(requireAdmin);
adminUsersRouter.get('/', listUsers);
adminUsersRouter.get('/:id', getUser);
adminUsersRouter.post('/', createUser);
adminUsersRouter.put('/:id', updateUser);
adminUsersRouter.patch('/:id', updateUser);
adminUsersRouter.delete('/:id', deleteUser);
