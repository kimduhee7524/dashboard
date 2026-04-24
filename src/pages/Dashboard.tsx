import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { TrendChartWidget } from '@/components/trend-chart/TrendChartWidget';
import { FilterBar } from '@/components/filter/FilterBar';
import { CampaignTable } from '@/components/campaign-table/CampaignTable';
import { PlatformDonut } from '@/components/platform-donut/PlatformDonut';

import { Top3Ranking } from '@/components/top3-ranking/Top3Ranking';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden py-4 px-6 gap-x-4">
      <main className="flex-1 flex flex-col overflow-y-auto bg-transparent gap-4 pb-10">
        <FilterBar />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <div className="h-[300px] w-full shrink-0">
              <TrendChartWidget />
            </div>
            <div className="w-full shrink-0">
              <CampaignTable />
            </div>
            <div className="w-full shrink-0 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <PlatformDonut />
              </div>
              <div className="w-full md:w-1/2">
                <Top3Ranking />
              </div>
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
