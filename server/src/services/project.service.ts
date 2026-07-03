import { prisma } from "../prisma/client";
import { AppError } from "../middleware/error.middleware";
import { activityService } from "./activity.service";

export const projectService = {
  async findAll() {
    return prisma.project.findMany({ orderBy: { created_at: "desc" } });
  },

  async create(
    data: {
      title:        string;
      description?: string | null;
      results?:     string | null;
      service_type?: string | null;
      client_name?: string | null;
      live_url?:    string | null;
      featured?:    boolean;
    },
    imageUrl?: string | null,
    videoUrl?: string | null,
  ) {
    const project = await prisma.project.create({
      data: {
        ...data,
        image_url: imageUrl ?? null,
        video_url: videoUrl ?? null,
      },
    });
    await activityService.log("create_project", "project", project.id, { title: data.title });
    return project;
  },

  async update(
    id: number,
    data: {
      title?:        string;
      description?:  string | null;
      results?:      string | null;
      service_type?: string | null;
      client_name?:  string | null;
      live_url?:     string | null;
      featured?:     boolean;
    },
    newImageUrl?: string | null,
    newVideoUrl?: string | null,
  ) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new AppError(404, "Projet introuvable");

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        image_url: newImageUrl !== undefined ? newImageUrl : existing.image_url,
        video_url: newVideoUrl !== undefined ? newVideoUrl : existing.video_url,
      },
    });
    await activityService.log("update_project", "project", id, { title: data.title });
    return project;
  },

  async remove(id: number) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) throw new AppError(404, "Projet introuvable");
    await prisma.project.delete({ where: { id } });
    await activityService.log("delete_project", "project", id, { title: project.title });
  },

  // ── Gallery images ──────────────────────────────────────────────────────────
  async getImages(projectId: number) {
    return prisma.projectImage.findMany({
      where:   { project_id: projectId },
      orderBy: { sort_order: "asc" },
    });
  },

  async addImages(projectId: number, imageUrls: string[]) {
    await prisma.projectImage.createMany({
      data: imageUrls.map((url, i) => ({
        project_id: projectId,
        image_url:  url,
        sort_order: i,
      })),
    });
    return prisma.projectImage.findMany({
      where:   { project_id: projectId },
      orderBy: { sort_order: "asc" },
    });
  },

  async removeImage(imageId: number) {
    await prisma.projectImage.delete({ where: { id: imageId } });
  },
};
