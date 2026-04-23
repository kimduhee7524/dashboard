import type { DailyStat, RawDailyStat } from './types';

export function normalizeDailyStats(rawStats: RawDailyStat[]): DailyStat[] {
  const uniqueMap = new Map<string, DailyStat>();

  rawStats.forEach((stat) => {
    const key = `${stat.campaignId}_${stat.date}`;

    // 중복 제거: (campaignId, date) 기준으로 첫 번째 항목만 유지
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, {
        id: stat.id,
        campaignId: stat.campaignId,
        date: stat.date,
        impressions: stat.impressions ?? 0,
        clicks: stat.clicks ?? 0,
        conversions: stat.conversions ?? 0,
        cost: stat.cost ?? 0,
        conversionsValue: stat.conversionsValue,
      });
    }
  });

  return Array.from(uniqueMap.values());
}
