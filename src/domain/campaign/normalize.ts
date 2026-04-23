import type { Campaign, CampaignStatus, Platform, RawCampaign } from './types';

const PLATFORM_MAP: Record<string, Platform> = {
  네이버: 'Naver',
  Naver: 'Naver',
  Facebook: 'Meta',
  facebook: 'Meta',
  Meta: 'Meta',
  Google: 'Google',
};

const STATUS_MAP: Record<string, CampaignStatus> = {
  running: 'active',
  active: 'active',
  stopped: 'ended',
  ended: 'ended',
  paused: 'paused',
};

export function normalizeCampaigns(raw: RawCampaign[]): Campaign[] {
  return raw.reduce<Campaign[]>((acc, campaign) => {
    if (!campaign.startDate) {
      return acc;
    }

    const platform = PLATFORM_MAP[campaign.platform];
    const status = STATUS_MAP[campaign.status];

    if (!platform || !status) {
      return acc;
    }

    let budget = 0;
    if (typeof campaign.budget === 'number') {
      budget = campaign.budget;
    } else if (typeof campaign.budget === 'string') {
      budget = parseInt(campaign.budget.replace(/[^0-9]/g, ''), 10) || 0;
    }

    const startDate = campaign.startDate.replace(/\//g, '-');
    const endDate = campaign.endDate
      ? campaign.endDate.replace(/\//g, '-')
      : null;

    acc.push({
      id: campaign.id,
      name: campaign.name || '알 수 없는 캠페인',
      platform,
      status,
      budget,
      startDate,
      endDate,
    });

    return acc;
  }, []);
}
