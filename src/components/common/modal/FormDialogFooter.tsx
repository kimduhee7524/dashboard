import type { ReactNode } from 'react';

interface FormDialogFooterProps {
  children: ReactNode;
}

export function FormDialogFooter({ children }: FormDialogFooterProps) {
  return (
    <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
      {children}
    </div>
  );
}
