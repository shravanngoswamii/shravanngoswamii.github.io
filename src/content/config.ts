// src/content/config.ts
import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const baseSchema = ({ image }: { image: Function }) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine((img: any) => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    aliases: z.array(z.string()).optional().default([]),
    crossTopics: z.array(z.enum(["tech", "cinema", "philosophy"])).optional().default([]),
    toc: z.boolean().optional().default(true),
  });

const tech = defineCollection({
  type: "content",
  schema: ({ image }) => baseSchema({ image }),
});

const cinema = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      director: z.string().optional(),
      year: z.number().optional(),
      rating: z.number().min(0).max(10).optional(),
    }),
});

const philosophy = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema({ image }).extend({
      thinkers: z.array(z.string()).optional(),
      tradition: z.string().optional(),
    }),
});

const shelf = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      creator: z.string(),
      genre: z.string(),
      type: z.enum(["book", "movie", "series", "anime", "game", "course", "video", "documentary", "sitcom", "miniseries"]),
      categories: z.array(z.enum(["tech", "cinema", "philosophy"])).min(1),
      status: z.enum(["done", "in-progress", "wishlist"]),
      rating: z.number().min(0).max(10).optional(),
      year: z.number().optional(),
      description: z.string().optional(),
    }),
});

export const collections = { tech, cinema, philosophy, shelf };
