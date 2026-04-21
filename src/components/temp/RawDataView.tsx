import { useCampaigns } from '@/hooks/queries/useCampaigns';
import { useDailyStats } from '@/hooks/queries/useDailyStats';

export function RawDataView() {
  const { data: campaigns } = useCampaigns();
  const { data: dailyStats } = useDailyStats();

  return (
    <div className="flex flex-1 gap-4 overflow-auto p-4">
      <section className="flex-1 min-w-0">
        <h2 className="text-lg font-bold mb-2">
          Campaigns ({campaigns.length})
        </h2>
        <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-[80vh]">
          {JSON.stringify(campaigns, null, 2)}
        </pre>
      </section>
      <section className="flex-1 min-w-0">
        <h2 className="text-lg font-bold mb-2">
          Daily Stats ({dailyStats.length})
        </h2>
        <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-[80vh]">
          {JSON.stringify(dailyStats, null, 2)}
        </pre>
      </section>
    </div>
  );
}
