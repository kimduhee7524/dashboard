import { useState } from 'react';
import { useTop3Data, type Top3MetricKey } from '@/hooks/useTop3Data';
import { RankingMetricToggle } from './RankingMetricToggle';
import { Top3RankingItem } from './Top3RankingItem';

export function Top3Ranking() {
  const [metric, setMetric] = useState<Top3MetricKey>('roas');
  const { top3, maxMetricValue } = useTop3Data(metric);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full min-h-[350px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">캠페인 랭킹 Top 3</h2>
          {metric === 'cpc' && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
              낮을수록 좋음
            </span>
          )}
        </div>
        <RankingMetricToggle metric={metric} onChange={setMetric} />
      </div>

      {top3.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-6 flex-1 justify-center">
          {top3.map((campaign, index) => (
            <Top3RankingItem
              key={campaign.id}
              campaign={campaign}
              index={index}
              metric={metric}
              maxMetricValue={maxMetricValue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
