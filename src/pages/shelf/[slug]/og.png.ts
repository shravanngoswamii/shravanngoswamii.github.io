import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { generateOgImageForShelf } from "@utils/generateOgImages";
import { stripExt } from "@utils/shelf";

export async function getStaticPaths() {
  const items = await getCollection("shelf");
  return items.map((entry) => ({
    params: { slug: stripExt(entry.id) },
    props: entry,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForShelf(props as CollectionEntry<"shelf">),
    {
      headers: { "Content-Type": "image/png" },
    },
  );
