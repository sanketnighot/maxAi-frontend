import React from 'react';
import { Tag } from 'lucide-react';

const categories = [
  { name: 'DeFi', percentage: 35, amount: '$43,586.51', color: 'bg-purple-500' },
  { name: 'Gaming', percentage: 25, amount: '$31,133.22', color: 'bg-blue-500' },
  { name: 'Infrastructure', percentage: 20, amount: '$24,906.58', color: 'bg-green-500' },
  { name: 'AI', percentage: 15, amount: '$18,679.93', color: 'bg-orange-500' },
  { name: 'Meme', percentage: 5, amount: '$6,226.64', color: 'bg-pink-500' },
];

export function CategoryAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Category Distribution</h2>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {category.amount} ({category.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}