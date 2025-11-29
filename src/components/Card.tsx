import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { TbBook } from "react-icons/tb";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  relatedPublications?: { title: string; url?: string }[];
}

export default function Card({ href, frontmatter, secHeading = true, relatedPublications = [] }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-bold decoration-dashed hover:underline",
  };

  return (
    <li className="my-2 py-2 border-b border-skin-line/10 last:border-none">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-1">
        <a
          href={href}
          className="inline-block text-lg font-bold text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0 flex-1"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} className="shrink-0" />
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/tags/${slugifyStr(tag)}/`}
              className="text-xs font-medium text-skin-base/60 hover:text-skin-accent decoration-dashed underline-offset-4 hover:underline transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}

      <p className="text-sm text-skin-base/80 leading-relaxed mb-2">{description}</p>
      
      {relatedPublications.length > 0 && (
        <div className="mt-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-skin-base/50 mb-1 block">
            My Associated Publication{relatedPublications.length > 1 ? "s" : ""}
          </span>
          <ul className="space-y-1">
            {relatedPublications.map((pub, index) => (
              <li key={index} className="flex items-start gap-2 text-xs group">
                 <TbBook className="h-3.5 w-3.5 text-skin-base/50 shrink-0 mt-0.5 group-hover:text-skin-accent transition-colors" />
                 {pub.url ? (
                   <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-dashed underline-offset-4 text-skin-base/70 hover:text-skin-accent transition-colors" dangerouslySetInnerHTML={{ __html: pub.title }} />
                 ) : (
                   <span className="text-skin-base/70" dangerouslySetInnerHTML={{ __html: pub.title }} />
                 )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
