import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormDialogBodyProps {
  children: ReactNode;
  className?: string;
}

export function FormDialogBody({ children, className }: FormDialogBodyProps) {
  return (
    <div
      className={cn('px-6 py-4 space-y-6 flex-1 overflow-y-auto', className)}
    >
      {children}
    </div>
  );
}
