import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchCampaigns } from '@/api/campaigns';
import { campaignKeys } from './queryKeys';

export function campaignsOptions() {
  return queryOptions({
    queryKey: campaignKeys.lists(),
    queryFn: fetchCampaigns,
  });
}

export function useCampaigns() {
  return useSuspenseQuery(campaignsOptions());
}
