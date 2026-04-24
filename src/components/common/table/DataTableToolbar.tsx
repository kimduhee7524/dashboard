import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DataTableToolbarProps {
  children: ReactNode;
  className?: string;
}

export function DataTableToolbar({
  children,
  className,
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-col relative px-6 py-5 bg-white rounded-t-lg gap-4',
        className
      )}
    >
      {children}
    </div>
  );
}
