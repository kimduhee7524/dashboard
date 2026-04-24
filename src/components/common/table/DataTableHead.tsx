import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn, getTextAlignClass, getFlexJustifyClass } from '@/lib/utils';
import { useDataTable } from './DataTableContext';

export function DataTableHead() {
  const table = useDataTable();

  return (
    <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const meta = header.column.columnDef.meta as Record<string, any> | undefined;
            const alignClass = getTextAlignClass(meta?.align);
            const justifyClass = getFlexJustifyClass(meta?.align);

            const canSort = header.column.getCanSort();
            const isSorted = header.column.getIsSorted();

            return (
              <th
                key={header.id}
                className={cn(
                  'px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider select-none',
                  meta?.width,
                  canSort && 'cursor-pointer hover:bg-gray-50',
                  alignClass
                )}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div
                  className={cn('flex items-center gap-1 w-full', justifyClass)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {canSort && (
                    <span className="inline-flex flex-col items-center">
                      {isSorted ? (
                        isSorted === 'asc' ? (
                          <ChevronUp className="w-3 h-3 text-blue-600" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-blue-600" />
                        )
                      ) : (
                        <div className="flex flex-col text-gray-300">
                          <ChevronUp className="w-3 h-3 -mb-1" />
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
