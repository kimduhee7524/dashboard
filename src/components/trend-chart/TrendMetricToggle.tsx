import { cn } from '@/lib/utils';

interface TrendMetricToggleProps {
  showImpressions: boolean;
  showClicks: boolean;
  onToggleImpressions: () => void;
  onToggleClicks: () => void;
}

export function TrendMetricToggle({
  showImpressions,
  showClicks,
  onToggleImpressions,
  onToggleClicks,
}: TrendMetricToggleProps) {
  const handleToggleImpressions = () => {
    if (showImpressions && !showClicks) return;
    onToggleImpressions();
  };

  const handleToggleClicks = () => {
    if (!showImpressions && showClicks) return;
    onToggleClicks();
  };

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
      <button
        onClick={handleToggleImpressions}
        className={cn(
          'px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 outline-none',
          showImpressions
            ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50'
            : 'text-gray-500 hover:text-gray-700 border border-transparent'
        )}
      >
        노출수
      </button>
      <button
        onClick={handleToggleClicks}
        className={cn(
          'px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 outline-none',
          showClicks
            ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50'
            : 'text-gray-500 hover:text-gray-700 border border-transparent'
        )}
      >
        클릭수
      </button>
    </div>
  );
}
