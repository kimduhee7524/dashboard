import { useFilterStore } from '@/store/filter-store';
import type { Platform } from '@/domain/campaign/types';
import { Checkbox } from '@/components/ui/checkbox';

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
      <span className="text-sm font-medium">매체</span>
      <div className="flex items-center space-x-3">
        {PLATFORM_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-1 cursor-pointer select-none"
          >
            <Checkbox
              checked={platforms.includes(option.value)}
              onCheckedChange={() => togglePlatform(option.value)}
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
