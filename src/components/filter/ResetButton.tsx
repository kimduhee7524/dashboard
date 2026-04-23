import { useFilterStore } from '@/store/filter-store';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function ResetButton() {
  const reset = useFilterStore((state) => state.reset);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={reset}
      className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center space-x-1"
    >
      <RotateCcw className="w-4 h-4" />
      <span>초기화</span>
    </Button>
  );
}
