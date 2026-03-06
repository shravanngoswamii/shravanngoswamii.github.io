import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "Projects",
      "Open-source projects, hackathon entries, and tools built by Shravan Goswami.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
