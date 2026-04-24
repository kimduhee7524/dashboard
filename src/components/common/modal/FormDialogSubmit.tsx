import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormDialogSubmitProps {
  children: ReactNode;
  isPending?: boolean;
  pendingLabel?: string;
  className?: string;
}

export function FormDialogSubmit({
  children,
  isPending,
  pendingLabel,
  className,
}: FormDialogSubmitProps) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={cn(
        'px-6 bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] border-none font-medium shadow-none',
        className
      )}
    >
      {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {isPending && pendingLabel ? pendingLabel : children}
    </Button>
  );
}
