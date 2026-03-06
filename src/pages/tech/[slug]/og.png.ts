import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { AnyPost } from "@types";
import { generateOgImageForPost } from "@utils/generateOgImages";

export async function getStaticPaths() {
  const posts = await getCollection("blog").then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage && data.topic === "tech"),
  );

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as AnyPost), {
    headers: { "Content-Type": "image/png" },
  });
