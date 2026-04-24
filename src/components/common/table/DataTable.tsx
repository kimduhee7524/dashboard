import type { ReactNode } from 'react';
import type { Table } from '@tanstack/react-table';
import { DataTableProvider } from './DataTableContext';
import { DataTableToolbar } from './DataTableToolbar.tsx';
import { DataTableContainer } from './DataTableContainer.tsx';
import { DataTableHead } from './DataTableHead.tsx';
import { DataTableBody } from './DataTableBody.tsx';
import { DataTablePagination } from './DataTablePagination.tsx';

interface DataTableProps<TData> {
  table: Table<TData>;
  children: ReactNode;
}

export function DataTable<TData>({ table, children }: DataTableProps<TData>) {
  return (
    <DataTableProvider value={table}>
      <div className="flex flex-col bg-white rounded-lg shadow w-full overflow-hidden">
        {children}
      </div>
    </DataTableProvider>
  );
}

DataTable.Toolbar = DataTableToolbar;
DataTable.Container = DataTableContainer;
DataTable.Head = DataTableHead;
DataTable.Body = DataTableBody;
DataTable.Pagination = DataTablePagination;
