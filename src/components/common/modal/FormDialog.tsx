import { type ReactNode, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<DialogSize, string> = {
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[480px]',
  lg: 'sm:max-w-[640px]',
  xl: 'sm:max-w-[800px]',
};

interface FormDialogProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onSubmit: SubmitHandler<TTransformedValues>;
  size?: DialogSize;
  children: ReactNode;
}

export function FormDialog<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  open,
  onOpenChange,
  form,
  onSubmit,
  size = 'md',
  children,
}: FormDialogProps<TFieldValues, TContext, TTransformedValues>) {
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)]',
          'p-0 overflow-hidden flex flex-col',
          sizeClasses[size]
        )}
        aria-describedby={undefined}
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit as SubmitHandler<TTransformedValues>
            )}
            className="flex flex-col flex-1 min-h-0"
          >
            {children}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────
// Compound Components
// ─────────────────────────────────────────────

interface FormDialogHeaderProps {
  title: string;
  description?: string;
}

function FormDialogHeader({ title, description }: FormDialogHeaderProps) {
  return (
    <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
      <DialogTitle className="text-xl font-bold text-gray-900">
        {title}
      </DialogTitle>
      {description ? (
        <DialogDescription className="text-sm text-gray-500 mt-1">
          {description}
        </DialogDescription>
      ) : (
        <DialogDescription className="sr-only">{title}</DialogDescription>
      )}
    </DialogHeader>
  );
}

interface FormDialogBodyProps {
  children: ReactNode;
  className?: string;
}

function FormDialogBody({ children, className }: FormDialogBodyProps) {
  return (
    <div
      className={cn('px-6 py-4 space-y-6 flex-1 overflow-y-auto', className)}
    >
      {children}
    </div>
  );
}

interface FormDialogFooterProps {
  children: ReactNode;
}

function FormDialogFooter({ children }: FormDialogFooterProps) {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// 버튼 컴포넌트들
// ─────────────────────────────────────────────

interface FormDialogSubmitProps {
  children: ReactNode;
  isPending?: boolean;
  pendingLabel?: string;
  className?: string;
}

function FormDialogSubmit({
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

interface FormDialogCancelProps {
  children: ReactNode;
  onClick: () => void;
  isPending?: boolean;
  className?: string;
}

function FormDialogCancel({
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

FormDialog.Header = FormDialogHeader;
FormDialog.Body = FormDialogBody;
FormDialog.Footer = FormDialogFooter;
FormDialog.Submit = FormDialogSubmit;
FormDialog.Cancel = FormDialogCancel;
