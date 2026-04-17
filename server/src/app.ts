import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));

// ─── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Static files (uploaded images) ──────────────────────────────────────────
const uploadsDir = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsDir));

// ─── API routes ───────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// ─── 404 for unknown /api routes ─────────────────────────────────────────────
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// ─── Global error handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

export default app;
