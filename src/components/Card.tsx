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

  return (
    <li className="my-8 group relative">
      <div className="absolute -inset-4 rounded-xl bg-skin-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <a
        href={href}
        className="block relative p-8 bg-transparent border-l border-skin-line/50 hover:border-skin-accent transition-colors duration-500 pl-6"
      >
        <div className="flex flex-col gap-3">
          {/* Header & Date */}
          <div className="flex flex-col gap-2">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} className="text-skin-base/50 text-xs font-mono tracking-widest uppercase" />
            
            {secHeading ? (
              <h2 className="text-2xl font-serif font-medium text-skin-base group-hover:text-skin-accent transition-colors duration-300 leading-tight" style={{ viewTransitionName: slugifyStr(title) }}>
                {title}
              </h2>
            ) : (
              <h3 className="text-2xl font-serif font-medium text-skin-base group-hover:text-skin-accent transition-colors duration-300 leading-tight" style={{ viewTransitionName: slugifyStr(title) }}>
                {title}
              </h3>
            )}
          </div>

          <p className="text-base text-skin-base/70 font-light leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between mt-4">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-skin-base/40 group-hover:text-skin-accent transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-skin-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
               <span className="text-xs font-mono tracking-widest uppercase">Read</span>
            </div>
          </div>
        </div>
      </a>
      
      {relatedPublications.length > 0 && (
        <div className="ml-6 mt-2 pl-4 border-l border-dashed border-skin-line/30 text-xs">
          <ul className="flex flex-col gap-1">
            {relatedPublications.map((pub, index) => (
              <li key={index} className="flex items-center gap-2 text-skin-base/40 group/pub">
                 <TbBook className="h-3 w-3" />
                 {pub.url ? (
                   <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-skin-accent transition-colors italic" dangerouslySetInnerHTML={{ __html: pub.title }} />
                 ) : (
                   <span className="italic" dangerouslySetInnerHTML={{ __html: pub.title }} />
                 )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
