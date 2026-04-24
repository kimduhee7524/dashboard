import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  type PieSectorDataItem,
} from 'recharts';
import type { PlatformDataWithPercent } from '@/hooks/usePlatformData';
import type { MetricKey } from '@/domain/daily-stats/types';
import type { Platform } from '@/domain/campaign/types';
import {
  formatPlatformMetricValue,
  getPlatformMetricLabel,
} from '@/lib/format';

interface PlatformPieChartProps {
  data: PlatformDataWithPercent[];
  metric: MetricKey;
  selectedPlatforms: Platform[];
  selectedPlatformsSet: Set<Platform>;
  togglePlatform: (platform: Platform) => void;
  colors: Record<Platform, string>;
}

export function PlatformPieChart({
  data,
  metric,
  selectedPlatforms,
  selectedPlatformsSet,
  togglePlatform,
  colors,
}: PlatformPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          isAnimationActive={false}
          data={data.map((entry) => ({
            ...entry,
            fill: colors[entry.platform],
            opacity:
              selectedPlatforms.length === 0 ||
              selectedPlatformsSet.has(entry.platform)
                ? 1
                : 0.3,
            className: 'transition-opacity duration-200',
          }))}
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="90%"
          paddingAngle={0}
          dataKey={metric}
          stroke="none"
          onClick={(entry: PieSectorDataItem) => {
            const payload = entry.payload as PlatformDataWithPercent;
            togglePlatform(payload.platform);
          }}
          className="cursor-pointer focus:outline-none outline-none"
        />
        <Tooltip
          formatter={(value) => [
            formatPlatformMetricValue(
              typeof value === 'number' ? value : Number(value) || 0,
              metric
            ),
            getPlatformMetricLabel(metric),
          ]}
          labelFormatter={() => ''}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
