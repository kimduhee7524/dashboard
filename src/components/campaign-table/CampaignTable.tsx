import { TableHeader } from './TableHeader';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { Pagination } from './Pagination';
import { useCampaignTableController } from '@/hooks/campaign/useCampaignTableController';

export function CampaignTable() {
  const { table, globalFilter, setGlobalFilter, handleBulkUpdateStatus } =
    useCampaignTableController();

  return (
    <div className="flex flex-col bg-white rounded-lg shadow w-full overflow-hidden">
      <TableHeader
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onBulkUpdateStatus={handleBulkUpdateStatus}
      />
      <div className="w-full overflow-x-auto border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 relative">
          <TableHead table={table} />
          <TableBody table={table} />
        </table>
      </div>
      <Pagination table={table} />
    </div>
  );
}
