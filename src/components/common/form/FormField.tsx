import type { ReactNode } from 'react';
import {
  FormField as ShadcnFormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  children: (field: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, children }: FormFieldProps<TFieldValues, TName>) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col gap-2 relative">
          <div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <FormControl>{children(field)}</FormControl>
          <FormMessage className="absolute -bottom-5 left-1 text-[11px] text-red-500 font-medium m-0 p-0" />
        </FormItem>
      )}
    />
  );
}
