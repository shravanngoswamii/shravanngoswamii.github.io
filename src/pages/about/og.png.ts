import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "About",
      "Learn more about Shravan Goswami — software developer, open-source contributor, and the person behind this blog.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
