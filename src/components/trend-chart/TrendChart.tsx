import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TrendData } from '@/domain/daily-stats/aggregate';
import type { ReactNode } from 'react';

interface TrendChartProps {
  data: TrendData[];
  showImpressions: boolean;
  showClicks: boolean;
}

export function TrendChart({
  data,
  showImpressions,
  showClicks,
}: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500">
        데이터가 없습니다.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={true}
          horizontal={true}
          stroke="#E5E7EB"
        />
        <XAxis
          dataKey="date"
          tickFormatter={(value: string, index: number) => {
            const [year, month, day] = value.split('-');
            if (index === 0) {
              return `${year.slice(2)}/${month}-${day}`;
            }
            return `${month}-${day}`;
          }}
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          tickLine={false}
          axisLine={{ stroke: '#E5E7EB' }}
          tickMargin={12}
          minTickGap={30}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            new Intl.NumberFormat('ko-KR').format(value)
          }
          dx={-10}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            new Intl.NumberFormat('ko-KR').format(value)
          }
          dx={10}
        />
        <Tooltip
          labelFormatter={(value: ReactNode | undefined) => `날짜: ${value}`}
          formatter={(value, name) => [
            new Intl.NumberFormat('ko-KR').format(Number(value)),
            name === 'impressions' ? '노출수' : '클릭수',
          ]}
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        />
        {showImpressions && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#60A5FA' }}
            name="impressions"
          />
        )}
        {showClicks && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="clicks"
            stroke="#9CA3AF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: '#9CA3AF' }}
            name="clicks"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
