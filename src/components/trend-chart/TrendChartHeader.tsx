export interface TrendChartHeaderProps {
  dateRange: string;
}

export function TrendChartHeader({ dateRange }: TrendChartHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h2 className="text-base font-bold text-gray-800">일별 추이</h2>
        <div className="flex items-center gap-3 text-[13px] text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" />
            <span>노출수 (좌)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" />
            <span>클릭수 (우)</span>
          </div>
        </div>
      </div>
      {dateRange && (
        <span className="text-[13px] text-gray-400 font-medium">
          {dateRange}
        </span>
      )}
    </div>
  );
}
