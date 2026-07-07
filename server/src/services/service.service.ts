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

export const serviceSchema = z.object({
  slug: z.string().min(1),

  name: z.string().min(1),

  name_ar: z.string().optional().nullable(),

  short_description: z.string().min(1),

  short_description_ar: z.string().optional().nullable(),

  badge: z.string().optional().nullable(),

  icon: z.string().optional().nullable(),

  cta_label: z.string().optional().nullable(),

  featured: formBoolean(false),

  published: formBoolean(true),

  sort_order: formInt(0),

  image: z.string().optional().nullable(),

  imageUrl: z.string().optional().nullable(),
});

export const patchServiceSchema = z.object({
  published: z.boolean().optional(),

  featured: z.boolean().optional(),

  sort_order: z.number().int().optional(),
});

export const serviceService = {
  async findAll() {
    return prisma.service.findMany({
      orderBy: [
        {
          sort_order: "asc",
        },

        {
          id: "asc",
        },
      ],
    });
  },

  async findPublished(options?: { featured?: boolean; limit?: number }) {
    return prisma.service.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined ? { featured: options.featured } : {}),
      },
      orderBy: [
        {
          sort_order: "asc",
        },

        {
          id: "asc",
        },
      ],
      ...(options?.limit ? { take: options.limit } : {}),
    });
  },

  async create(data: z.infer<typeof serviceSchema>) {
    const service = await prisma.service.create({
      data: data as any,
    });

    await activityService.log(
      "create_service",
      "service",
      service.id,
      {
        name: data.name,
      }
    );

    return service;
  },

  async update(id: number, data: z.infer<typeof serviceSchema>) {
    const service = await prisma.service.update({
      where: {
        id,
      },

      data: data as any,
    });

    await activityService.log(
      "update_service",
      "service",
      id,
      {
        name: data.name,
      }
    );

    return service;
  },

  async patch(id: number, data: z.infer<typeof patchServiceSchema>) {
    return prisma.service.update({
      where: {
        id,
      },

      data: data as any,
    });
  },

  async remove(id: number) {
    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      throw new AppError(404, "Service introuvable");
    }

    await prisma.service.delete({
      where: {
        id,
      },
    });

    await activityService.log(
      "delete_service",
      "service",
      id,
      {
        name: service.name,
      }
    );
  },
};
