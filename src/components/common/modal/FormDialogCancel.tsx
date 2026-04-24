import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormDialogCancelProps {
  children: ReactNode;
  onClick: () => void;
  isPending?: boolean;
  className?: string;
}

export function FormDialogCancel({
  children,
  onClick,
  isPending,
  className,
}: FormDialogCancelProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isPending}
      className={cn(
        'px-6 border-gray-200 text-gray-600 font-normal hover:bg-gray-50',
        className
      )}
    >
      {children}
    </Button>
  );
}
