import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { normalizeNullableString, toBoolean } from '../lib/normalizers.js';

type ServiceRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  name_ar: string | null;
  short_description: string;
  short_description_ar: string | null;
  price_from: string | null;
  badge: string | null;
  icon: string | null;
  cta_label: string | null;
  featured: boolean | number;
  published: boolean | number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const serviceSchema = z.object({
  slug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(160),
  name_ar: z.string().trim().max(160).optional().nullable(),
  short_description: z.string().trim().min(1).max(320),
  short_description_ar: z.string().trim().max(320).optional().nullable(),
  price_from: z.string().trim().max(80).optional().nullable(),
  badge: z.string().trim().max(80).optional().nullable(),
  icon: z.string().trim().max(80).optional().nullable(),
  cta_label: z.string().trim().max(80).optional().nullable(),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).max(999).default(0),
});

const publicQuerySchema = z.object({
  featured: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

function normalizeService(row: ServiceRow) {
  return {
    ...row,
    featured: toBoolean(row.featured),
    published: toBoolean(row.published),
  };
}

const serviceModel = {
  async listPublic(filters: z.infer<typeof publicQuerySchema>) {
    let sql = `SELECT * FROM services WHERE published = TRUE`;
    const params: unknown[] = [];

    if (filters.featured === true) {
      sql += ' AND featured = TRUE';
    }

    sql += ' ORDER BY featured DESC, sort_order ASC, created_at DESC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    const [rows] = await pool.query<ServiceRow[]>(sql, params);
    return rows.map(normalizeService);
  },

  async listAll() {
    const [rows] = await pool.query<ServiceRow[]>(
      'SELECT * FROM services ORDER BY sort_order ASC, created_at DESC',
    );

    return rows.map(normalizeService);
  },

  async findById(id: number) {
    const [rows] = await pool.query<ServiceRow[]>(
      'SELECT * FROM services WHERE id = ? LIMIT 1',
      [id],
    );

    return rows[0] ? normalizeService(rows[0]) : null;
  },

  async findBySlug(slug: string) {
    const [rows] = await pool.query<ServiceRow[]>(
      'SELECT * FROM services WHERE slug = ? AND published = TRUE LIMIT 1',
      [slug],
    );

    return rows[0] ? normalizeService(rows[0]) : null;
  },

  async create(input: z.infer<typeof serviceSchema>) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO services (
        slug, name, name_ar, short_description, short_description_ar,
        price_from, badge, icon, cta_label, featured, published, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.slug,
        input.name,
        normalizeNullableString(input.name_ar ?? null),
        input.short_description,
        normalizeNullableString(input.short_description_ar ?? null),
        normalizeNullableString(input.price_from ?? null),
        normalizeNullableString(input.badge ?? null),
        normalizeNullableString(input.icon ?? null),
        normalizeNullableString(input.cta_label ?? null),
        input.featured,
        input.published,
        input.sort_order,
      ],
    );

    return result.insertId;
  },

  async update(id: number, input: z.infer<typeof serviceSchema>) {
    await pool.query(
      `UPDATE services
       SET slug = ?, name = ?, name_ar = ?, short_description = ?, short_description_ar = ?,
           price_from = ?, badge = ?, icon = ?, cta_label = ?, featured = ?, published = ?,
           sort_order = ?
       WHERE id = ?`,
      [
        input.slug,
        input.name,
        normalizeNullableString(input.name_ar ?? null),
        input.short_description,
        normalizeNullableString(input.short_description_ar ?? null),
        normalizeNullableString(input.price_from ?? null),
        normalizeNullableString(input.badge ?? null),
        normalizeNullableString(input.icon ?? null),
        normalizeNullableString(input.cta_label ?? null),
        input.featured,
        input.published,
        input.sort_order,
        id,
      ],
    );
  },

  async remove(id: number) {
    await pool.query('DELETE FROM services WHERE id = ?', [id]);
  },
};

async function listPublicServices(req: Request, res: Response) {
  const parsed = publicQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: 'Parametres invalides' });
    return;
  }

  try {
    res.json(await serviceModel.listPublic(parsed.data));
  } catch (error) {
    console.error('List public services error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getServiceBySlug(req: Request, res: Response) {
  try {
    const service = await serviceModel.findBySlug(String(req.params.slug));

    if (!service) {
      res.status(404).json({ error: 'Service introuvable' });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error('Get service by slug error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function listServices(_req: Request, res: Response) {
  try {
    res.json(await serviceModel.listAll());
  } catch (error) {
    console.error('List services error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getService(req: Request, res: Response) {
  try {
    const service = await serviceModel.findById(Number(req.params.id));

    if (!service) {
      res.status(404).json({ error: 'Service introuvable' });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createService(req: Request, res: Response) {
  const parsed = serviceSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = await serviceModel.create(parsed.data);
    res.status(201).json(await serviceModel.findById(id));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Ce slug existe deja' });
      return;
    }

    console.error('Create service error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateService(req: Request, res: Response) {
  const parsed = serviceSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    await serviceModel.update(Number(req.params.id), parsed.data);
    const service = await serviceModel.findById(Number(req.params.id));

    if (!service) {
      res.status(404).json({ error: 'Service introuvable' });
      return;
    }

    res.json(service);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Ce slug existe deja' });
      return;
    }

    console.error('Update service error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteService(req: Request, res: Response) {
  try {
    await serviceModel.remove(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const publicServicesRouter = Router();
export const adminServicesRouter = Router();

publicServicesRouter.get('/', listPublicServices);
publicServicesRouter.get('/:slug', getServiceBySlug);

adminServicesRouter.use(requireAdmin);
adminServicesRouter.get('/', listServices);
adminServicesRouter.get('/:id', getService);
adminServicesRouter.post('/', createService);
adminServicesRouter.put('/:id', updateService);
adminServicesRouter.patch('/:id', updateService);
adminServicesRouter.delete('/:id', deleteService);
