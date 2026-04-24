import { useMemo } from 'react';
import { useFilteredData } from '@/hooks/useFilteredData';
import { aggregateByDate } from '@/domain/daily-stats/aggregate';

export function useTrendData() {
  const { filteredDailyStats } = useFilteredData();

  return useMemo(() => {
    return aggregateByDate(filteredDailyStats);
  }, [filteredDailyStats]);
}
