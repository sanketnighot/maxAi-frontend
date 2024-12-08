import React from 'react';
import { TrendingUp, Activity, Wallet, AlertTriangle } from 'lucide-react';
import type { PortfolioAnalysis } from '../../types/analysis';

interface PortfolioMetricsProps {
  analysis: PortfolioAnalysis;
}

interface MetricCard {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function PortfolioMetrics({ analysis }: PortfolioMetricsProps) {
  const metrics: MetricCard[] = [
    {
      title: 'Portfolio Value',
      value: (analysis.tokens?.length 
        ? analysis.tokens.reduce((sum, token) => sum + token.value, 0).toFixed(2)
        : "0") + ' USD',
      description: 'Total portfolio value across all assets',
      icon: <Wallet className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      title: 'Unrealized P&L',
      value: analysis.unrealised_pnl || '0 USD',
      description: 'Unrealized profit/loss',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-500'
    },
    {
      title: 'Risk Score',
      value: '65/100',
      description: 'Portfolio risk assessment',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-yellow-500'
    },
    {
      title: 'Activity',
      value: `${analysis.transaction_history?.length || 0} transactions`,
      description: 'Recent transaction count',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-6">Portfolio Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.title}
            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="text-xl font-semibold mt-1">{metric.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {metric.description}
                </p>
              </div>
              <div className={`${metric.color}`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 