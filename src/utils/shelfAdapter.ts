import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import type { BlogCollection } from "../types";
import { stripExt } from "./shelf";

export interface ShelfListingItem {
  kind: "shelf";
  id: string;
  slug: string;
  collection: BlogCollection;
  href: string;
  data: {
    title: string;
    pubDatetime: Date;
    modDatetime: null;
    description: string;
    tags: string[];
    draft: false;
    featured: false;
    author: string;
    shelf: string[];
    aliases: string[];
    crossTopics: BlogCollection[];
    toc: boolean;
    shelfMeta: {
      type: string;
      creator: string;
      rating?: number;
      year?: number;
      poster?: string;
    };
  };
}

export function shelfToListingItem(
  item: CollectionEntry<"shelf">,
  category: BlogCollection
): ShelfListingItem {
  const slug = stripExt(item.id);
  return {
    kind: "shelf",
    id: item.id,
    slug,
    collection: category,
    href: `/shelf/${slug}/`,
    data: {
      title: item.data.title,
      pubDatetime: item.data.pubDatetime!,
      modDatetime: null,
      description:
        item.data.description ||
        `${item.data.title} by ${item.data.creator}`,
      tags: item.data.tags ?? [],
      draft: false,
      featured: false,
      author: "",
      shelf: [],
      aliases: [],
      crossTopics: item.data.categories as BlogCollection[],
      toc: true,
      shelfMeta: {
        type: item.data.type,
        creator: item.data.creator,
        rating: item.data.rating,
        year: item.data.year,
        poster: item.data.poster,
      },
    },
  };
}

export async function getDoneShelfItems(
  category?: BlogCollection
): Promise<ShelfListingItem[]> {
  const shelf = await getCollection("shelf");
  return shelf
    .filter(
      (i) =>
        i.data.status === "done" &&
        i.data.pubDatetime &&
        (!category || i.data.categories.includes(category))
    )
    .map((i) => shelfToListingItem(i, category ?? (i.data.categories[0] as BlogCollection)));
}

export type MergedItem =
  | (CollectionEntry<"tech"> & { kind?: undefined })
  | (CollectionEntry<"cinema"> & { kind?: undefined })
  | (CollectionEntry<"philosophy"> & { kind?: undefined })
  | ShelfListingItem;

export function sortMergedItems(items: MergedItem[]): MergedItem[] {
  return items.sort(
    (a, b) =>
      new Date(b.data.pubDatetime).getTime() -
      new Date(a.data.pubDatetime).getTime()
  );
}
