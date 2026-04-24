import { api } from './axiosInstance';
import type { RawCampaign } from '@/domain/campaign/types';

export const fetchCampaigns = async (): Promise<RawCampaign[]> => {
  const { data } = await api.get<RawCampaign[]>('/campaigns');
  return data;
};

export const updateCampaignStatus = async (
  id: string,
  status: string
): Promise<RawCampaign> => {
  const { data } = await api.patch<RawCampaign>(`/campaigns/${id}/status`, {
    status,
  });
  return data;
};

export const updateCampaignStatusBulk = async (
  ids: string[],
  status: string
): Promise<RawCampaign[]> => {
  const { data } = await api.patch<RawCampaign[]>('/campaigns/bulk/status', {
    ids,
    status,
  });
  return data;
};

export const createCampaign = async (
  campaign: Partial<RawCampaign>
): Promise<RawCampaign> => {
  const { data } = await api.post<RawCampaign>('/campaigns', campaign);
  return data;
};
