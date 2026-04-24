import { useMemo } from 'react';
import { useFilteredData } from '@/hooks/useFilteredData';
import { aggregateByDate } from '@/domain/daily-stats/aggregate';

export function useTrendData() {
  const { filteredDailyStats } = useFilteredData();

  return useMemo(() => {
    const data = aggregateByDate(filteredDailyStats);
    const dateRange =
      data.length > 0 ? `${data[0].date} ~ ${data[data.length - 1].date}` : '';

    return {
      data,
      dateRange,
    };
  }, [filteredDailyStats]);
}
