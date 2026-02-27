interface Props {
  label: string;
  value: number;
  max?: number;
  showPercent?: boolean;
}

export default function Progress({ label, value, max = 100, showPercent = true }: Props) {
  const percent = Math.round((value / max) * 100);

  return (
    <div className="not-prose my-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-skin-base/70">
          {label}
        </span>
        {showPercent && (
          <span className="font-mono text-[11px] text-skin-base/40">{percent}%</span>
        )}
      </div>
      <div className="w-full h-1.5 bg-skin-card-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-skin-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
