export function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }
  return numerator / denominator;
}

export function sortRankings<T extends Record<string, unknown>>(
  data: T[],
  metric: keyof T,
  order: 'asc' | 'desc'
): T[] {
  return [...data].sort((a, b) => {
    const valA = Number(a[metric]) || 0;
    const valB = Number(b[metric]) || 0;

    if (order === 'asc') {
      if (valA === 0 && valB === 0) return 0;
      if (valA === 0) return 1;
      if (valB === 0) return -1;
      return valA - valB;
    } else {
      return valB - valA;
    }
  });
}
