import { createColumnHelper } from '@tanstack/react-table';
import type { CampaignTableRow } from '@/hooks/derived/useTableData';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, formatPercent } from '@/lib/format';

const columnHelper = createColumnHelper<CampaignTableRow>();

export const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
        checked={table.getIsAllPageRowsSelected()}
        ref={(input) => {
          if (input) input.indeterminate = table.getIsSomePageRowsSelected();
        }}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    meta: {
      align: 'left',
      width: 'w-10',
    },
  }),
  columnHelper.accessor('name', {
    header: '캠페인명',
    cell: (info) => (
      <div className="text-sm font-medium text-gray-900">{info.getValue()}</div>
    ),
    enableSorting: false,
    meta: {
      align: 'left',
    },
  }),
  columnHelper.accessor('status', {
    header: '상태',
    cell: (info) => <StatusBadge status={info.getValue()} />,
    enableSorting: false,
    meta: {
      align: 'center',
    },
  }),
  columnHelper.accessor('platform', {
    header: '매체',
    cell: (info) => info.getValue(),
    enableSorting: false,
    meta: {
      align: 'center',
      className: 'text-sm text-gray-500',
    },
  }),
  columnHelper.accessor('startDate', {
    header: '집행기간',
    cell: (info) => {
      const { startDate, endDate } = info.row.original;
      return `${startDate} ~ ${endDate || '진행중'}`;
    },
    meta: {
      align: 'center',
      className: 'text-sm text-gray-500',
    },
  }),
  columnHelper.accessor('totalCost', {
    header: '집행금액',
    cell: (info) => (
      <div className="text-sm font-medium text-gray-900">
        {formatCurrency(info.getValue())}
      </div>
    ),
    meta: {
      align: 'right',
    },
  }),
  columnHelper.accessor('ctr', {
    header: 'CTR (%)',
    cell: (info) => {
      const val = info.getValue();
      return val === 0 ? '-' : formatPercent(val);
    },
    meta: {
      align: 'right',
      className: 'text-sm text-gray-500',
    },
  }),
  columnHelper.accessor('cpc', {
    header: 'CPC (원)',
    cell: (info) => {
      const val = info.getValue();
      return val === 0 ? '-' : formatCurrency(val, false);
    },
    meta: {
      align: 'right',
      className: 'text-sm text-gray-500',
    },
  }),
  columnHelper.accessor('roas', {
    header: 'ROAS (%)',
    cell: (info) => {
      const val = info.getValue();
      return (
        <span className={val > 0 ? 'text-green-600 font-medium' : ''}>
          {val === 0 ? '-' : formatPercent(val)}
        </span>
      );
    },
    meta: {
      align: 'right',
      className: 'text-sm text-gray-500',
    },
  }),
];
