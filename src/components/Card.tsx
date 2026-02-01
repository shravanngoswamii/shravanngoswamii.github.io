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
    <li className="my-4 group">
      <a
        href={href}
        className="block p-6 bg-skin-card rounded-xl border border-skin-line/40 shadow-sm hover:shadow-md hover:border-skin-accent/40 transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex flex-col gap-3">
          {/* Header & Date */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            {secHeading ? (
              <h2 className="text-xl font-bold font-serif text-skin-base group-hover:text-skin-accent transition-colors duration-200" style={{ viewTransitionName: slugifyStr(title) }}>
                {title}
              </h2>
            ) : (
              <h3 className="text-xl font-bold font-serif text-skin-base group-hover:text-skin-accent transition-colors duration-200" style={{ viewTransitionName: slugifyStr(title) }}>
                {title}
              </h3>
            )}
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} className="shrink-0 text-skin-base/60 text-xs" />
          </div>

          <p className="text-sm text-skin-base/80 leading-relaxed line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-skin-line/10">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-skin-card-muted text-skin-base/70 group-hover:text-skin-accent transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && <span className="text-xs text-skin-base/50">+{tags.length - 3}</span>}
              </div>
            )}
            
            {/* Read More Arrow (Visual Cue) */}
            <div className="text-skin-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </div>
          </div>
        </div>
      </a>
      
      {/* Related Publications (Outside clickable card to prevent nested links, but visually connected) */}
      {relatedPublications.length > 0 && (
        <div className="mx-4 px-4 py-2 bg-skin-card-muted/50 rounded-b-lg border-x border-b border-skin-line/20 -mt-1 text-xs">
          <span className="font-bold text-skin-base/50 uppercase tracking-wider mr-2">
            Publication:
          </span>
          <ul className="inline-flex flex-wrap gap-x-4">
            {relatedPublications.map((pub, index) => (
              <li key={index} className="inline-flex items-center gap-1 group/pub">
                 <TbBook className="h-3 w-3 text-skin-base/50 group-hover/pub:text-skin-accent" />
                 {pub.url ? (
                   <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-skin-accent hover:underline decoration-dashed" dangerouslySetInnerHTML={{ __html: pub.title }} />
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
