import { useMemo } from 'react';
import { useTableData, type CampaignTableRow } from './useTableData';
import { sortRankings } from '@/lib/math';

export type Top3MetricKey = 'roas' | 'ctr' | 'cpc';

export interface Top3DataResult {
  top3: CampaignTableRow[];
  maxMetricValue: number;
}

export function useTop3Data(metric: Top3MetricKey): Top3DataResult {
  const { rows } = useTableData();

  return useMemo(() => {
    const order = metric === 'cpc' ? 'asc' : 'desc';
    const sorted = sortRankings(rows, metric, order);
    const top3 = sorted.slice(0, 3);

    let maxMetricValue = 0;
    if (top3.length > 0) {
      if (metric === 'cpc') {
        maxMetricValue = Math.max(...top3.map((item) => item[metric]));
      } else {
        maxMetricValue = top3[0][metric];
      }
    }

    return {
      top3,
      maxMetricValue,
    };
  }, [rows, metric]);
}
