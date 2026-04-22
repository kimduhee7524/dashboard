import { create } from 'zustand';
import type { CampaignStatus, Platform } from '@/domain/campaign/types';
import { getDefaultDateRange } from '@/domain/filters/defaults';

type DateISO = string;

type FilterState = {
  dateRange: { start: DateISO; end: DateISO };
  statuses: CampaignStatus[];
  platforms: Platform[];

  setDateRange: (range: { start: DateISO; end: DateISO }) => void;
  toggleStatus: (status: CampaignStatus) => void;
  togglePlatform: (platform: Platform) => void;
  reset: () => void;
};

const initialState = {
  dateRange: getDefaultDateRange(),
  statuses: [] as CampaignStatus[],
  platforms: [] as Platform[],
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setDateRange: (range) => set({ dateRange: range }),

  toggleStatus: (status) =>
    set((state) => ({
      statuses: state.statuses.includes(status)
        ? state.statuses.filter((s) => s !== status)
        : [...state.statuses, status],
    })),

  togglePlatform: (platform) =>
    set((state) => ({
      platforms: state.platforms.includes(platform)
        ? state.platforms.filter((p) => p !== platform)
        : [...state.platforms, platform],
    })),

  reset: () => set({ ...initialState, dateRange: getDefaultDateRange() }),
}));
