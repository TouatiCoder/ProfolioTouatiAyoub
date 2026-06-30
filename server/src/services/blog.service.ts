import { prisma } from "../prisma/client";
import { AppError } from "../middleware/error.middleware";
import { activityService } from "./activity.service";
import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1),

  slug: z.string().min(1),

  content: z.string().optional().nullable(),

  excerpt: z.string().optional().nullable(),

  meta_title: z.string().optional().nullable(),

  meta_description: z.string().optional().nullable(),

  published: z.boolean().default(false),
});

export const blogService = {
  /** All posts (admin — includes unpublished) */
  async findAll() {
    return prisma.blogPost.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  },

  /** Published posts only (public) */
  async findPublished() {
    return prisma.blogPost.findMany({
      where: {
        published: true,
      },

      orderBy: {
        created_at: "desc",
      },
    });
  },

  /** Single published post by slug (public) */
  async findBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
    });

    if (!post || !post.published) {
      throw new AppError(404, "Article introuvable");
    }

    return post;
  },

  /** Create post */
  async create(data: z.infer<typeof blogSchema>) {
    const post = await prisma.blogPost.create({
      data: data as any,
    });

    await activityService.log(
      "create_blog_post",
      "blog_post",
      post.id,
      {
        title: data.title,
      }
    );

    return post;
  },

  /** Update post */
  async update(id: number, data: z.infer<typeof blogSchema>) {
    const post = await prisma.blogPost.update({
      where: {
        id,
      },

      data: data as any,
    });

    await activityService.log(
      "update_blog_post",
      "blog_post",
      id,
      {
        title: data.title,
      }
    );

    return post;
  },

  /** Delete post */
  async remove(id: number) {
    const post = await prisma.blogPost.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new AppError(404, "Article introuvable");
    }

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    await activityService.log(
      "delete_blog_post",
      "blog_post",
      id,
      {
        title: post.title,
      }
    );
  },
};