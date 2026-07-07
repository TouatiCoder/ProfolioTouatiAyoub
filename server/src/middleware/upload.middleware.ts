import multer from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";

const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
const IMAGE_UPLOADS_DIR = path.join(UPLOADS_DIR, "images");
const VIDEO_UPLOADS_DIR = path.join(UPLOADS_DIR, "videos");
const SERVICE_UPLOADS_DIR = path.join(UPLOADS_DIR, "services");

const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const VIDEO_MIME_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/mpeg",
]);

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".ogv", ".mov", ".avi", ".mkv", ".mpeg", ".mpg"]);

[UPLOADS_DIR, IMAGE_UPLOADS_DIR, VIDEO_UPLOADS_DIR, SERVICE_UPLOADS_DIR].forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

function safeFilename(file: Express.Multer.File) {
  const ext = path.extname(file.originalname).toLowerCase();
  const baseName = path.basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase()
    .slice(0, 40);

  return `${Date.now()}-${baseName || "upload"}-${Math.random().toString(36).slice(2, 8)}${ext}`;
}

function createStorage(destination: (file: Express.Multer.File) => string) {
  return multer.diskStorage({
    destination: (_req, file, cb) => cb(null, destination(file)),
    filename:    (_req, file, cb) => cb(null, safeFilename(file)),
  });
}

function isImage(file: Express.Multer.File) {
  return IMAGE_MIME_TYPES.has(file.mimetype) || file.mimetype.startsWith("image/");
}

function isVideo(file: Express.Multer.File) {
  const ext = path.extname(file.originalname).toLowerCase();
  return VIDEO_MIME_TYPES.has(file.mimetype) || file.mimetype.startsWith("video/") || VIDEO_EXTENSIONS.has(ext);
}

function imageOnlyFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (isImage(file)) {
    cb(null, true);
    return;
  }

  cb(new Error("Seules les images JPG, PNG, WebP, GIF ou SVG sont acceptees."));
}

function mediaFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (isImage(file) || isVideo(file)) {
    cb(null, true);
    return;
  }

  cb(new Error("Images et videos uniquement : JPG, PNG, WebP, MP4, WebM, OGG ou MOV."));
}

function mediaDestination(file: Express.Multer.File) {
  return isVideo(file) ? VIDEO_UPLOADS_DIR : IMAGE_UPLOADS_DIR;
}

export function uploadUrlFor(file: Express.Multer.File) {
  const relativePath = path.relative(UPLOADS_DIR, file.path).split(path.sep).join("/");
  return `/uploads/${relativePath}`;
}

export const upload = multer({
  storage:    createStorage(() => IMAGE_UPLOADS_DIR),
  limits:     { fileSize: 20 * 1024 * 1024 },
  fileFilter: imageOnlyFilter,
});

export const uploadServiceImage = multer({
  storage:    createStorage(() => SERVICE_UPLOADS_DIR),
  limits:     { fileSize: 20 * 1024 * 1024 },
  fileFilter: imageOnlyFilter,
});

export const uploadMedia = multer({
  storage:    createStorage(mediaDestination),
  limits:     { fileSize: 500 * 1024 * 1024 },
  fileFilter: mediaFilter,
});
