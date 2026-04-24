import { useMemo } from 'react';
import { useTableData, type CampaignTableRow } from './useTableData';
import { sortRankings } from '@/lib/math';

export type Top3MetricKey = 'roas' | 'ctr' | 'cpc';

export interface Top3Campaign extends CampaignTableRow {
  widthPercent: number;
}

export function useTop3Data(metric: Top3MetricKey): Top3Campaign[] {
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

    const top3WithPercent = top3.map((item) => {
      const val = item[metric];
      const widthPercent =
        maxMetricValue === 0 ? 0 : Math.min((val / maxMetricValue) * 100, 100);

      return {
        ...item,
        widthPercent,
      };
    });

    return top3WithPercent;
  }, [rows, metric]);
}
