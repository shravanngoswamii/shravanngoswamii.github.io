export type ShelfStatus = "done" | "in-progress" | "wishlist";
export type ShelfType = "book" | "movie" | "series" | "anime" | "game" | "course" | "video" | "documentary" | "sitcom" | "miniseries";

export const stripExt = (id: string) => {
  const name = id.split("/").pop() || id;
  return name.replace(/\.(md|mdx)$/, "");
};

export const SHELF_STATUS: Record<ShelfStatus, { label: string; color: string }> = {
  done: { label: "Done", color: "#34d399" },
  "in-progress": { label: "In Progress", color: "#fbbf24" },
  wishlist: { label: "Wishlist", color: "#818cf8" },
};

export const SHELF_TYPE: Record<ShelfType, { label: string; icon: string }> = {
  book: { label: "Book", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>` },
  movie: { label: "Movie", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>` },
  series: { label: "Series", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>` },
  anime: { label: "Anime", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 19h20L12 2z"/><circle cx="9" cy="14" r="1.5"/><circle cx="15" cy="14" r="1.5"/></svg>` },
  game: { label: "Game", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>` },
  course: { label: "Course", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>` },
  video: { label: "Video", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>` },
  documentary: { label: "Documentary", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>` },
  sitcom: { label: "Sitcom", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><path d="M9 18c.83.67 1.83 1 3 1s2.17-.33 3-1"/></svg>` },
  miniseries: { label: "Miniseries", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><line x1="8" y1="4" x2="8" y2="8"/><line x1="16" y1="4" x2="16" y2="8"/></svg>` },
};

const COVER_PALETTES: [string, string][] = [
  ["#1e1b4b", "#4338ca"],
  ["#4c1d95", "#7c3aed"],
  ["#831843", "#db2777"],
  ["#9f1239", "#e11d48"],
  ["#7f1d1d", "#dc2626"],
  ["#78350f", "#d97706"],
  ["#365314", "#65a30d"],
  ["#064e3b", "#059669"],
  ["#134e4a", "#14b8a6"],
  ["#164e63", "#0891b2"],
  ["#0c4a6e", "#0284c7"],
  ["#1e3a5f", "#3b82f6"],
  ["#312e81", "#6366f1"],
  ["#581c87", "#a855f7"],
  ["#701a75", "#c026d3"],
  ["#44403c", "#78716c"],
  ["#1c1917", "#57534e"],
  ["#422006", "#92400e"],
  ["#0f172a", "#334155"],
  ["#1a2e05", "#4d7c0f"],
  ["#2e1065", "#7e22ce"],
  ["#500724", "#be123c"],
  ["#052e16", "#15803d"],
  ["#082f49", "#0369a1"],
];

export function getCoverGradient(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % COVER_PALETTES.length;
  const [from, to] = COVER_PALETTES[idx];
  const angle = 135 + (Math.abs(hash >> 8) % 45);
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`;
}
