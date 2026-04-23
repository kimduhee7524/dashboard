import type { CampaignStatus } from '@/domain/campaign/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BulkStatusSelectProps {
  onUpdate: (status: CampaignStatus) => void;
}

export function BulkStatusSelect({ onUpdate }: BulkStatusSelectProps) {
  const handleChange = (value: string) => {
    onUpdate(value as CampaignStatus);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="h-8 w-[110px] bg-white border-gray-200">
        <SelectValue placeholder="상태 변경" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">진행중</SelectItem>
        <SelectItem value="paused">일시중지</SelectItem>
        <SelectItem value="ended">종료</SelectItem>
      </SelectContent>
    </Select>
  );
}
