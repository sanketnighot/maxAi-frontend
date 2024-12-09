import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface OpportunityCardProps {
  suggestions?: {
    token_name: string;
    amount: string;
  };
}

export function OpportunityCard({ suggestions }: OpportunityCardProps) {
  if (!suggestions) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          No recommendations available at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ArrowTrendingUpIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Staking Opportunity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Stake {suggestions.amount} {suggestions.token_name}
            </p>
          </div>
        </div>
        
        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Start Staking
        </button>
      </div>
    </div>
  );
}