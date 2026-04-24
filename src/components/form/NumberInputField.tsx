import React from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputFieldProps {
  field: {
    name: string;
    value: number | undefined;
    onChange: (value: number | undefined) => void;
    onBlur: () => void;
    ref: React.Ref<HTMLInputElement>;
  };
  placeholder?: string;
}

export function NumberInputField({
  field: { name, value, onChange, onBlur, ref },
  placeholder = '0',
}: NumberInputFieldProps) {
  return (
    <div className="relative">
      <Input
        type="number"
        placeholder={placeholder}
        className="pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        name={name}
        ref={ref}
        onBlur={onBlur}
        value={value ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === '' ? undefined : Number(val));
        }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
        원
      </span>
    </div>
  );
}
