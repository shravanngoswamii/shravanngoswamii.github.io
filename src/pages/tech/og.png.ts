import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";
import { COLLECTION_META } from "@utils/collections";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage("Tech", COLLECTION_META.tech.description),
    { headers: { "Content-Type": "image/png" } },
  );
