import type { ReactNode } from "react";

interface Props {
  author: string;
  source?: string;
  position?: "left" | "inline";
  children: ReactNode;
}

export default function QuoteBlock({
  author,
  source,
  position = "inline",
  children,
}: Props) {
  return (
    <figure
      className="not-prose my-8 relative px-6 py-8 flex flex-col items-center text-center"
      data-position={position}
      data-author={author}
      data-source={source || ""}
    >
      <span
        className="absolute top-0 left-0 text-7xl font-serif leading-none select-none pointer-events-none"
        style={{ color: "rgba(var(--color-text-base), 0.05)" }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <blockquote className="relative z-10 w-full mb-4 !border-l-0 !pl-0">
        <div className="font-serif text-lg sm:text-xl italic text-skin-base/80 leading-relaxed inline-block">
          {children}
        </div>
      </blockquote>
      <figcaption className="relative z-10 flex flex-col items-center gap-1.5 mt-2">
        <span className="w-8 h-[1px] bg-skin-line/40 mb-1"></span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-skin-base/60">
          {author}
        </span>
        {source && (
          <span className="font-mono text-[10px] italic normal-case tracking-normal text-skin-base/40">
            — {source}
          </span>
        )}
      </figcaption>
      <span
        className="absolute bottom-0 right-0 text-7xl font-serif leading-none flex items-end select-none pointer-events-none translate-y-4"
        style={{ color: "rgba(var(--color-text-base), 0.05)" }}
        aria-hidden="true"
      >
        &rdquo;
      </span>
    </figure>
  );
}
