import { useMemo } from 'react';
import { useDailyStats } from '@/hooks/queries/useDailyStats';
import { aggregateByDate } from '@/domain/daily-stats/aggregate';

export function useTrendData() {
  const { data: dailyStats } = useDailyStats();

  return useMemo(() => {
    return aggregateByDate(dailyStats);
  }, [dailyStats]);
}
