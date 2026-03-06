import type { AnyPost } from "../types";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: AnyPost[], tag: string) =>
  getSortedPosts(
    posts.filter((post) => slugifyAll(post.data.tags).includes(tag)),
  );

export default getPostsByTag;
