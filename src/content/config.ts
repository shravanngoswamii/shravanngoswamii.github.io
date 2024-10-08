import { SITE } from "@config";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Function to parse dd-mm-yyyy format
const parseDateString = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null; // Handle null or undefined
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}T00:00:00Z`); // Convert to ISO format
};

const blog = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.string().transform(parseDateString).refine(date => date !== null && !isNaN(date.getTime())),
      modDatetime: z.string().optional().nullable().transform(parseDateString).refine(date => date === null || !isNaN(date.getTime())),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog };
