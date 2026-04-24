import { useCampaignTableController } from '@/hooks/useCampaignTableController';
import { CreateCampaignModal } from '@/components/campaign-modal/CreateCampaignModal';
import { TableSearch } from './TableSearch';
import { BulkStatusSelect } from './BulkStatusSelect';
import { DataTable } from '@/components/common/table';

export function CampaignTable() {
  const { table, searchQuery, setGlobalFilter, handleBulkUpdateStatus } =
    useCampaignTableController();

  const totalFilteredItems = table.getPreFilteredRowModel().rows.length;
  const totalItems = table.getFilteredRowModel().rows.length;
  const selectedCount = Object.keys(table.getState().rowSelection).length;

  return (
    <DataTable table={table}>
      <DataTable.Toolbar>
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
                <BulkStatusSelect onUpdate={handleBulkUpdateStatus} />
              </div>
            </div>
          )}
        </div>
      </DataTable.Toolbar>

      <DataTable.Container>
        <table className="min-w-full divide-y divide-gray-200 relative">
          <DataTable.Head />
          <DataTable.Body emptyMessage="데이터가 없습니다." />
        </table>
      </DataTable.Container>

      <DataTable.Pagination />
    </DataTable>
  );
}
