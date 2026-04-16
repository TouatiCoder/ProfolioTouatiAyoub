import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { normalizeNullableString, toBoolean } from '../lib/normalizers.js';

type TestimonialRow = RowDataPacket & {
  id: number;
  client_name: string;
  company: string | null;
  company_ar: string | null;
  quote: string;
  quote_ar: string | null;
  rating: number;
  service_slug: string | null;
  city: string | null;
  featured: boolean | number;
  published: boolean | number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const testimonialSchema = z.object({
  client_name: z.string().trim().min(1).max(160),
  company: z.string().trim().max(160).optional().nullable(),
  company_ar: z.string().trim().max(160).optional().nullable(),
  quote: z.string().trim().min(1).max(600),
  quote_ar: z.string().trim().max(600).optional().nullable(),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  service_slug: z.string().trim().max(120).optional().nullable(),
  city: z.string().trim().max(120).optional().nullable(),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  sort_order: z.coerce.number().int().min(0).max(999).default(0),
});

const publicQuerySchema = z.object({
  featured: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(20).optional(),
});

function normalizeTestimonial(row: TestimonialRow) {
  return {
    ...row,
    featured: toBoolean(row.featured),
    published: toBoolean(row.published),
  };
}

const testimonialModel = {
  async listPublic(filters: z.infer<typeof publicQuerySchema>) {
    let sql = 'SELECT * FROM testimonials WHERE published = TRUE';
    const params: unknown[] = [];

    if (filters.featured === true) {
      sql += ' AND featured = TRUE';
    }

    sql += ' ORDER BY featured DESC, sort_order ASC, created_at DESC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    const [rows] = await pool.query<TestimonialRow[]>(sql, params);
    return rows.map(normalizeTestimonial);
  },

  async listAll() {
    const [rows] = await pool.query<TestimonialRow[]>(
      'SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC',
    );

    return rows.map(normalizeTestimonial);
  },

  async findById(id: number) {
    const [rows] = await pool.query<TestimonialRow[]>(
      'SELECT * FROM testimonials WHERE id = ? LIMIT 1',
      [id],
    );

    return rows[0] ? normalizeTestimonial(rows[0]) : null;
  },

  async create(input: z.infer<typeof testimonialSchema>) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO testimonials (
        client_name, company, company_ar, quote, quote_ar, rating,
        service_slug, city, featured, published, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.client_name,
        normalizeNullableString(input.company ?? null),
        normalizeNullableString(input.company_ar ?? null),
        input.quote,
        normalizeNullableString(input.quote_ar ?? null),
        input.rating,
        normalizeNullableString(input.service_slug ?? null),
        normalizeNullableString(input.city ?? null),
        input.featured,
        input.published,
        input.sort_order,
      ],
    );

    return result.insertId;
  },

  async update(id: number, input: z.infer<typeof testimonialSchema>) {
    await pool.query(
      `UPDATE testimonials
       SET client_name = ?, company = ?, company_ar = ?, quote = ?, quote_ar = ?,
           rating = ?, service_slug = ?, city = ?, featured = ?, published = ?,
           sort_order = ?
       WHERE id = ?`,
      [
        input.client_name,
        normalizeNullableString(input.company ?? null),
        normalizeNullableString(input.company_ar ?? null),
        input.quote,
        normalizeNullableString(input.quote_ar ?? null),
        input.rating,
        normalizeNullableString(input.service_slug ?? null),
        normalizeNullableString(input.city ?? null),
        input.featured,
        input.published,
        input.sort_order,
        id,
      ],
    );
  },

  async remove(id: number) {
    await pool.query('DELETE FROM testimonials WHERE id = ?', [id]);
  },
};

async function listPublicTestimonials(req: Request, res: Response) {
  const parsed = publicQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: 'Parametres invalides' });
    return;
  }

  try {
    res.json(await testimonialModel.listPublic(parsed.data));
  } catch (error) {
    console.error('List public testimonials error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function listTestimonials(_req: Request, res: Response) {
  try {
    res.json(await testimonialModel.listAll());
  } catch (error) {
    console.error('List testimonials error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getTestimonial(req: Request, res: Response) {
  try {
    const testimonial = await testimonialModel.findById(Number(req.params.id));

    if (!testimonial) {
      res.status(404).json({ error: 'Temoignage introuvable' });
      return;
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createTestimonial(req: Request, res: Response) {
  const parsed = testimonialSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = await testimonialModel.create(parsed.data);
    res.status(201).json(await testimonialModel.findById(id));
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateTestimonial(req: Request, res: Response) {
  const parsed = testimonialSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    await testimonialModel.update(Number(req.params.id), parsed.data);
    const testimonial = await testimonialModel.findById(Number(req.params.id));

    if (!testimonial) {
      res.status(404).json({ error: 'Temoignage introuvable' });
      return;
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteTestimonial(req: Request, res: Response) {
  try {
    await testimonialModel.remove(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const publicTestimonialsRouter = Router();
export const adminTestimonialsRouter = Router();

publicTestimonialsRouter.get('/', listPublicTestimonials);

adminTestimonialsRouter.use(requireAdmin);
adminTestimonialsRouter.get('/', listTestimonials);
adminTestimonialsRouter.get('/:id', getTestimonial);
adminTestimonialsRouter.post('/', createTestimonial);
adminTestimonialsRouter.put('/:id', updateTestimonial);
adminTestimonialsRouter.patch('/:id', updateTestimonial);
adminTestimonialsRouter.delete('/:id', deleteTestimonial);
