import type { DailyStat } from '@/domain/daily-stats/types';
import { safeDivide } from '@/lib/math';

export interface CampaignMetrics {
  ctr: number;
  cpc: number;
  roas: number;
  totalCost: number;
}

export function calcMetrics(stats: DailyStat[]): CampaignMetrics {
  if (stats.length === 0) {
    return { ctr: 0, cpc: 0, roas: 0, totalCost: 0 };
  }

  let totalImpressions = 0;
  let totalClicks = 0;
  let totalCost = 0;

  let roasCost = 0;
  let totalConversionsValue = 0;

  for (const stat of stats) {
    totalImpressions += stat.impressions;
    totalClicks += stat.clicks;
    totalCost += stat.cost;

    if (stat.conversionsValue !== null) {
      roasCost += stat.cost;
      totalConversionsValue += stat.conversionsValue;
    }
  }

  const ctr = safeDivide(totalClicks, totalImpressions) * 100;
  const cpc = Math.round(safeDivide(totalCost, totalClicks));
  const roas = safeDivide(totalConversionsValue, roasCost) * 100;

  return {
    ctr,
    cpc,
    roas,
    totalCost,
  };
}
