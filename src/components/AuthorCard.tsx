import { useState, useRef, useEffect, type JSX } from "react";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbMail,
  TbWorld,
} from "react-icons/tb";
import authorsData from "@data/authors.json";
import { withBase } from "@utils/base";

type AuthorSocial = { name: string; href: string };
type AuthorInfo = {
  name: string;
  nickname: string;
  image: string;
  role: string;
  socials: AuthorSocial[];
  sponsor?: string;
};

const SOCIAL_ICON_MAP: Record<
  string,
  (props: { className?: string }) => JSX.Element
> = {
  Github: (p) => <TbBrandGithub {...p} />,
  LinkedIn: (p) => <TbBrandLinkedin {...p} />,
  Twitter: (p) => <TbBrandTwitter {...p} />,
  Mail: (p) => <TbMail {...p} />,
  Website: (p) => <TbWorld {...p} />,
};

function slugifyAuthor(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getAuthor(displayName: string): AuthorInfo | null {
  const slug = slugifyAuthor(displayName);
  const data = authorsData as Record<string, AuthorInfo>;
  if (data[slug]) return data[slug];
  for (const key of Object.keys(data)) {
    const a = data[key];
    if (
      a.nickname.toLowerCase() === displayName.toLowerCase() ||
      a.name.toLowerCase() === displayName.toLowerCase()
    ) {
      return a;
    }
  }
  return null;
}

export default function AuthorCard({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const author = getAuthor(name);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Show above if there isn't enough space below, but there is space above.
      // Otherwise, default to showing below.
      setAbove(spaceBelow < 150 && spaceAbove > 150);
    }
  }, [open]);

  if (!author) {
    return <span className={className}>{name}</span>;
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className={`cursor-pointer underline decoration-dotted underline-offset-2 decoration-skin-line/40 hover:decoration-skin-accent transition-colors ${className}`}
      >
        {name}
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className={`absolute z-50 ${above ? "bottom-full mb-3" : "top-full mt-3"} left-0 w-64`}
        >
          <div className="bg-skin-fill border border-skin-line/30 rounded-md shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 p-3">
              <img
                src={withBase(author.image)}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-skin-line/20"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-skin-base truncate leading-tight">
                  {author.name}
                </h4>
                <span className="text-[11px] text-skin-base/50 leading-tight">
                  {author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-3 py-2 border-t border-skin-line/15 bg-skin-card-muted/50">
              <div className="flex items-center gap-2">
                {author.socials.map((s) => {
                  const IconFn = SOCIAL_ICON_MAP[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className="text-skin-base/40 hover:text-skin-accent transition-colors"
                    >
                      {IconFn ? (
                        <IconFn className="w-3.5 h-3.5" />
                      ) : (
                        <TbWorld className="w-3.5 h-3.5" />
                      )}
                    </a>
                  );
                })}
              </div>

              {author.sponsor && (
                <a
                  href={author.sponsor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-skin-base/40 hover:text-skin-accent transition-colors"
                >
                  💖 Sponsor
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
