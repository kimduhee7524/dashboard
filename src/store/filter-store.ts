import { create } from 'zustand';
import type { CampaignStatus, Platform } from '@/domain/campaign/types';

type DateISO = string;

type FilterState = {
  dateRange: { start: DateISO | null; end: DateISO | null };
  statuses: CampaignStatus[];
  platforms: Platform[];

  setDateRange: (range: { start: DateISO | null; end: DateISO | null }) => void;
  toggleStatus: (status: CampaignStatus) => void;
  togglePlatform: (platform: Platform) => void;
  reset: () => void;
};

const getInitialDateRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
};

const initialState = {
  dateRange: getInitialDateRange(),
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

  reset: () => set({ ...initialState, dateRange: getInitialDateRange() }),
}));
