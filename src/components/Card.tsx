import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { TbArrowUpRight } from "react-icons/tb";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  index?: number;
  secHeading?: boolean;
  relatedPublications?: { title: string; url?: string }[];
}

export default function Card({ href, frontmatter, index = 1, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  // Format index to look like "01", "02" for a cleaner, bolder look
  const formattedIndex = index.toString().padStart(2, '0');

  return (
    <a href={href} className="group block w-full relative border-t border-skin-line/20 first:border-t-0">
      
      <div className="py-8 grid grid-cols-12 gap-4 items-baseline relative z-10 transition-all duration-500 ease-out group-hover:bg-skin-fill/50">
        
        {/* COL 1: KINETIC INDEX (The "Magic" Interaction) */}
        {/* Resting: Shows Number. Hover: Slides Number up, Arrow slides up from bottom */}
        <div className="col-span-2 md:col-span-1 hidden md:flex justify-start items-center h-full pl-2">
          <div className="relative overflow-hidden h-6 w-full">
            <span className="absolute inset-0 font-mono text-xs text-skin-base/40 tracking-widest transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
              ({formattedIndex})
            </span>
            <TbArrowUpRight className="absolute inset-0 h-4 w-4 text-skin-base transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0" />
          </div>
        </div>

        {/* COL 2: Main Content - Shifts Right on Hover */}
        <div className="col-span-12 md:col-span-8 pr-8 transition-transform duration-500 ease-out group-hover:translate-x-2">
           <h3 className="text-2xl sm:text-3xl font-serif text-skin-base mb-3 leading-none transition-all duration-300 group-hover:italic" style={{ viewTransitionName: slugifyStr(title) }}>
             {title}
           </h3>
           
           <p className="text-sm text-skin-base/60 font-light leading-relaxed max-w-lg transition-colors duration-300 group-hover:text-skin-base/80">
            {description}
           </p>
        </div>

        {/* COL 3: Editorial Meta Data */}
        <div className="col-span-12 md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between gap-2 mt-4 md:mt-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          
          <div className="text-xs font-mono text-skin-base/40 uppercase tracking-widest">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          </div>
          
          {/* Swiss-style Tags (Text only, slash separated) */}
          <div className="hidden md:flex flex-wrap justify-end gap-x-2 text-[10px] font-mono uppercase tracking-widest text-skin-base/40">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={tag} className="flex gap-2">
                {i > 0 && <span className="opacity-30">/</span>}
                <span className="group-hover:text-skin-base transition-colors duration-300">{tag}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </a>
  );
}
