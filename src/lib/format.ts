export function formatCurrency(
  value: number,
  includeSymbol: boolean = true
): string {
  const formatted = new Intl.NumberFormat('ko-KR').format(value);
  return includeSymbol ? `₩${formatted}` : formatted;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
