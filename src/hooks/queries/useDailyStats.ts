import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchDailyStats } from '@/api/daily-stats';
import { normalizeDailyStats } from '@/domain/daily-stats/normalize';
import { dailyStatKeys } from './queryKeys';

export function dailyStatsOptions() {
  return queryOptions({
    queryKey: dailyStatKeys.lists(),
    queryFn: fetchDailyStats,
    select: normalizeDailyStats,
  });
}

export function useDailyStats() {
  return useSuspenseQuery(dailyStatsOptions());
}
