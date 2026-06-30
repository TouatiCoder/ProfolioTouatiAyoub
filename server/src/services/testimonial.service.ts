import { prisma } from "../prisma/client";
import { AppError } from "../middleware/error.middleware";
import { activityService } from "./activity.service";
import { z } from "zod";

export const testimonialSchema = z.object({
  client_name: z.string().min(1),

  company: z.string().optional().nullable(),

  company_ar: z.string().optional().nullable(),

  quote: z.string().min(1),

  quote_ar: z.string().optional().nullable(),

  rating: z.number().int().min(1).max(5).default(5),

  service_slug: z.string().optional().nullable(),

  city: z.string().optional().nullable(),

  featured: z.boolean().default(false),
});

export const testimonialService = {
  async findAll() {
    return prisma.testimonial.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  },

  async create(data: z.infer<typeof testimonialSchema>) {
    const t = await prisma.testimonial.create({
      data: data as any,
    });

    await activityService.log(
      "create_testimonial",
      "testimonial",
      t.id,
      {
        client_name: data.client_name,
      }
    );

    return t;
  },

  async update(id: number, data: z.infer<typeof testimonialSchema>) {
    const t = await prisma.testimonial.update({
      where: {
        id,
      },

      data: data as any,
    });

    await activityService.log(
      "update_testimonial",
      "testimonial",
      id,
      {
        client_name: data.client_name,
      }
    );

    return t;
  },

  async remove(id: number) {
    const t = await prisma.testimonial.findUnique({
      where: {
        id,
      },
    });

    if (!t) {
      throw new AppError(404, "Témoignage introuvable");
    }

    await prisma.testimonial.delete({
      where: {
        id,
      },
    });

    await activityService.log(
      "delete_testimonial",
      "testimonial",
      id,
      {
        client_name: t.client_name,
      }
    );
  },
};