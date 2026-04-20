import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

export function LoadingSpinner({
  size = 'md',
  className,
  message,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className
      )}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-gray-300 border-t-sky-400',
          sizeClasses[size]
        )}
        role="status"
        aria-label="로딩 중"
      />
      {message && <p className="text-body-2 text-gray-500">{message}</p>}
    </div>
  );
}
