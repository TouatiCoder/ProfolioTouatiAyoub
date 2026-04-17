import { prisma } from "../prisma/client";
import { AppError } from "../middleware/error.middleware";
import { Prisma } from "@prisma/client";
import { activityService } from "./activity.service";
import { z } from "zod";

// ─── Validation ───────────────────────────────────────────────────────────────
export const createLeadSchema = z.object({
  name:    z.string().min(1),
  email:   z.string().email(),
  phone:   z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
  source:  z.string().optional(),
});

const VALID_STATUSES = ["new", "contacted", "closed"] as const;

// ─── Service ──────────────────────────────────────────────────────────────────
export const leadService = {
  async findAll(status?: string, search?: string) {
    return prisma.lead.findMany({
      where: {
        ...(status && status !== "all" ? { status } : {}),
        ...(search
          ? {
              OR: [
                { name:  { contains: search } },
                { email: { contains: search } },
                { phone: { contains: search } },
              ],
            }
          : {}),
      },
      orderBy: { created_at: "desc" },
    });
  },

  async create(data: z.infer<typeof createLeadSchema>) {
    const lead = await prisma.lead.create({ data });
    await activityService.log("create_lead", "lead", lead.id, { name: data.name, email: data.email });
    return lead;
  },

  async updateStatus(id: number, status: string) {
    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      throw new AppError(400, "Status invalide (new | contacted | closed)");
    }
    const lead = await prisma.lead.update({ where: { id }, data: { status } });
    await activityService.log("update_lead", "lead", id, { status });
    return lead;
  },

  async remove(id: number) {
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new AppError(404, "Lead introuvable");
    await prisma.lead.delete({ where: { id } });
    await activityService.log("delete_lead", "lead", id, { name: lead.name });
  },
};
