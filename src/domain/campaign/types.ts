export type Platform = 'Google' | 'Meta' | 'Naver';
export type CampaignStatus = 'active' | 'paused' | 'ended';

export interface RawCampaign {
  id: string;
  name: string | null;
  status: string;
  platform: string;
  budget: number | string | null;
  startDate: string | null;
  endDate: string | null;
}

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  startDate: string;
  endDate: string | null;
}
