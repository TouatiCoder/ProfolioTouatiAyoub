import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { closePool, testConnection } from './config/db.js';
import { authRouter } from './modules/auth.js';
import { adminUsersRouter } from './modules/users.js';
import { publicLeadsRouter, adminLeadsRouter } from './modules/leads.js';
import { publicBlogRouter, adminBlogRouter } from './modules/blog.js';
import { publicServicesRouter, adminServicesRouter } from './modules/services.js';
import { publicTestimonialsRouter, adminTestimonialsRouter } from './modules/testimonials.js';
import { publicProjectsRouter, adminProjectsRouter } from './modules/projects.js';
import { adminActivityRouter } from './modules/activity.js';
import { adminStatsRouter } from './modules/stats.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:8080,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requetes, reessayez plus tard' },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requetes admin, reessayez plus tard' },
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', adminLimiter, authRouter);

app.use('/api/leads', publicLimiter, publicLeadsRouter);
app.use('/api/blog', publicLimiter, publicBlogRouter);
app.use('/api/services', publicLimiter, publicServicesRouter);
app.use('/api/testimonials', publicLimiter, publicTestimonialsRouter);
app.use('/api/projects', publicLimiter, publicProjectsRouter);

app.use('/api/admin/users', adminLimiter, adminUsersRouter);
app.use('/api/admin/leads', adminLimiter, adminLeadsRouter);
app.use('/api/admin/blog', adminLimiter, adminBlogRouter);
app.use('/api/admin/services', adminLimiter, adminServicesRouter);
app.use('/api/admin/testimonials', adminLimiter, adminTestimonialsRouter);
app.use('/api/admin/projects', adminLimiter, adminProjectsRouter);
app.use('/api/admin/activity', adminLimiter, adminActivityRouter);
app.use('/api/admin/stats', adminLimiter, adminStatsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error('Unhandled server error:', error);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});

async function start() {
  await testConnection();

  const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await closePool();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch((error) => {
  console.error('Cannot start server:', error);
  process.exit(1);
});
