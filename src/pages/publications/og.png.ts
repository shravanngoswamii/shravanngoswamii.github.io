import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "Publications",
      "Research publications and academic work by Shravan Goswami.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
