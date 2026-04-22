import { DateRangeFilter } from './DateRangeFilter';
import { StatusFilter } from './StatusFilter';
import { PlatformFilter } from './PlatformFilter';
import { ResetButton } from './ResetButton';

export function FilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap items-center gap-6">
        <DateRangeFilter />
        <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
        <StatusFilter />
        <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
        <PlatformFilter />
      </div>
      <div className="mt-4 md:mt-0 flex items-center pr-2">
        <div className="w-px h-6 bg-gray-200 hidden md:block mr-4"></div>
        <ResetButton />
      </div>
    </div>
  );
}
