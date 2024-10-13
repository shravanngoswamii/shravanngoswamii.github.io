import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  // Create a new property for the post
  if (data.draft) {
    return false; // Don't show drafts
  }

  if (import.meta.env.DEV || isPublishTimePassed) {
    return data; // Return the post data if it's published or in development
  } else {
    // Post is scheduled for the future, add a "Scheduled" tag
    return {
      ...data,
      tags: [...(data.tags || []), "Scheduled"], // Add "Scheduled" tag
    };
  }
};

export default postFilter;
