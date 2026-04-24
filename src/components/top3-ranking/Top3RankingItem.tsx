import { cn } from '@/lib/utils';
import type { Top3MetricKey } from '@/hooks/useTop3Data';
import type { CampaignTableRow } from '@/hooks/useTableData';
import { formatTop3MetricValue } from '@/lib/format';

interface Top3RankingItemProps {
  campaign: CampaignTableRow;
  index: number;
  metric: Top3MetricKey;
  maxMetricValue: number;
}

export function Top3RankingItem({
  campaign,
  index,
  metric,
  maxMetricValue,
}: Top3RankingItemProps) {
  const val = campaign[metric];

  // Progress Bar 비율 계산
  const widthPercent =
    maxMetricValue === 0 ? 0 : Math.min((val / maxMetricValue) * 100, 100);

  return (
    <div className="relative flex items-center gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-[#2E3C4E] text-white flex items-center justify-center font-bold text-base shadow-sm">
        {index + 1}
      </div>

      <div className="flex-1 flex flex-col gap-2 w-full pt-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="text-[15px] font-medium text-gray-800 truncate">
              {campaign.name}
            </span>
            <span className="px-2 py-0.5 bg-[#A1C5FA] text-white text-[11px] font-semibold rounded-md shrink-0">
              {campaign.platform}
            </span>
          </div>
          <div className="font-semibold text-[16px] text-gray-900 shrink-0">
            {formatTop3MetricValue(val, metric)}
          </div>
        </div>

        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden flex items-center relative">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              metric === 'cpc' ? 'bg-indigo-400' : 'bg-[#8CB7F8]'
            )}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
