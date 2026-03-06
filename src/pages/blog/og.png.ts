import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "Blog",
      "All posts across tech, cinema, and philosophy.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
