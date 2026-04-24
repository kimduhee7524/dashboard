import type { CampaignStatus } from '@/domain/campaign/types';

interface StatusBadgeProps {
  status: CampaignStatus;
}

const statusMap: Record<CampaignStatus, { label: string; colorClass: string }> =
  {
    active: { label: '진행중', colorClass: 'bg-green-100 text-green-700' },
    paused: { label: '일시중지', colorClass: 'bg-yellow-100 text-yellow-700' },
    ended: { label: '종료', colorClass: 'bg-gray-100 text-gray-700' },
  };

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, colorClass } = statusMap[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}
