import { useFilterStore } from '@/store/filter-store';

export function DateRangeFilter() {
  const dateStart = useFilterStore((s) => s.dateRange.start);
  const dateEnd = useFilterStore((s) => s.dateRange.end);
  const setDateRange = useFilterStore((s) => s.setDateRange);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">집행 기간</span>
      <div className="flex items-center space-x-1">
        <input
          type="date"
          className="border border-input rounded-md px-2 py-1 text-sm bg-white"
          value={dateStart}
          max={dateEnd || undefined}
          onChange={(e) =>
            setDateRange({ start: e.target.value, end: dateEnd })
          }
        />
        <span>~</span>
        <input
          type="date"
          className="border border-input rounded-md px-2 py-1 text-sm bg-white"
          value={dateEnd}
          min={dateStart || undefined}
          onChange={(e) => setDateRange({ start: dateStart, end: e.target.value })}
        />
      </div>
    </div>
  );
}
