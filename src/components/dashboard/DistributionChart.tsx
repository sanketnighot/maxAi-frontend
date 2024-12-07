import React from 'react';
import { PieChart, Wallet } from 'lucide-react';

export function DistributionChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Portfolio Distribution</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {[
          { label: 'Bitcoin (BTC)', value: '45%', color: 'bg-blue-500' },
          { label: 'Ethereum (ETH)', value: '30%', color: 'bg-purple-500' },
          { label: 'Stablecoins', value: '15%', color: 'bg-green-500' },
          { label: 'Other Altcoins', value: '10%', color: 'bg-orange-500' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.value}</span>
              </div>
              <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: item.value }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}