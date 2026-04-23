import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCampaignStatusBulk } from '@/api/campaigns';
import { campaignKeys } from './queryKeys';
import type { CampaignStatus } from '@/domain/campaign/types';

interface UpdateStatusVariables {
  ids: string[];
  status: CampaignStatus;
}

export function useUpdateCampaignStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ids, status }: UpdateStatusVariables) => {
      return updateCampaignStatusBulk(ids, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
}
