import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { AnyPost } from "@types";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { getPostSlug } from "@utils/collections";

export async function getStaticPaths() {
  const posts = await getCollection("blog").then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage && data.topic === "cinema"),
  );

  return posts.map((post) => ({
    params: { slug: getPostSlug(post) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as AnyPost), {
    headers: { "Content-Type": "image/png" },
  });
