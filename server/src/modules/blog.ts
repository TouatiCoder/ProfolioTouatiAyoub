import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { normalizeNullableString, stripOrigin, toBoolean } from '../lib/normalizers.js';

type BlogRow = RowDataPacket & {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keyword_focus: string | null;
  locale: string;
  published: boolean | number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const postSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().max(500).optional().nullable(),
  content: z.string().trim().optional().nullable(),
  cover_image: z.string().trim().max(500).optional().nullable(),
  meta_title: z.string().trim().max(70).optional().nullable(),
  meta_description: z.string().trim().max(180).optional().nullable(),
  keyword_focus: z.string().trim().max(120).optional().nullable(),
  locale: z.string().trim().min(2).max(5).default('fr'),
  published: z.boolean().default(false),
});

const publicQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

function normalizePost(row: BlogRow) {
  return {
    ...row,
    published: toBoolean(row.published),
    cover_image: stripOrigin(row.cover_image),
  };
}

const blogModel = {
  async listPublished(limit = 20) {
    const [rows] = await pool.query<BlogRow[]>(
      `SELECT id, title, slug, excerpt, content, cover_image, meta_title, meta_description,
              keyword_focus, locale, published, published_at, created_at, updated_at
       FROM blog_posts
       WHERE published = TRUE
       ORDER BY published_at DESC, created_at DESC
       LIMIT ?`,
      [limit],
    );

    return rows.map(normalizePost);
  },

  async listAll() {
    const [rows] = await pool.query<BlogRow[]>(
      `SELECT id, title, slug, excerpt, content, cover_image, meta_title, meta_description,
              keyword_focus, locale, published, published_at, created_at, updated_at
       FROM blog_posts
       ORDER BY created_at DESC`,
    );

    return rows.map(normalizePost);
  },

  async findPublishedBySlug(slug: string) {
    const [rows] = await pool.query<BlogRow[]>(
      `SELECT id, title, slug, excerpt, content, cover_image, meta_title, meta_description,
              keyword_focus, locale, published, published_at, created_at, updated_at
       FROM blog_posts
       WHERE slug = ? AND published = TRUE
       LIMIT 1`,
      [slug],
    );

    return rows[0] ? normalizePost(rows[0]) : null;
  },

  async findById(id: number) {
    const [rows] = await pool.query<BlogRow[]>(
      `SELECT id, title, slug, excerpt, content, cover_image, meta_title, meta_description,
              keyword_focus, locale, published, published_at, created_at, updated_at
       FROM blog_posts
       WHERE id = ?
       LIMIT 1`,
      [id],
    );

    return rows[0] ? normalizePost(rows[0]) : null;
  },

  async create(input: z.infer<typeof postSchema>) {
    const publishedAt = input.published ? new Date() : null;
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO blog_posts (
         title, slug, excerpt, content, cover_image, meta_title, meta_description,
         keyword_focus, locale, published, published_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.title,
        input.slug,
        normalizeNullableString(input.excerpt ?? null),
        normalizeNullableString(input.content ?? null),
        stripOrigin(input.cover_image ?? null),
        normalizeNullableString(input.meta_title ?? null),
        normalizeNullableString(input.meta_description ?? null),
        normalizeNullableString(input.keyword_focus ?? null),
        input.locale,
        input.published,
        publishedAt,
      ],
    );

    return result.insertId;
  },

  async update(id: number, input: z.infer<typeof postSchema>) {
    const current = await this.findById(id);
    const shouldStampPublication = input.published && !current?.published_at;

    await pool.query(
      `UPDATE blog_posts
       SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, meta_title = ?,
           meta_description = ?, keyword_focus = ?, locale = ?, published = ?,
           published_at = ?
       WHERE id = ?`,
      [
        input.title,
        input.slug,
        normalizeNullableString(input.excerpt ?? null),
        normalizeNullableString(input.content ?? null),
        stripOrigin(input.cover_image ?? null),
        normalizeNullableString(input.meta_title ?? null),
        normalizeNullableString(input.meta_description ?? null),
        normalizeNullableString(input.keyword_focus ?? null),
        input.locale,
        input.published,
        input.published ? (shouldStampPublication ? new Date() : current?.published_at ?? new Date()) : null,
        id,
      ],
    );
  },

  async remove(id: number) {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  },
};

async function listPublishedPosts(req: Request, res: Response) {
  const parsed = publicQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: 'Parametres invalides' });
    return;
  }

  try {
    res.json(await blogModel.listPublished(parsed.data.limit ?? 20));
  } catch (error) {
    console.error('List published blog posts error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getPublishedPost(req: Request, res: Response) {
  try {
    const post = await blogModel.findPublishedBySlug(String(req.params.slug));

    if (!post) {
      res.status(404).json({ error: 'Article introuvable' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function listPosts(_req: Request, res: Response) {
  try {
    res.json(await blogModel.listAll());
  } catch (error) {
    console.error('List admin blog posts error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getPost(req: Request, res: Response) {
  try {
    const post = await blogModel.findById(Number(req.params.id));

    if (!post) {
      res.status(404).json({ error: 'Article introuvable' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Get admin blog post error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createPost(req: Request, res: Response) {
  const parsed = postSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = await blogModel.create(parsed.data);
    const post = await blogModel.findById(id);
    res.status(201).json(post);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Ce slug existe deja' });
      return;
    }

    console.error('Create blog post error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updatePost(req: Request, res: Response) {
  const parsed = postSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    await blogModel.update(Number(req.params.id), parsed.data);
    const post = await blogModel.findById(Number(req.params.id));

    if (!post) {
      res.status(404).json({ error: 'Article introuvable' });
      return;
    }

    res.json(post);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException & { code?: string }).code;

    if (code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Ce slug existe deja' });
      return;
    }

    console.error('Update blog post error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deletePost(req: Request, res: Response) {
  try {
    await blogModel.remove(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const publicBlogRouter = Router();
export const adminBlogRouter = Router();

publicBlogRouter.get('/', listPublishedPosts);
publicBlogRouter.get('/:slug', getPublishedPost);

adminBlogRouter.use(requireAdmin);
adminBlogRouter.get('/', listPosts);
adminBlogRouter.get('/:id', getPost);
adminBlogRouter.post('/', createPost);
adminBlogRouter.put('/:id', updatePost);
adminBlogRouter.patch('/:id', updatePost);
adminBlogRouter.delete('/:id', deletePost);
