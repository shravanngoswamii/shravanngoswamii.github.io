import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "Resume",
      "Shravan Goswami's resume — education, experience, skills, and recent work.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
