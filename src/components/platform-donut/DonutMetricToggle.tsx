import { cn } from '@/lib/utils';
import type { MetricKey } from '@/domain/daily-stats/types';

interface DonutMetricToggleProps {
  metric: MetricKey;
  onChange: (metric: MetricKey) => void;
}

const METRICS: { key: MetricKey; label: string }[] = [
  { key: 'cost', label: '비용' },
  { key: 'impressions', label: '노출수' },
  { key: 'clicks', label: '클릭수' },
  { key: 'conversions', label: '전환수' },
];

export function DonutMetricToggle({
  metric,
  onChange,
}: DonutMetricToggleProps) {
  return (
    <div className="flex bg-gray-50 rounded-lg p-1">
      {METRICS.map(({ key, label }) => {
        const isActive = metric === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
