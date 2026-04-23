import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import { TrendChartWidget } from '@/components/trend-chart/TrendChartWidget';
import { FilterBar } from '@/components/filter/FilterBar';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden py-4 px-6 gap-x-4">
      <main className="flex-1 flex flex-col overflow-hidden bg-transparent gap-4">
        <FilterBar />
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}>
            <div className="h-[400px] w-full">
              <TrendChartWidget />
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
