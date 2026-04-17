import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/client";

export const activityService = {
  /** Write an entry to the activity log */
  async log(
    action:   string,
    entity:   string | null,
    entityId: string | number | null,
    details?: Prisma.InputJsonObject,
  ) {
    await prisma.activityLog.create({
      data: {
        action,
        entity,
        entity_id: entityId != null ? String(entityId) : null,
        details:   details ?? undefined,
      },
    });
  },

  /** Return the last 100 activity entries */
  async findAll() {
    return prisma.activityLog.findMany({
      orderBy: { created_at: "desc" },
      take:    100,
    });
  },

  /** Dashboard stats */
  async stats() {
    const [leads, newLeads, posts, projects] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.project.count(),
    ]);
    return { leads, newLeads, posts, projects };
  },
};
