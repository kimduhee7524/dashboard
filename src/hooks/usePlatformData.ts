import { useMemo } from 'react';
import { useFilteredData } from './useFilteredData';
import {
  aggregateByPlatform,
  type PlatformData,
} from '@/domain/daily-stats/aggregate';
import { safeDivide } from '@/lib/math';
import type { MetricKey } from '@/domain/daily-stats/types';

export interface PlatformDataWithPercent extends PlatformData {
  percent: number;
}

export function usePlatformData(metric: MetricKey) {
  const { filteredCampaigns, filteredDailyStats } = useFilteredData();

  return useMemo(() => {
    const platformData = aggregateByPlatform(
      filteredCampaigns,
      filteredDailyStats
    );

    const total = platformData.reduce((sum, item) => sum + item[metric], 0);

    const withPercent: PlatformDataWithPercent[] = platformData.map((item) => ({
      ...item,
      percent: safeDivide(item[metric], total) * 100,
    }));

    return {
      data: withPercent,
      total,
    };
  }, [filteredCampaigns, filteredDailyStats, metric]);
}
