export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year < 1000) return `${year} AD`;
  return String(year);
}
