interface TimelineItem {
  date: string;
  title: string;
  description?: string;
}

interface Props {
  items: TimelineItem[];
}

export default function Timeline({ items }: Props) {
  return (
    <div className="not-prose my-8">
      <div className="relative pl-8 border-l border-skin-line/30">
        {items.map((item, i) => (
          <div key={i} className="relative mb-8 last:mb-0">
            <div className="absolute -left-[calc(2rem+4.5px)] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-skin-line/50 bg-skin-fill" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-skin-base/40 mb-1">
              {item.date}
            </div>
            <div
              className="font-serif text-lg text-skin-base mb-1"
              role="heading"
              aria-level={4}
            >
              {item.title}
            </div>
            {item.description && (
              <p className="text-sm text-skin-base/60 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
