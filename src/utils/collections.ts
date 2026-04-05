import { getCollection } from "astro:content";
import type { AnyPost, Topic } from "../types";

export const COLLECTION_META: Record<
  Topic,
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

export function getPostSlug(post: AnyPost): string {
  const topic = post.data.topic ?? "tech";
  const topicPrefix = `${topic}/`;
  const postId = post.id.replace(/\.[^/.]+$/, "");
  return postId.startsWith(topicPrefix)
    ? postId.slice(topicPrefix.length)
    : postId;
}

export function getPostUrl(post: AnyPost): string {
  const topic = post.data.topic ?? "tech";
  const meta = COLLECTION_META[topic];
  return `${meta.prefix}/${getPostSlug(post)}/`;
}

export function getPostTopic(post: AnyPost): Topic {
  return post.data.topic ?? "tech";
}

export function getCollectionLabel(topic: Topic): string {
  return COLLECTION_META[topic].label;
}

export async function getAllPosts(): Promise<AnyPost[]> {
  return getCollection("blog");
}
