import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage("Tags", "Browse all tags across the blog."),
    { headers: { "Content-Type": "image/png" } },
  );
