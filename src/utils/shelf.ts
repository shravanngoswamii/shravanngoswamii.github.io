export type ShelfStatus = "done" | "in-progress" | "wishlist";
export type ShelfType = "book" | "movie" | "series" | "anime" | "game" | "course" | "video" | "documentary" | "sitcom" | "miniseries";

export const SHELF_STATUS: Record<ShelfStatus, { label: string; color: string }> = {
  done: { label: "Done", color: "#34d399" },
  "in-progress": { label: "In Progress", color: "#fbbf24" },
  wishlist: { label: "Wishlist", color: "#818cf8" },
};

export const SHELF_TYPE: Record<ShelfType, { label: string; icon: string }> = {
  book: { label: "Book", icon: "📖" },
  movie: { label: "Movie", icon: "🎬" },
  series: { label: "Series", icon: "📺" },
  anime: { label: "Anime", icon: "⛩️" },
  game: { label: "Game", icon: "🎮" },
  course: { label: "Course", icon: "🎓" },
  video: { label: "Video", icon: "▶️" },
  documentary: { label: "Documentary", icon: "🎥" },
  sitcom: { label: "Sitcom", icon: "😂" },
  miniseries: { label: "Miniseries", icon: "📼" },
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
