import { flexRender } from '@tanstack/react-table';
import { cn, getTextAlignClass } from '@/lib/utils';
import { useDataTable } from './DataTableContext';

interface DataTableBodyProps {
  emptyMessage?: string;
}

export function DataTableBody({
  emptyMessage = '데이터가 없습니다.',
}: DataTableBodyProps) {
  const table = useDataTable();
  const rows = table.getRowModel().rows;

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.length === 0 ? (
        <tr>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            className="px-6 py-10 text-center text-gray-500 text-sm"
          >
            {emptyMessage}
          </td>
        </tr>
      ) : (
        rows.map((row) => {
          return (
            <tr
              key={row.id}
              className={cn(
                'hover:bg-gray-50 transition-colors',
                row.getIsSelected() && 'bg-blue-50/50'
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta as
                  | Record<string, any>
                  | undefined;
                const alignClass = getTextAlignClass(meta?.align);

                return (
                  <td
                    key={cell.id}
                    className={cn(
                      'px-4 py-4 whitespace-nowrap',
                      alignClass,
                      meta?.className
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })
      )}
    </tbody>
  );
}
