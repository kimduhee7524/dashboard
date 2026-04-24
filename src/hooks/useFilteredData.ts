import { useMemo } from 'react';
import { useCampaigns } from '@/hooks/queries/useCampaigns';
import { useDailyStats } from '@/hooks/queries/useDailyStats';
import { useFilterStore } from '@/store/filter-store';
import {
  isDateRangeOverlapping,
  matchesArrayFilter,
} from '@/domain/filters/predicates';

export function useFilteredData() {
  const { data: campaigns } = useCampaigns();
  const { data: dailyStats } = useDailyStats();

  const dateStart = useFilterStore((s) => s.dateRange.start);
  const dateEnd = useFilterStore((s) => s.dateRange.end);
  const statuses = useFilterStore((s) => s.statuses);
  const platforms = useFilterStore((s) => s.platforms);

  return useMemo(() => {
    if (!campaigns || !dailyStats) {
      return { filteredCampaigns: [], filteredDailyStats: [] };
    }

    const filteredCampaigns = campaigns.filter((campaign) => {
      const isDateMatch = isDateRangeOverlapping(
        campaign.startDate,
        campaign.endDate,
        dateStart,
        dateEnd
      );
      const isStatusMatch = matchesArrayFilter(campaign.status, statuses);
      const isPlatformMatch = matchesArrayFilter(campaign.platform, platforms);

      return isDateMatch && isStatusMatch && isPlatformMatch;
    });

    const campaignIdSet = new Set(filteredCampaigns.map((c) => c.id));

    const filteredDailyStats = dailyStats.filter((stat) => {
      if (!campaignIdSet.has(stat.campaignId)) {
        return false;
      }

      if (dateStart && stat.date < dateStart) {
        return false;
      }
      if (dateEnd && stat.date > dateEnd) {
        return false;
      }

      return true;
    });

    return {
      filteredCampaigns,
      filteredDailyStats,
    };
  }, [campaigns, dailyStats, dateStart, dateEnd, statuses, platforms]);
}
