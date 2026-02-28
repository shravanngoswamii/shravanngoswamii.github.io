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
      className="not-prose my-8"
      data-position={position}
      data-author={author}
      data-source={source || ""}
    >
      <blockquote className="relative px-8 sm:px-10 py-6">
        <span
          className="absolute top-2 left-2 text-5xl font-serif leading-none select-none pointer-events-none"
          style={{ color: "rgba(var(--color-text-base), 0.06)" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div className="font-serif text-lg sm:text-xl italic text-skin-base/80 leading-relaxed">
          {children}
        </div>
        <span
          className="absolute bottom-1 right-3 text-5xl font-serif leading-none select-none pointer-events-none"
          style={{ color: "rgba(var(--color-text-base), 0.06)" }}
          aria-hidden="true"
        >
          &rdquo;
        </span>
      </blockquote>
      <figcaption className="mt-3 px-8 sm:px-10 flex items-center gap-2">
        <span className="w-6 h-[1px] bg-skin-line/40"></span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-skin-base/50">
          {author}
        </span>
        {source && (
          <span className="font-mono text-[10px] italic normal-case tracking-normal text-skin-base/30">
            — {source}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
