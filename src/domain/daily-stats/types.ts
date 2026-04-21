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
