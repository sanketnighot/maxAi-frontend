import React from 'react';
import { CircleDollarSign } from 'lucide-react';

const marketCapCategories = [
  { name: 'Blue Chip', percentage: 60, tokens: ['BTC', 'ETH'], color: 'bg-blue-500' },
  { name: 'Mid Cap', percentage: 30, tokens: ['SOL', 'AVAX'], color: 'bg-green-500' },
  { name: 'Small Cap', percentage: 10, tokens: ['ARB', 'OP'], color: 'bg-orange-500' },
];

export function MarketCapAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <CircleDollarSign className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Market Cap Distribution</h2>
      </div>

      <div className="space-y-6">
        {marketCapCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {category.percentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
            <div className="flex gap-2">
              {category.tokens.map((token) => (
                <span
                  key={token}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}