import { useState } from 'react';
import { useTrendData } from '@/hooks/useTrendData';
import { TrendChartHeader } from './TrendChartHeader';
import { TrendMetricToggle } from './TrendMetricToggle';
import { TrendChart } from './TrendChart';

export function TrendChartWidget() {
  const { data: trendData, dateRange } = useTrendData();
  const [showImpressions, setShowImpressions] = useState(true);
  const [showClicks, setShowClicks] = useState(true);

  return (
    <div className="flex flex-col h-full w-full p-6 gap-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <TrendChartHeader dateRange={dateRange} />
        <TrendMetricToggle
          showImpressions={showImpressions}
          showClicks={showClicks}
          onToggleImpressions={() => setShowImpressions((prev) => !prev)}
          onToggleClicks={() => setShowClicks((prev) => !prev)}
        />
      </div>
      <div className="flex-1 min-h-0">
        <TrendChart
          data={trendData}
          showImpressions={showImpressions}
          showClicks={showClicks}
        />
      </div>
    </div>
  );
}
