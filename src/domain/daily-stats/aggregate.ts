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

  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function aggregateByCampaign(
  stats: DailyStat[]
): Map<string, DailyStat[]> {
  const map = new Map<string, DailyStat[]>();

  for (const stat of stats) {
    const existing = map.get(stat.campaignId);
    if (existing) {
      existing.push(stat);
    } else {
      map.set(stat.campaignId, [stat]);
    }
  }

  return map;
}
