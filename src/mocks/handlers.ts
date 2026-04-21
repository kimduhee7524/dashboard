import { http, HttpResponse } from 'msw';
import dbJson from './db.json';

const campaigns = [...dbJson.campaigns];
const dailyStats = [...dbJson.daily_stats];

export { campaigns, dailyStats };

export const handlers = [
  http.get('/campaigns', () => {
    return HttpResponse.json(campaigns);
  }),

  http.get('/daily_stats', () => {
    return HttpResponse.json(dailyStats);
  }),
];
