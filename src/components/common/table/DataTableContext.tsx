import { createContext, useContext } from 'react';
import type { Table } from '@tanstack/react-table';

const DataTableContext = createContext<Table<any> | null>(null);

export function useDataTable<TData>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTable must be used within a DataTable');
  }
  return context as Table<TData>;
}

export const DataTableProvider = DataTableContext.Provider;
