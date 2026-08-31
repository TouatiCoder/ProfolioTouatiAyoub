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

export const testimonialSchema = z.object({
  client_name: z.string().min(1),

  company: z.string().optional().nullable(),

  company_ar: z.string().optional().nullable(),

  // Stage 2 additions — all optional so existing rows/forms keep working unchanged.
  role: z.string().optional().nullable(),

  quote: z.string().min(1),

  quote_ar: z.string().optional().nullable(),

  rating: z.number().int().min(1).max(5).default(5),

  service_slug: z.string().optional().nullable(),

  city: z.string().optional().nullable(),

  photo_url: z.string().optional().nullable(),

  // Accepts an ISO date string from a form input; null/empty clears it.
  review_date: z.coerce.date().optional().nullable(),

  source: z.string().optional().nullable(),

  verified: formBoolean(false),

  published: formBoolean(true),

  // Stage 2 fix — the admin form already sent this; there was no column to
  // receive it, so it was silently discarded on every save until now.
  sort_order: formInt(0),

  featured: formBoolean(false),
});

export const patchTestimonialSchema = z.object({
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
});

export const testimonialService = {
  async findAll() {
    return prisma.testimonial.findMany({
      orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
    });
  },

  async findPublished(options?: { featured?: boolean; limit?: number }) {
    return prisma.testimonial.findMany({
      where: {
        published: true,
        ...(options?.featured !== undefined ? { featured: options.featured } : {}),
      },
      orderBy: [{ sort_order: "asc" }, { created_at: "desc" }],
      ...(options?.limit ? { take: options.limit } : {}),
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

  async patch(id: number, data: z.infer<typeof patchTestimonialSchema>) {
    return prisma.testimonial.update({
      where: { id },
      data,
    });
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