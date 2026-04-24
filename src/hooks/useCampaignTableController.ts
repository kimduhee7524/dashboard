import { useState, useDeferredValue } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';
import { useTableData } from '@/hooks/useTableData';
import { useUpdateCampaignStatus } from '@/hooks/queries/useUpdateCampaignStatus';
import { columns } from '@/components/campaign-table/columns';
import type { CampaignStatus } from '@/domain/campaign/types';

export function useCampaignTableController() {
  const { rows } = useTableData();
  const { mutate: updateStatus } = useUpdateCampaignStatus();

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const deferredGlobalFilter = useDeferredValue(globalFilter);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'startDate', desc: true },
  ]);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      rowSelection,
      globalFilter: deferredGlobalFilter,
      sorting,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'includesString',
    autoResetPageIndex: false,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleBulkUpdateStatus = (status: CampaignStatus) => {
    const selectedRows = table.getSelectedRowModel().rows;
    const ids = selectedRows.map((row) => row.original.id);
    if (ids.length === 0) return;

    updateStatus(
      { ids, status },
      {
        onSuccess: () => {
          setRowSelection({});
        },
      }
    );
  };

  return {
    table,
    globalFilter,
    setGlobalFilter,
    handleBulkUpdateStatus,
  };
}
