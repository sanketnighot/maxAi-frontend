import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export function PortfolioCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Total Portfolio Value</h3>
          <p className="text-3xl font-bold">$124,532.89</p>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12.4%</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">24h Change</span>
          <div className="flex items-center gap-1 text-green-500">
            <ArrowUpRight className="w-4 h-4" />
            <span>+$1,234.56</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">Assets</p>
            <p className="text-lg font-semibold">12</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">Wallets</p>
            <p className="text-lg font-semibold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}