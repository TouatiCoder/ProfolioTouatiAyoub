import { prisma } from "../prisma/client";
import { AppError } from "../middleware/error.middleware";
import { activityService } from "./activity.service";
import { z } from "zod";

const formBoolean = (defaultValue: boolean) => z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return defaultValue;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true" || value === "1";
  return Boolean(value);
}, z.boolean());

const formInt = (defaultValue: number) => z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return defaultValue;
  return typeof value === "string" ? Number(value) : value;
}, z.number().int());

export const TECHNOLOGY_CATEGORIES = [
  "frontend", "backend", "mobile", "database", "cloud", "infrastructure", "cms", "discipline",
] as const;

export const technologySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "slug: lettres minuscules, chiffres et tirets uniquement"),
  category: z.enum(TECHNOLOGY_CATEGORIES),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  featured: formBoolean(false),
  published: formBoolean(true),
  sort_order: formInt(0),
});

export const patchTechnologySchema = z.object({
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export const technologyService = {
  async findAll() {
    return prisma.technology.findMany({
      orderBy: [{ sort_order: "asc" }, { id: "asc" }],
    });
  },

  async findPublished(options?: { featured?: boolean; category?: string }) {
    return prisma.technology.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined ? { featured: options.featured } : {}),
        ...(options?.category ? { category: options.category } : {}),
      },
      orderBy: [{ sort_order: "asc" }, { id: "asc" }],
    });
  },

  async create(data: z.infer<typeof technologySchema>) {
    const tech = await prisma.technology.create({ data: data as any });
    await activityService.log("create_technology", "technology", tech.id, { name: data.name });
    return tech;
  },

  async update(id: number, data: z.infer<typeof technologySchema>) {
    const tech = await prisma.technology.update({ where: { id }, data: data as any });
    await activityService.log("update_technology", "technology", id, { name: data.name });
    return tech;
  },

  async patch(id: number, data: z.infer<typeof patchTechnologySchema>) {
    return prisma.technology.update({ where: { id }, data });
  },

  async remove(id: number) {
    const tech = await prisma.technology.findUnique({ where: { id } });
    if (!tech) throw new AppError(404, "Technologie introuvable");

    await prisma.technology.delete({ where: { id } });
    await activityService.log("delete_technology", "technology", id, { name: tech.name });
  },
};
