import type { DailyStat, RawDailyStat } from './types';

function sanitizeDailyStat(raw: RawDailyStat): DailyStat {
  return {
    id: raw.id,
    campaignId: raw.campaignId,
    date: raw.date,
    impressions: raw.impressions ?? 0,
    clicks: raw.clicks ?? 0,
    conversions: raw.conversions ?? 0,
    cost: raw.cost ?? 0,
    conversionsValue: raw.conversionsValue,
  };
}

/**
 * 캠페인+날짜 중복 시, id가 가장 큰 최신 레코드만 유지
 * id가 증가형 식별자라는 가정하에 동작합니다.
 */
function isNewerDailyStat(candidate: DailyStat, existing: DailyStat): boolean {
  return (
    candidate.id.localeCompare(existing.id, undefined, { numeric: true }) > 0
  );
}

export function normalizeDailyStats(rawStats: RawDailyStat[]): DailyStat[] {
  const map = new Map<string, DailyStat>();

  for (const raw of rawStats) {
    const stat = sanitizeDailyStat(raw);
    const key = `${stat.campaignId}_${stat.date}`;
    const existing = map.get(key);

    if (!existing || isNewerDailyStat(stat, existing)) {
      map.set(key, stat);
    }
  }

  return Array.from(map.values());
}
