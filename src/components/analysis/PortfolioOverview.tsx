import { formatDistanceToNow } from 'date-fns';
import type { PortfolioAnalysis } from '../../types/analysis';

interface PortfolioOverviewProps {
  analysis: PortfolioAnalysis;
}

export function PortfolioOverview({ analysis }: PortfolioOverviewProps) {
  if (!analysis || !analysis.market_trend_analysis) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overview Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Portfolio Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Unrealized P&L</span>
              <span className="font-medium">{analysis.unrealised_pnl}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Chain</span>
              <span className="font-medium capitalize">{analysis.chain}</span>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Market Trends</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Top Gainer</span>
              <span className="font-medium text-green-500">
                {analysis.market_trend_analysis.top_gainer.token_name} (
                {analysis.market_trend_analysis.top_gainer.price_change})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Top Loser</span>
              <span className="font-medium text-red-500">
                {analysis.market_trend_analysis.top_loser.token_name} (
                {analysis.market_trend_analysis.top_loser.price_change})
              </span>
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analysis Summary</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {analysis.short_descriptive_analysis_of_portfolio}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      {analysis.transaction_history.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analysis.transaction_history.map((tx) => (
                  <tr key={tx.transaction_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      {tx.transaction_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {parseInt(tx.transaction_amount, 16).toString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDistanceToNow(new Date(parseInt(tx.transaction_time, 16) * 1000), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.transaction_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.transaction_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 