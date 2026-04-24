import { useMemo } from 'react';
import { useFilteredData } from './useFilteredData';
import { aggregateByCampaign } from '@/domain/daily-stats/aggregate';
import { calcMetrics } from '@/domain/campaign/metrics';
import type { CampaignMetrics } from '@/domain/campaign/metrics';
import type { Campaign } from '@/domain/campaign/types';

export interface CampaignTableRow extends Campaign, CampaignMetrics {}

export function useTableData() {
  const { filteredCampaigns, filteredDailyStats } = useFilteredData();

  const rows = useMemo(() => {
    const statsByCampaign = aggregateByCampaign(filteredDailyStats);

    return filteredCampaigns.map((campaign) => {
      const stats = statsByCampaign.get(campaign.id) || [];
      const metrics = calcMetrics(stats);
      return {
        ...campaign,
        ...metrics,
      };
    });
  }, [filteredCampaigns, filteredDailyStats]);

  return {
    rows,
  };
}
