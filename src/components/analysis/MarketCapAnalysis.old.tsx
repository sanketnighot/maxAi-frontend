import React from 'react';
import { PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { PortfolioAnalysis } from '../../types/analysis';

interface MarketCapAnalysisProps {
  analysis: PortfolioAnalysis;
}

interface TokenData {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  '#3B82F6', // blue-500
  '#10B981', // green-500
  '#F59E0B', // yellow-500
  '#EF4444', // red-500
  '#8B5CF6', // purple-500
  '#EC4899', // pink-500
  '#6366F1', // indigo-500
  '#64748B', // gray-500
];

export function MarketCapAnalysis({ analysis }: MarketCapAnalysisProps) {
  if (!analysis?.tokens?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <PieIcon className="w-5 h-5 text-[rgb(5,0,255)]" />
          <h2 className="text-lg font-semibold">Market Cap Distribution</h2>
        </div>
        <p className="text-gray-500 text-center py-4">No tokens available</p>
      </div>
    );
  }

  // Calculate market cap distribution with safety checks
  const tokenData: TokenData[] = analysis.tokens
    .filter(token => token.value > 0)
    .map((token, index) => ({
      name: token.symbol || 'Unknown',
      value: token.value || 0,
      color: COLORS[index % COLORS.length]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  // Add "Others" category if there are more tokens
  if (analysis.tokens.length > 7) {
    const topTokensValue = tokenData.reduce((sum, item) => sum + item.value, 0);
    const totalValue = analysis.tokens.reduce((sum, token) => sum + (token.value || 0), 0);
    const othersValue = totalValue - topTokensValue;
    
    if (othersValue > 0) {
      tokenData.push({
        name: 'Others',
        value: othersValue,
        color: COLORS[7]
      });
    }
  }

  // Calculate percentages
  const totalValue = tokenData.reduce((sum, item) => sum + item.value, 0);
  const tokenDistributionWithPercentages = tokenData.map(item => ({
    ...item,
    percentage: totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <PieIcon className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">stribution</h2>
      </div>

      {/* Pie Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={tokenData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {tokenData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* List View */}
      <div className="space-y-4 mt-6">
        {tokenDistributionWithPercentages.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }} />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ${item.value.toFixed(2)} ({item.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className="h-full rounded-full"
                style={{ 
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Portfolio market cap distribution showing relative proportions of each asset,
          helping visualize portfolio composition and concentration.
        </p>
      </div>
    </div>
  );
}