import { type ReactNode, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

import { FormDialogHeader } from './FormDialogHeader';
import { FormDialogBody } from './FormDialogBody';
import { FormDialogFooter } from './FormDialogFooter';
import { FormDialogSubmit } from './FormDialogSubmit';
import { FormDialogCancel } from './FormDialogCancel';

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

FormDialog.Header = FormDialogHeader;
FormDialog.Body = FormDialogBody;
FormDialog.Footer = FormDialogFooter;
FormDialog.Submit = FormDialogSubmit;
FormDialog.Cancel = FormDialogCancel;
