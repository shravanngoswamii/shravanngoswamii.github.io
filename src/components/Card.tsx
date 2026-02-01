import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { TbArrowUpRight } from "react-icons/tb";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  index?: number; // Added Index for the "List Number" look
  secHeading?: boolean;
  relatedPublications?: { title: string; url?: string }[];
}

export default function Card({ href, frontmatter, index = 1, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  // Format index to look like "001", "002"
  const formattedIndex = index.toString().padStart(3, '0');

  return (
    <a href={href} className="group block w-full relative">
      {/* Hover Line Highlight */}
      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-skin-line/20 group-hover:bg-skin-text-base transition-colors duration-500" />
      
      <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start relative z-10">
        
        {/* COL 1: Index Number (The "Spec" ID) */}
        <div className="md:col-span-1 hidden md:block">
          <span className="font-mono text-[10px] text-skin-base/30 tracking-widest group-hover:text-skin-base transition-colors">
            {formattedIndex}
          </span>
        </div>

        {/* COL 2: Main Content */}
        <div className="md:col-span-8 pr-8">
           <div className="flex items-baseline gap-4 mb-2">
              <h3 className="text-xl sm:text-2xl font-serif text-skin-base group-hover:text-skin-base leading-tight transition-colors" style={{ viewTransitionName: slugifyStr(title) }}>
                {title}
              </h3>
              <TbArrowUpRight className="w-4 h-4 text-skin-base/20 group-hover:text-skin-base group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
           </div>
           
           <p className="text-sm text-skin-base/60 font-light leading-relaxed max-w-xl group-hover:text-skin-base/80 transition-colors">
            {description}
           </p>
        </div>

        {/* COL 3: Meta Data (Right Aligned) */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
          <div className="text-xs font-mono text-skin-base/40 uppercase tracking-widest">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          </div>
          
          <div className="flex flex-wrap justify-end gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 border border-skin-line/30 rounded-full text-skin-base/40 font-mono uppercase tracking-widest group-hover:border-skin-line/80 group-hover:text-skin-base transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
