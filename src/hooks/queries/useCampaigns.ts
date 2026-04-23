import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchCampaigns } from '@/api/campaigns';
import { normalizeCampaigns } from '@/domain/campaign/normalize';
import { campaignKeys } from './queryKeys';

export function campaignsOptions() {
  return queryOptions({
    queryKey: campaignKeys.lists(),
    queryFn: async () => {
      const raw = await fetchCampaigns();
      return normalizeCampaigns(raw);
    },
  });
}

export function useCampaigns() {
  return useSuspenseQuery(campaignsOptions());
}
