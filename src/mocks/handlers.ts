import { http, HttpResponse } from 'msw';
import dbJson from './db.json';

const campaigns = [...dbJson.campaigns];
const dailyStats = [...dbJson.daily_stats];

export { campaigns, dailyStats };

export const handlers = [
  http.get('/campaigns', () => {
    return HttpResponse.json(campaigns);
  }),

  http.post('/campaigns', async ({ request }) => {
    const body = (await request.json()) as any;

    const newCampaign = {
      ...body,
      id: `CAM-${Date.now().toString().slice(-5)}`,
      status: 'active',
    };

    campaigns.push(newCampaign);

    return HttpResponse.json(newCampaign, { status: 201 });
  }),

  http.patch('/campaigns/bulk/status', async ({ request }) => {
    const body = (await request.json()) as { ids: string[]; status: string };

    const updatedCampaigns = [];
    for (const id of body.ids) {
      const campaign = campaigns.find((c) => c.id === id);
      if (campaign) {
        campaign.status = body.status;
        updatedCampaigns.push(campaign);
      }
    }

    return HttpResponse.json(updatedCampaigns);
  }),

  http.patch('/campaigns/:id/status', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { status: string };

    const campaign = campaigns.find((c) => c.id === id);
    if (!campaign) {
      return new HttpResponse(null, { status: 404 });
    }

    campaign.status = body.status;
    return HttpResponse.json(campaign);
  }),

  http.get('/daily_stats', () => {
    return HttpResponse.json(dailyStats);
  }),
];
