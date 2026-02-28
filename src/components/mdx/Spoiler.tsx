import type { ReactNode } from "react";

interface Props {
  label?: string;
  position?: "left" | "inline";
  children: ReactNode;
}

export default function Spoiler({
  label = "Reveal spoiler",
  position = "inline",
  children,
}: Props) {
  const id = `spoiler-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div
      className="not-prose my-6 relative rounded-sm border border-skin-line/20 overflow-hidden"
      data-position={position}
      data-component="spoiler"
    >
      <input type="checkbox" id={id} className="peer sr-only" />
      <div className="p-5 text-sm text-skin-base/80 leading-relaxed blur-md select-none peer-checked:blur-0 peer-checked:select-auto transition-all duration-500">
        {children}
      </div>
      <label
        htmlFor={id}
        className="absolute inset-0 flex items-center justify-center bg-skin-fill/60 backdrop-blur-sm cursor-pointer peer-checked:opacity-0 peer-checked:pointer-events-none transition-all duration-500"
      >
        <span className="flex items-center gap-2 px-5 py-2.5 border border-skin-line/40 rounded-sm bg-skin-fill hover:bg-skin-card-muted transition-colors font-mono text-[11px] uppercase tracking-widest text-skin-base/70 hover:text-skin-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {label}
        </span>
      </label>
    </div>
  );
}
