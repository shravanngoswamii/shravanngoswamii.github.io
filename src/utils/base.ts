export const withBase = (path: string): string => {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//")
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
};
