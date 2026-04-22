import { useFilterStore } from '@/store/filter-store';
import type { CampaignStatus } from '@/domain/campaign/types';
import { Checkbox } from '@/components/ui/checkbox';

const STATUS_OPTIONS: { label: string; value: CampaignStatus }[] = [
  { label: '진행중', value: 'active' },
  { label: '일시중지', value: 'paused' },
  { label: '종료', value: 'ended' },
];

export function StatusFilter() {
  const statuses = useFilterStore((s) => s.statuses);
  const toggleStatus = useFilterStore((s) => s.toggleStatus);

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium">상태</span>
      <div className="flex items-center space-x-3">
        {STATUS_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-1 cursor-pointer select-none"
          >
            <Checkbox
              checked={statuses.includes(option.value)}
              onCheckedChange={() => toggleStatus(option.value)}
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
