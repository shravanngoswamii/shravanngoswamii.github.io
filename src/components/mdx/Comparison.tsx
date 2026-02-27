import type { ReactNode } from "react";

interface SideProps {
  label: string;
  children: ReactNode;
}

export function ComparisonSide({ label, children }: SideProps) {
  return (
    <div className="p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-skin-base/40 mb-3 pb-2 border-b border-skin-line/10">
        {label}
      </div>
      <div className="text-sm text-skin-base/80 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

interface Props {
  children: ReactNode;
}

export default function Comparison({ children }: Props) {
  return (
    <div className="not-prose my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-skin-line/20 rounded-sm overflow-hidden [&>div]:border-b [&>div]:sm:border-b-0 [&>div:first-child]:sm:border-r [&>div:last-child]:border-b-0 [&>div]:border-skin-line/20">
        {children}
      </div>
    </div>
  );
}
