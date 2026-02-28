import type { APIRoute } from "astro";
import { generateOgImageForPage } from "@utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response(
    await generateOgImageForPage(
      "Shelf",
      "Books, films, series, and other media — rated, reviewed, and shelved.",
    ),
    { headers: { "Content-Type": "image/png" } },
  );
