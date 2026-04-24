import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createCampaign } from '@/api/campaigns';
import { campaignKeys } from './queryKeys';
import type { RawCampaign } from '@/domain/campaign/types';

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaign: Partial<RawCampaign>) => {
      return createCampaign(campaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
      toast.success('캠페인이 성공적으로 등록되었습니다.');
    },
    onError: () => {
      toast.error('캠페인 등록에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
