import { useFilterStore } from '@/store/filter-store';
import { Button } from '@/components/ui/button';

export function ResetButton() {
  const reset = useFilterStore((state) => state.reset);

  return (
    <Button variant="outline" size="sm" onClick={reset}>
      초기화
    </Button>
  );
}
