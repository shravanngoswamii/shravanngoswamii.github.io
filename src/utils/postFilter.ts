import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isFuturePost =
    Date.now() < new Date(data.pubDatetime).getTime();
  return !data.draft && (import.meta.env.DEV || isFuturePost);
};

export default postFilter;
