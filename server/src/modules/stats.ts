import { Router, type Request, type Response } from 'express';
import type { RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js';
import { requireAdmin } from '../middleware/auth.js';

type CountRow = RowDataPacket & { count: number };

async function getStats(_req: Request, res: Response) {
  try {
    const [[leadsRows], [newLeadsRows], [postsRows], [projectsRows], [servicesRows], [testimonialsRows], [usersRows]] =
      await Promise.all([
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM leads'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM leads WHERE status = "new"'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM blog_posts'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM projects'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM services'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM testimonials'),
        pool.query<CountRow[]>('SELECT COUNT(*) AS count FROM users'),
      ]);

    res.json({
      leads: leadsRows[0]?.count ?? 0,
      newLeads: newLeadsRows[0]?.count ?? 0,
      posts: postsRows[0]?.count ?? 0,
      projects: projectsRows[0]?.count ?? 0,
      services: servicesRows[0]?.count ?? 0,
      testimonials: testimonialsRows[0]?.count ?? 0,
      users: usersRows[0]?.count ?? 0,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export const adminStatsRouter = Router();

adminStatsRouter.use(requireAdmin);
adminStatsRouter.get('/', getStats);
