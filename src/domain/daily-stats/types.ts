export interface RawDailyStat {
  id: string;
  campaignId: string;
  date: string;
  impressions: number | null;
  clicks: number | null;
  conversions: number | null;
  cost: number | null;
  conversionsValue: number | null;
}

export interface DailyStat {
  id: string;
  campaignId: string;
  date: string; // YYYY-MM-DD
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  conversionsValue: number | null;
}

export type MetricKey = 'cost' | 'impressions' | 'clicks' | 'conversions';
