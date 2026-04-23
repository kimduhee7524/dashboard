import { useFilterStore } from '@/store/filter-store';

export function DateRangeFilter() {
  const dateStart = useFilterStore((s) => s.dateRange.start);
  const dateEnd = useFilterStore((s) => s.dateRange.end);
  const setDateRange = useFilterStore((s) => s.setDateRange);

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">집행 기간</span>
      <div className="flex items-center space-x-2">
        <input
          type="date"
          className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
          value={dateStart}
          max={dateEnd || undefined}
          onChange={(e) =>
            setDateRange({ start: e.target.value, end: dateEnd })
          }
        />
        <span className="text-gray-400">~</span>
        <input
          type="date"
          className="border border-gray-200 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
          value={dateEnd}
          min={dateStart || undefined}
          onChange={(e) =>
            setDateRange({ start: dateStart, end: e.target.value })
          }
        />
      </div>
    </div>
  );
}
