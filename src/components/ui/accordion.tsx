import { useState, memo } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = memo(function Accordion({
  title,
  checked,
  onCheckChange,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange?.(e.target.checked);
  };

  return (
    <div className="border-b border-gray-300">
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-100">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '아코디언 접기' : '아코디언 펼치기'}
          className="shrink-0"
        >
          <ChevronDown
            className={cn(
              'w-5 h-5 text-gray-600 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {onCheckChange && (
          <input
            type="checkbox"
            checked={checked === true}
            onChange={handleCheckboxChange}
            className="w-4 h-4 cursor-pointer"
          />
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 text-left"
        >
          <span className="text-body-2 font-bold text-gray-900">{title}</span>
        </button>
      </div>

      {isOpen && <div className="bg-white">{children}</div>}
    </div>
  );
});
