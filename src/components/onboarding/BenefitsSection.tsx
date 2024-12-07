import React from 'react';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Real-time portfolio tracking and analysis',
  'AI-powered investment recommendations',
  'Advanced risk management tools',
  'Multi-chain support',
  'Automated portfolio rebalancing',
  'Detailed performance analytics',
];

export function BenefitsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose maxAI?
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-lg text-gray-600 dark:text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl">
            {/* Add illustration or image here */}
          </div>
        </div>
      </div>
    </div>
  );
}
