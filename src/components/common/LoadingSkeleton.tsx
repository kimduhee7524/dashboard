import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface LoadingSkeletonProps {
  message?: string;
}

export function LoadingSkeleton({
  message = '로딩 중...',
}: LoadingSkeletonProps) {
  return (
    <div className="w-full bg-white border border-gray-400 h-full flex items-center justify-center rounded-[8px]">
      <LoadingSpinner message={message} />
    </div>
  );
}
