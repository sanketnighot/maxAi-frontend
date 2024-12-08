import React from 'react';
import { ShieldAlert } from 'lucide-react';
import type { VulnerableAsset } from '../../types/analysis';

interface RiskAnalysisProps {
  vulnerableAssets: VulnerableAsset[];
}

export function RiskAnalysis({ vulnerableAssets }: RiskAnalysisProps) {
  if (!vulnerableAssets) {
    return null;
  }

  return (
    <div className="bg-card dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <ShieldAlert className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Risk Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-impact-high/10 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-impact-high">Low Risk (60%)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stable assets with proven track record
          </p>
        </div>
        <div className="bg-impact-medium/10 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-impact-medium">Medium Risk (30%)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Growing projects with potential
          </p>
        </div>
        <div className="bg-impact-low/10 p-4 rounded-xl">
          <h3 className="font-medium mb-2 text-impact-low">High Risk (10%)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Speculative investments
          </p>
        </div>
      </div>

      {vulnerableAssets.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-medium text-red-500">Vulnerable Assets</h3>
          {vulnerableAssets.map((asset) => (
            <div key={asset.asset_token_symbol} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="font-medium">{asset.asset_name} ({asset.asset_token_symbol})</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{asset.reason}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}