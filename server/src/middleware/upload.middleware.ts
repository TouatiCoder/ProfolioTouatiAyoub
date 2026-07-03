import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename:    (_req, file, cb) => {
    const ext      = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase()
      .slice(0, 40);
    const name = `${Date.now()}-${baseName}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

// Images only — 10 MB
export const upload = multer({
  storage,
  limits:     { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new Error("Seules les images sont acceptées"));
  },
});

// Images + Videos — 300 MB (for project with video upload)
export const uploadMedia = multer({
  storage,
  limits: { fileSize: 300 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      return cb(null, true);
    }
    cb(new Error("Images et vidéos uniquement (mp4, webm, mov, jpg, png…)"));
  },
});
