import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-hidden py-4 px-6 gap-x-4">
      <div className="w-[192px] h-full">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSkeleton />}></Suspense>
        </ErrorBoundary>
      </div>

      <main className="flex-1 flex flex-col border border-gray-400 rounded-[8px] overflow-hidden bg-white"></main>
    </div>
  );
}
