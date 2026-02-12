import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { TbArrowUpRight } from "react-icons/tb";
import type { MouseEvent } from "react";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  index?: number;
  secHeading?: boolean;
  relatedPublications?: { title: string; url?: string }[];
}

export default function Card({ href, frontmatter, index = 1 }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  // Format index to look like "01", "02" for a cleaner, bolder look
  const formattedIndex = index.toString().padStart(2, '0');

  return (
    <a href={href} className="group block w-full relative border-t border-skin-line/20 first:border-t-0">
      
      <div className="py-8 flex flex-col md:flex-row md:items-baseline gap-4 relative z-10 transition-colors duration-500 ease-out group-hover:bg-skin-fill/50">
        
        {/* COL 1: KINETIC INDEX */}
        <div className="hidden md:flex w-12 shrink-0 justify-start items-center pl-2">
          <div className="relative overflow-hidden h-6 w-full">
            <span className="absolute inset-0 font-mono text-xs text-skin-base/40 tracking-widest transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              ({formattedIndex})
            </span>
            <TbArrowUpRight className="absolute inset-0 h-4 w-4 text-skin-base transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0" />
          </div>
        </div>

        {/* COL 2: Main Content */}
        <div className="flex-1 min-w-0 pr-4 md:pr-8 transition-transform duration-500 ease-out group-hover:translate-x-2">
           <h3 className="text-2xl sm:text-3xl font-serif text-skin-base mb-3 leading-tight transition-colors duration-300" style={{ viewTransitionName: slugifyStr(title) }}>
             {title}
           </h3>
           
           <p className="text-sm text-skin-base/70 font-normal leading-relaxed transition-colors duration-300 group-hover:text-skin-base/90">
            {description}
           </p>
        </div>

        {/* COL 3: Editorial Meta Data */}
        <div className="flex flex-row md:flex-col items-center md:items-end md:w-52 md:shrink-0 justify-between gap-2 mt-4 md:mt-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          
          <div className="text-xs font-mono text-skin-base/40 uppercase tracking-widest whitespace-nowrap">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          </div>
          
          {/* Swiss-style Tags (Text only, slash separated) */}
          <div className="hidden md:flex flex-wrap justify-end gap-x-2 text-[10px] font-mono uppercase tracking-widest text-skin-base/40">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={tag} className="flex gap-2">
                {i > 0 && <span className="opacity-30">/</span>}
                <a
                  href={`/tags/${slugifyStr(tag)}/`}
                  className="relative z-20 hover:text-skin-accent group-hover:text-skin-base transition-colors duration-300"
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                >{tag}</a>
              </span>
            ))}
          </div>
        </div>

      </div>
    </a>
  );
}
