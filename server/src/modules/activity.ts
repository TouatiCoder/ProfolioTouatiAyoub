import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { parseJsonValue } from '../lib/normalizers.js';

type ActivityRow = RowDataPacket & {
  id: number;
  user_id: number | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  details: unknown;
  created_at: string;
};

const activitySchema = z.object({
  action: z.string().trim().min(1).max(100),
  entity: z.string().trim().max(100).optional(),
  entity_id: z.string().trim().max(100).optional(),
  details: z.record(z.unknown()).optional(),
});

const activityModel = {
  async list() {
    const [rows] = await pool.query<ActivityRow[]>(
      'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 100',
    );

    return rows.map((row) => ({
      ...row,
      details: parseJsonValue<Record<string, unknown> | null>(row.details, null),
    }));
  },

  async create(userId: number, input: z.infer<typeof activitySchema>) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO activity_logs (user_id, action, entity, entity_id, details)
       VALUES (?, ?, ?, ?, ?)`,
      [
        userId,
        input.action,
        input.entity ?? null,
        input.entity_id ?? null,
        input.details ? JSON.stringify(input.details) : null,
      ],
    );

    return result.insertId;
  },
};

async function listActivity(_req: Request, res: Response) {
  try {
    res.json(await activityModel.list());
  } catch (error) {
    console.error('List activity error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createActivity(req: Request, res: Response) {
  const parsed = activitySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: 'Donnees invalides' });
    return;
  }

  try {
    const id = await activityModel.create(req.admin!.userId, parsed.data);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const adminActivityRouter = Router();

adminActivityRouter.use(requireAdmin);
adminActivityRouter.get('/', listActivity);
adminActivityRouter.post('/', createActivity);
