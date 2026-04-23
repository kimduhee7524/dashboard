export function isDateRangeOverlapping(
  campaignStart: string,
  campaignEnd: string | null,
  filterStart: string,
  filterEnd: string
): boolean {
  if (!filterStart || !filterEnd) {
    return true;
  }

  return (
    campaignStart <= filterEnd &&
    (campaignEnd === null || campaignEnd >= filterStart)
  );
}

export function matchesArrayFilter<T>(itemValue: T, filterArray: T[]): boolean {
  if (filterArray.length === 0) {
    return true;
  }
  return filterArray.includes(itemValue);
}
