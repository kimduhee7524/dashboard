import { api } from './axiosInstance';
import type { RawDailyStat } from '@/domain/daily-stats/types';

export const fetchDailyStats = async (): Promise<RawDailyStat[]> => {
  const { data } = await api.get<RawDailyStat[]>('/daily_stats');
  return data;
};
