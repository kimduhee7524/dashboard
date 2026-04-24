import { TableSearch } from './TableSearch';
import { BulkStatusSelect } from './BulkStatusSelect';
import { CreateCampaignModal } from '@/components/campaign-modal/CreateCampaignModal';
import type { CampaignStatus } from '@/domain/campaign/types';
import type { Table } from '@tanstack/react-table';
import type { CampaignTableRow } from '@/hooks/useTableData';

interface TableHeaderProps {
  table: Table<CampaignTableRow>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  onBulkUpdateStatus: (status: CampaignStatus) => void;
}

export function TableHeader({
  table,
  globalFilter,
  setGlobalFilter,
  onBulkUpdateStatus,
}: TableHeaderProps) {
  const searchQuery = globalFilter;
  const totalFilteredItems = table.getPreFilteredRowModel().rows.length;
  const totalItems = table.getFilteredRowModel().rows.length;
  const selectedCount = Object.keys(table.getState().rowSelection).length;

  return (
    <div className="flex flex-col relative px-6 py-5 bg-white rounded-t-lg gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">캠페인 목록</h2>
        <CreateCampaignModal />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <div className="w-full sm:w-80 relative flex items-center">
            <TableSearch
              searchQuery={searchQuery}
              onSearchChange={setGlobalFilter}
            />
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap hidden sm:inline-block">
            {searchQuery
              ? `${totalItems}건 / ${totalFilteredItems}건`
              : `${totalFilteredItems}건`}
          </span>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-700">상태 변경:</span>
            <div className="flex gap-2">
              <BulkStatusSelect onUpdate={onBulkUpdateStatus} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
