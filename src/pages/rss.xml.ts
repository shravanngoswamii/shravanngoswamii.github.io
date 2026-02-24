import rss from "@astrojs/rss";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import { getAllPosts, getPostUrl } from "@utils/collections";

export async function GET() {
  const allPosts = await getAllPosts();
  const sortedPosts = getSortedPosts(allPosts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map((post) => ({
      link: getPostUrl(post),
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
    })),
  });
}
