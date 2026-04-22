import { useFilterStore } from '@/store/filter-store';
import type { CampaignStatus } from '@/domain/campaign/types';
import { Button } from '@/components/ui/button';

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
      <span className="text-sm font-medium text-gray-700">상태</span>
      <div className="flex items-center space-x-2">
        {STATUS_OPTIONS.map((option) => {
          const isSelected = statuses.includes(option.value);
          return (
            <Button
              key={option.value}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleStatus(option.value)}
              className={`rounded-full px-4 h-8 border ${
                isSelected
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
