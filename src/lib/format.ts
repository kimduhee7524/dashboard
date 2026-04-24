import type { MetricKey } from '@/domain/daily-stats/types';
import type { Top3MetricKey } from '@/hooks/useTop3Data';

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

export function formatPlatformMetricValue(
  val: number,
  metric: MetricKey
): string {
  if (metric === 'cost') return formatCurrency(val);
  return new Intl.NumberFormat('ko-KR').format(val);
}

export function getPlatformMetricLabel(metric: MetricKey): string {
  if (metric === 'cost') return '비용';
  if (metric === 'impressions') return '노출수';
  if (metric === 'clicks') return '클릭수';
  return '전환수';
}

export function formatTop3MetricValue(
  val: number,
  metric: Top3MetricKey
): string {
  if (metric === 'cpc') return new Intl.NumberFormat('ko-KR').format(val);
  return val.toFixed(2);
}
