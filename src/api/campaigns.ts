import { api } from './axiosInstance';
import type { RawCampaign } from '@/domain/campaign/types';

export const fetchCampaigns = async (): Promise<RawCampaign[]> => {
  const { data } = await api.get<RawCampaign[]>('/campaigns');
  return data;
};
