import { cn } from '@/lib/utils';
import type { Top3MetricKey } from '@/hooks/useTop3Data';

interface RankingMetricToggleProps {
  metric: Top3MetricKey;
  onChange: (metric: Top3MetricKey) => void;
}

const METRICS: { key: Top3MetricKey; label: string }[] = [
  { key: 'roas', label: 'ROAS' },
  { key: 'ctr', label: 'CTR' },
  { key: 'cpc', label: 'CPC' },
];

export function RankingMetricToggle({
  metric,
  onChange,
}: RankingMetricToggleProps) {
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
