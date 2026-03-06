import { Resvg } from "@resvg/resvg-js";
import type { AnyPost } from "@types";
import type { CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import pageOgImage from "./og-templates/page";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return new Uint8Array(pngData.asPng());
}

export async function generateOgImageForPost(post: AnyPost) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForShelf(entry: CollectionEntry<"shelf">) {
  const adapted = {
    data: { title: entry.data.title, author: entry.data.creator },
  } as unknown as AnyPost;
  const svg = await postOgImage(adapted);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForPage(
  title: string,
  description?: string,
) {
  const svg = await pageOgImage(title, description);
  return svgBufferToPngBuffer(svg);
}
