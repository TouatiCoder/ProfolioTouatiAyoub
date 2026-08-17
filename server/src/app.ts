import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// ─────────────────────────────────────────────────────────────────────────────
// Trust proxy
// Required for secure cookies behind Render / Hostinger reverse proxy
// ─────────────────────────────────────────────────────────────────────────────
app.set("trust proxy", 1);

// ─────────────────────────────────────────────────────────────────────────────
// Security & Logging
// ─────────────────────────────────────────────────────────────────────────────
app.use(helmet());

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(compression());

app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);

// ─────────────────────────────────────────────────────────────────────────────
// Rate limiting
// ─────────────────────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Trop de requêtes, veuillez réessayer plus tard.",
  },
});

app.use("/api/", apiLimiter);

// ─────────────────────────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────────────────────────
const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) || [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:3000",
    "https://touatiayoub.com",
    "https://www.touatiayoub.com",
    "https://forge-scale.onrender.com",
  ];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps/postman/etc)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("❌ CORS blocked origin:", origin);

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],

  exposedHeaders: ["Set-Cookie"],
};

// Apply CORS
app.use(cors(corsOptions));

// IMPORTANT: Handle preflight requests
app.options("*", cors(corsOptions));

// ─────────────────────────────────────────────────────────────────────────────
// Cookie & Body parsers
// IMPORTANT: cookieParser MUST come before routes
// ─────────────────────────────────────────────────────────────────────────────
app.use(cookieParser());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ─────────────────────────────────────────────────────────────────────────────
// Static uploads
// ─────────────────────────────────────────────────────────────────────────────
const uploadsDir = path.resolve(__dirname, "../uploads");

// Filenames are content-hashed (Date.now() + random suffix, see
// upload.middleware.ts), so a given URL's bytes never change — safe to
// cache for a year. Without this, browsers re-validate/re-download these
// images on every visit, which Lighthouse flags as "Serve static assets
// with an efficient cache policy".
app.use("/uploads", express.static(uploadsDir, { maxAge: "1y", immutable: true }));

// ─────────────────────────────────────────────────────────────────────────────
// API routes
// ─────────────────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─────────────────────────────────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 404 handler
// ─────────────────────────────────────────────────────────────────────────────
app.use("/api", (_req, res) => {
  res.status(404).json({
    error: "Route introuvable",
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Global error handler
// ─────────────────────────────────────────────────────────────────────────────
app.use(errorHandler);

export default app;