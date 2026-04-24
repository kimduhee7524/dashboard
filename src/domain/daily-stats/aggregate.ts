import type { Campaign, Platform } from '../campaign/types';
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

export interface PlatformData {
  platform: Platform;
  cost: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export function aggregateByPlatform(
  campaigns: Campaign[],
  stats: DailyStat[]
): PlatformData[] {
  const map = new Map<Platform, PlatformData>();

  const platforms: Platform[] = ['Google', 'Meta', 'Naver'];
  for (const p of platforms) {
    map.set(p, {
      platform: p,
      cost: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
    });
  }

  const campaignPlatformMap = new Map<string, Platform>();
  for (const c of campaigns) {
    campaignPlatformMap.set(c.id, c.platform);
  }

  for (const stat of stats) {
    const platform = campaignPlatformMap.get(stat.campaignId);
    if (!platform) continue;

    const data = map.get(platform)!;
    data.cost += stat.cost;
    data.impressions += stat.impressions;
    data.clicks += stat.clicks;
    data.conversions += stat.conversions;
  }

  return Array.from(map.values());
}
