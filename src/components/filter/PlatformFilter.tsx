import { useFilterStore } from '@/store/filter-store';
import type { Platform } from '@/domain/campaign/types';
import { Button } from '@/components/ui/button';

const PLATFORM_OPTIONS: { label: string; value: Platform }[] = [
  { label: 'Google', value: 'Google' },
  { label: 'Meta', value: 'Meta' },
  { label: 'Naver', value: 'Naver' },
];

export function PlatformFilter() {
  const platforms = useFilterStore((s) => s.platforms);
  const togglePlatform = useFilterStore((s) => s.togglePlatform);

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-700">매체</span>
      <div className="flex items-center space-x-2">
        {PLATFORM_OPTIONS.map((option) => {
          const isSelected = platforms.includes(option.value);
          return (
            <Button
              key={option.value}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => togglePlatform(option.value)}
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
