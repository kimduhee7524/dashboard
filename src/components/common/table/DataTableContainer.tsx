import type { ReactNode } from 'react';

interface DataTableContainerProps {
  children: ReactNode;
}

export function DataTableContainer({ children }: DataTableContainerProps) {
  return (
    <div className="w-full overflow-x-auto border-t border-gray-200">
      {children}
    </div>
  );
}
