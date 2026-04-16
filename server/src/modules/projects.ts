import { Router, type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import multer from 'multer';
import { z } from 'zod';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';
import { normalizeNullableString, stripOrigin, toBoolean } from '../lib/normalizers.js';

type ProjectRow = RowDataPacket & {
  id: number;
  title: string;
  description: string | null;
  results: string | null;
  image_url: string | null;
  service_type: string | null;
  client_name: string | null;
  live_url: string | null;
  featured: boolean | number;
  created_at: string;
  updated_at: string;
};

type ProjectImageRow = RowDataPacket & {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
  created_at: string;
};

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'project-images');
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    callback(null, UPLOAD_DIR);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.includes(file.mimetype)) {
      callback(new Error('Format image non supporte'));
      return;
    }

    callback(null, true);
  },
});

const projectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  results: z.string().trim().max(400).optional().nullable(),
  service_type: z.string().trim().max(120).optional().nullable(),
  client_name: z.string().trim().max(200).optional().nullable(),
  live_url: z.string().trim().url().max(500).optional().or(z.literal('')).nullable(),
  featured: z.coerce.boolean().default(false),
});

const publicQuerySchema = z.object({
  service: z.string().trim().max(120).optional(),
  featured: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

function toUploadUrl(filename: string): string {
  return `/uploads/project-images/${filename}`;
}

function toFilePath(uploadUrl: string | null | undefined): string | null {
  if (!uploadUrl || !uploadUrl.startsWith('/uploads/project-images/')) {
    return null;
  }

  return path.join(process.cwd(), uploadUrl.replace(/^\//, '').replaceAll('/', path.sep));
}

async function safeDeleteFile(uploadUrl: string | null | undefined): Promise<void> {
  const filePath = toFilePath(uploadUrl);

  if (!filePath) {
    return;
  }

  try {
    await fsp.unlink(filePath);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code !== 'ENOENT') {
      console.error('Delete file error:', error);
    }
  }
}

function normalizeProject(row: ProjectRow) {
  return {
    ...row,
    image_url: stripOrigin(row.image_url),
    featured: toBoolean(row.featured),
  };
}

const projectModel = {
  async listPublic(filters: z.infer<typeof publicQuerySchema>) {
    let sql = 'SELECT * FROM projects WHERE 1 = 1';
    const params: unknown[] = [];

    if (filters.service) {
      sql += ' AND service_type = ?';
      params.push(filters.service);
    }

    if (filters.featured === true) {
      sql += ' AND featured = TRUE';
    }

    sql += ' ORDER BY featured DESC, created_at DESC';

    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }

    const [rows] = await pool.query<ProjectRow[]>(sql, params);
    return rows.map(normalizeProject);
  },

  async listAll() {
    const [rows] = await pool.query<ProjectRow[]>(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC',
    );

    return rows.map(normalizeProject);
  },

  async findById(id: number) {
    const [rows] = await pool.query<ProjectRow[]>(
      'SELECT * FROM projects WHERE id = ? LIMIT 1',
      [id],
    );

    return rows[0] ? normalizeProject(rows[0]) : null;
  },

  async findGallery(projectId: number) {
    const [rows] = await pool.query<ProjectImageRow[]>(
      'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC, created_at ASC',
      [projectId],
    );

    return rows.map((row) => ({
      ...row,
      image_url: stripOrigin(row.image_url) ?? row.image_url,
    }));
  },

  async create(input: z.infer<typeof projectSchema>, imageUrl: string | null) {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO projects (
        title, description, results, image_url, service_type, client_name, live_url, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.title,
        normalizeNullableString(input.description ?? null),
        normalizeNullableString(input.results ?? null),
        imageUrl,
        normalizeNullableString(input.service_type ?? null),
        normalizeNullableString(input.client_name ?? null),
        normalizeNullableString(input.live_url ?? null),
        input.featured,
      ],
    );

    return result.insertId;
  },

  async update(id: number, input: z.infer<typeof projectSchema>, imageUrl?: string | null) {
    await pool.query(
      `UPDATE projects
       SET title = ?, description = ?, results = ?, image_url = ?, service_type = ?,
           client_name = ?, live_url = ?, featured = ?
       WHERE id = ?`,
      [
        input.title,
        normalizeNullableString(input.description ?? null),
        normalizeNullableString(input.results ?? null),
        imageUrl === undefined ? null : imageUrl,
        normalizeNullableString(input.service_type ?? null),
        normalizeNullableString(input.client_name ?? null),
        normalizeNullableString(input.live_url ?? null),
        input.featured,
        id,
      ],
    );
  },

  async preserveImageUpdate(id: number, input: z.infer<typeof projectSchema>) {
    await pool.query(
      `UPDATE projects
       SET title = ?, description = ?, results = ?, service_type = ?, client_name = ?,
           live_url = ?, featured = ?
       WHERE id = ?`,
      [
        input.title,
        normalizeNullableString(input.description ?? null),
        normalizeNullableString(input.results ?? null),
        normalizeNullableString(input.service_type ?? null),
        normalizeNullableString(input.client_name ?? null),
        normalizeNullableString(input.live_url ?? null),
        input.featured,
        id,
      ],
    );
  },

  async addGalleryImages(projectId: number, imageUrls: string[]) {
    for (const [index, imageUrl] of imageUrls.entries()) {
      await pool.query(
        `INSERT INTO project_images (project_id, image_url, sort_order)
         VALUES (?, ?, ?)`,
        [projectId, imageUrl, index],
      );
    }
  },

  async findGalleryImage(id: number) {
    const [rows] = await pool.query<ProjectImageRow[]>(
      'SELECT * FROM project_images WHERE id = ? LIMIT 1',
      [id],
    );

    return rows[0]
      ? {
          ...rows[0],
          image_url: stripOrigin(rows[0].image_url) ?? rows[0].image_url,
        }
      : null;
  },

  async removeGalleryImage(id: number) {
    await pool.query('DELETE FROM project_images WHERE id = ?', [id]);
  },

  async removeProject(id: number) {
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
  },
};

async function listPublicProjects(req: Request, res: Response) {
  const parsed = publicQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: 'Parametres invalides' });
    return;
  }

  try {
    res.json(await projectModel.listPublic(parsed.data));
  } catch (error) {
    console.error('List public projects error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function listProjects(_req: Request, res: Response) {
  try {
    res.json(await projectModel.listAll());
  } catch (error) {
    console.error('List projects error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getProject(req: Request, res: Response) {
  try {
    const project = await projectModel.findById(Number(req.params.id));

    if (!project) {
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getProjectGallery(req: Request, res: Response) {
  try {
    res.json(await projectModel.findGallery(Number(req.params.id)));
  } catch (error) {
    console.error('Get project gallery error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createProject(req: Request, res: Response) {
  const parsed = projectSchema.safeParse(req.body);

  if (!parsed.success) {
    if (req.file) {
      await safeDeleteFile(toUploadUrl(req.file.filename));
    }

    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const imageUrl = req.file ? toUploadUrl(req.file.filename) : null;
    const id = await projectModel.create(parsed.data, imageUrl);
    res.status(201).json(await projectModel.findById(id));
  } catch (error) {
    if (req.file) {
      await safeDeleteFile(toUploadUrl(req.file.filename));
    }

    console.error('Create project error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateProject(req: Request, res: Response) {
  const parsed = projectSchema.safeParse(req.body);

  if (!parsed.success) {
    if (req.file) {
      await safeDeleteFile(toUploadUrl(req.file.filename));
    }

    res.status(400).json({ error: parsed.error.errors[0]?.message ?? 'Donnees invalides' });
    return;
  }

  try {
    const id = Number(req.params.id);
    const existing = await projectModel.findById(id);

    if (!existing) {
      if (req.file) {
        await safeDeleteFile(toUploadUrl(req.file.filename));
      }

      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    if (req.file) {
      const nextImageUrl = toUploadUrl(req.file.filename);
      await projectModel.update(id, parsed.data, nextImageUrl);
      await safeDeleteFile(existing.image_url);
    } else {
      await projectModel.preserveImageUpdate(id, parsed.data);
    }

    res.json(await projectModel.findById(id));
  } catch (error) {
    if (req.file) {
      await safeDeleteFile(toUploadUrl(req.file.filename));
    }

    console.error('Update project error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteProject(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const project = await projectModel.findById(id);
    const gallery = await projectModel.findGallery(id);

    await projectModel.removeProject(id);
    await Promise.all([
      safeDeleteFile(project?.image_url),
      ...gallery.map((image) => safeDeleteFile(image.image_url)),
    ]);

    res.status(204).send();
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function uploadGalleryImages(req: Request, res: Response) {
  const files = (req.files as Express.Multer.File[] | undefined) ?? [];

  if (!files.length) {
    res.status(400).json({ error: 'Aucune image recue' });
    return;
  }

  try {
    const project = await projectModel.findById(Number(req.params.id));

    if (!project) {
      await Promise.all(files.map((file) => safeDeleteFile(toUploadUrl(file.filename))));
      res.status(404).json({ error: 'Projet introuvable' });
      return;
    }

    const imageUrls = files.map((file) => toUploadUrl(file.filename));
    await projectModel.addGalleryImages(project.id, imageUrls);
    res.status(201).json(await projectModel.findGallery(project.id));
  } catch (error) {
    await Promise.all(files.map((file) => safeDeleteFile(toUploadUrl(file.filename))));
    console.error('Upload gallery images error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteGalleryImage(req: Request, res: Response) {
  try {
    const image = await projectModel.findGalleryImage(Number(req.params.id));

    if (!image) {
      res.status(404).json({ error: 'Image introuvable' });
      return;
    }

    await projectModel.removeGalleryImage(Number(req.params.id));
    await safeDeleteFile(image.image_url);
    res.status(204).send();
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const publicProjectsRouter = Router();
export const adminProjectsRouter = Router();

publicProjectsRouter.get('/', listPublicProjects);
publicProjectsRouter.get('/:id', getProject);
publicProjectsRouter.get('/:id/images', getProjectGallery);

adminProjectsRouter.use(requireAdmin);
adminProjectsRouter.get('/', listProjects);
adminProjectsRouter.get('/:id', getProject);
adminProjectsRouter.post('/', upload.single('thumbnail'), createProject);
adminProjectsRouter.put('/:id', upload.single('thumbnail'), updateProject);
adminProjectsRouter.patch('/:id', upload.single('thumbnail'), updateProject);
adminProjectsRouter.delete('/:id', deleteProject);
adminProjectsRouter.post('/:id/images', upload.array('images', 10), uploadGalleryImages);
adminProjectsRouter.delete('/images/:id', deleteGalleryImage);
