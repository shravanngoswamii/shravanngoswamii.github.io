import { getCollection } from "astro:content";
import type { AnyPost, BlogCollection } from "../types";

export const COLLECTION_META: Record<
  BlogCollection,
  { label: string; prefix: string; description: string }
> = {
  tech: {
    label: "Tech",
    prefix: "/tech",
    description:
      "A collection of my writings on research, technology, and development.",
  },
  cinema: {
    label: "Cinema",
    prefix: "/cinema",
    description: "Thoughts on films, storytelling, and the art of cinema.",
  },
  philosophy: {
    label: "Philosophy",
    prefix: "/philosophy",
    description: "Reflections on ideas, meaning, and the human condition.",
  },
};

export function getPostUrl(post: AnyPost): string {
  const meta = COLLECTION_META[post.collection as BlogCollection];
  return `${meta.prefix}/${post.slug}/`;
}

export function getCollectionLabel(collection: BlogCollection): string {
  return COLLECTION_META[collection].label;
}

export async function getAllPosts(): Promise<AnyPost[]> {
  const [tech, cinema, philosophy] = await Promise.all([
    getCollection("tech"),
    getCollection("cinema"),
    getCollection("philosophy"),
  ]);
  return [...tech, ...cinema, ...philosophy] as AnyPost[];
}
