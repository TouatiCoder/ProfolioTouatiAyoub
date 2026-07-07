
import { Request, Response } from "express";
import { uploadUrlFor } from "../middleware/upload.middleware";

export const uploadController = {
  upload: (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      res.json({ url: uploadUrlFor(req.file) });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  },
};
