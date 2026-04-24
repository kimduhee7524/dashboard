import { flexRender } from '@tanstack/react-table';
import type { Table } from '@tanstack/react-table';
import type { CampaignTableRow } from '@/hooks/derived/useTableData';
import { columns } from './columns';
import { cn, getTextAlignClass } from '@/lib/utils';

interface TableBodyProps {
  table: Table<CampaignTableRow>;
}

export function TableBody({ table }: TableBodyProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {table.getRowModel().rows.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-10 text-center text-gray-500 text-sm"
          >
            데이터가 없습니다.
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.id}
              className={cn(
                'hover:bg-gray-50 transition-colors',
                row.getIsSelected() && 'bg-blue-50/50'
              )}
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta;
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
