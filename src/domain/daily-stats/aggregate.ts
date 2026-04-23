import type { DailyStat } from './types';

export interface TrendData {
  date: string;
  impressions: number;
  clicks: number;
}

export function aggregateByDate(stats: DailyStat[]): TrendData[] {
  const map = new Map<string, TrendData>();

  for (const stat of stats) {
    const existing = map.get(stat.date);
    if (existing) {
      existing.impressions += stat.impressions;
      existing.clicks += stat.clicks;
    } else {
      map.set(stat.date, {
        date: stat.date,
        impressions: stat.impressions,
        clicks: stat.clicks,
      });
    }
  }

  // 날짜 기준 오름차순 정렬
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}
