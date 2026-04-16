import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { normalizeNullableString } from '../lib/normalizers.js';

type LeadStatus = 'new' | 'contacted' | 'closed';

type LeadRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
};

const leadStatusEnum = z.enum(['new', 'contacted', 'closed']);

const createLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().nullable(),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().max(2000).optional().nullable(),
  source: z.string().trim().max(120).optional().nullable(),
  status: leadStatusEnum.optional(),
});

const updateLeadSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  email: z.string().trim().email().max(255).optional(),
  phone: z.string().trim().max(30).optional().nullable(),
  service: z.string().trim().min(1).max(120).optional(),
  message: z.string().trim().max(2000).optional().nullable(),
  source: z.string().trim().max(120).optional().nullable(),
  status: leadStatusEnum.optional(),
});

const leadFiltersSchema = z.object({
  status: z.enum(['all', 'new', 'contacted', 'closed']).optional(),
  search: z.string().trim().max(120).optional(),
  source: z.string().trim().max(120).optional(),
});

const leadModel = {
  async create(input: z.infer<typeof createLeadSchema>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO leads (name, email, phone, service, message, source, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        input.name,
        input.email,
        normalizeNullableString(input.phone ?? null),
        input.service,
        normalizeNullableString(input.message ?? null),
        normalizeNullableString(input.source ?? null) ?? 'contact-page',
        input.status ?? 'new',
      ],
    );

    return result.insertId;
  },

  async list(filters: z.infer<typeof leadFiltersSchema>): Promise<LeadRow[]> {
    let sql = 'SELECT * FROM leads WHERE 1 = 1';
    const params: unknown[] = [];

    if (filters.status && filters.status !== 'all') {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      sql += ' AND (name LIKE ? OR email LIKE ? OR service LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.source) {
      sql += ' AND source = ?';
      params.push(filters.source);
    }

    sql += ' ORDER BY created_at DESC';

    const [rows] = await pool.query<LeadRow[]>(sql, params);
    return rows;
  },

  async findById(id: number): Promise<LeadRow | null> {
    const [rows] = await pool.query<LeadRow[]>(
      'SELECT * FROM leads WHERE id = ? LIMIT 1',
      [id],
    );

    return rows[0] ?? null;
  },

  async update(id: number, input: z.infer<typeof updateLeadSchema>): Promise<void> {
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

    if (input.phone !== undefined) {
      fields.push('phone = ?');
      params.push(normalizeNullableString(input.phone));
    }

    if (input.service !== undefined) {
      fields.push('service = ?');
      params.push(input.service);
    }

    if (input.message !== undefined) {
      fields.push('message = ?');
      params.push(normalizeNullableString(input.message));
    }

    if (input.source !== undefined) {
      fields.push('source = ?');
      params.push(normalizeNullableString(input.source));
    }

    if (input.status !== undefined) {
      fields.push('status = ?');
      params.push(input.status);
    }

    if (!fields.length) {
      return;
    }

    params.push(id);

    await pool.query(
      `UPDATE leads
       SET ${fields.join(', ')}
       WHERE id = ?`,
      params,
    );
  },

  async remove(id: number): Promise<void> {
    await pool.query('DELETE FROM leads WHERE id = ?', [id]);
  },
};

async function createLead(req: Request, res: Response) {
  const parsed = createLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = await leadModel.create(parsed.data);
    const lead = await leadModel.findById(id);
    res.status(201).json(lead);
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function listLeads(req: Request, res: Response) {
  const parsed = leadFiltersSchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: 'Filtres invalides' });
    return;
  }

  try {
    res.json(await leadModel.list(parsed.data));
  } catch (error) {
    console.error('List leads error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getLead(req: Request, res: Response) {
  try {
    const lead = await leadModel.findById(Number(req.params.id));

    if (!lead) {
      res.status(404).json({ error: 'Lead introuvable' });
      return;
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateLead(req: Request, res: Response) {
  const parsed = updateLeadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    await leadModel.update(Number(req.params.id), parsed.data);
    const lead = await leadModel.findById(Number(req.params.id));

    if (!lead) {
      res.status(404).json({ error: 'Lead introuvable' });
      return;
    }

    res.json(lead);
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteLead(req: Request, res: Response) {
  try {
    await leadModel.remove(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const publicLeadsRouter = Router();
export const adminLeadsRouter = Router();

publicLeadsRouter.post('/', createLead);

adminLeadsRouter.use(requireAdmin);
adminLeadsRouter.get('/', listLeads);
adminLeadsRouter.get('/:id', getLead);
adminLeadsRouter.post('/', createLead);
adminLeadsRouter.put('/:id', updateLead);
adminLeadsRouter.patch('/:id', updateLead);
adminLeadsRouter.delete('/:id', deleteLead);
