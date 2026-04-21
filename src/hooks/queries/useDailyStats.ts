import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchDailyStats } from '@/api/daily-stats';
import { dailyStatKeys } from './queryKeys';

export function dailyStatsOptions() {
  return queryOptions({
    queryKey: dailyStatKeys.lists(),
    queryFn: fetchDailyStats,
  });
}

export function useDailyStats() {
  return useSuspenseQuery(dailyStatsOptions());
}
