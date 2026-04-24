import { useState } from 'react';
import { PlatformPieChart } from './PlatformPieChart';
import { usePlatformData } from '@/hooks/usePlatformData';
import type { MetricKey } from '@/domain/daily-stats/types';
import { DonutMetricToggle } from './DonutMetricToggle';
import { useFilterStore } from '@/store/filter-store';
import { formatPercent, formatPlatformMetricValue } from '@/lib/format';
import type { Platform } from '@/domain/campaign/types';
import { cn } from '@/lib/utils';

const COLORS: Record<Platform, string> = {
  Google: '#7aa1f6',
  Meta: '#e7eff8',
  Naver: '#6fcc94',
};

export function PlatformDonut() {
  const [metric, setMetric] = useState<MetricKey>('cost');
  const { data } = usePlatformData(metric);
  const togglePlatform = useFilterStore((s) => s.togglePlatform);
  const selectedPlatforms = useFilterStore((s) => s.platforms);
  const selectedPlatformsSet = new Set(selectedPlatforms);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full min-h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">플랫폼별 성과</h2>
        <DonutMetricToggle metric={metric} onChange={setMetric} />
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center min-h-[250px] gap-8">
        <div className="w-full sm:w-1/2 h-[200px] sm:h-[250px]">
          <PlatformPieChart
            data={data}
            metric={metric}
            selectedPlatforms={selectedPlatforms}
            selectedPlatformsSet={selectedPlatformsSet}
            togglePlatform={togglePlatform}
            colors={COLORS}
          />
        </div>

        <div className="w-full sm:w-1/2 flex flex-col justify-center max-w-[320px]">
          <div className="flex flex-col gap-2">
            {data.map((item) => {
              const isSelected = selectedPlatformsSet.has(item.platform);
              return (
                <div
                  key={item.platform}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200',
                    isSelected ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                  )}
                  onClick={() => togglePlatform(item.platform)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: COLORS[item.platform] }}
                    />
                    <span className="text-[15px] font-medium text-gray-700 w-12">
                      {item.platform}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-3 flex-1 overflow-hidden">
                    <span className="font-semibold text-blue-600 text-[15px] truncate">
                      {formatPlatformMetricValue(item[metric], metric)}
                    </span>
                    <span className="text-sm text-gray-400 w-14 text-right shrink-0">
                      ({formatPercent(item.percent)})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 px-4 text-[13px] text-gray-500">
            선택:{' '}
            {selectedPlatforms.length > 0
              ? selectedPlatforms.join(', ')
              : '전체 (필터 없음)'}
          </div>
        </div>
      </div>
    </div>
  );
}
