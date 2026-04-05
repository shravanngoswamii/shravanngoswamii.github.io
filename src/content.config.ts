import { SITE } from "@config";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const TOPICS = ["tech", "cinema", "philosophy"] as const;

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: z.union([image(), z.string()]).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      aliases: z.array(z.string()).optional().default([]),
      crossTopics: z.array(z.enum(TOPICS)).optional().default([]),
      toc: z.boolean().optional().default(true),
      shelf: z.array(z.string()).optional().default([]),
      topic: z.enum(TOPICS).default("tech"),
      thinkers: z.array(z.string()).optional(),
      tradition: z.string().optional(),
    }),
});

const shelf = defineCollection({
  loader: glob({ base: "./src/content/shelf", pattern: "**/*.md" }),
  schema: () =>
    z.object({
      title: z.string(),
      creator: z.string(),
      genre: z.string(),
      type: z.enum([
        "book",
        "movie",
        "series",
        "anime",
        "game",
        "course",
        "video",
        "documentary",
        "sitcom",
        "miniseries",
      ]),
      categories: z.array(z.enum(TOPICS)).min(1),
      status: z.enum(["done", "in-progress", "wishlist"]),
      rating: z.number().min(0).max(10).optional(),
      year: z.number().optional(),
      description: z.string().optional(),
      poster: z.string().optional(),
      pubDatetime: z.date().optional(),
      tags: z.array(z.string()).optional().default([]),
      author: z.string().default(SITE.author),
      imdbId: z.string().optional(),
      letterboxdSlug: z.string().optional(),
    }),
});

export const collections = { blog, shelf };