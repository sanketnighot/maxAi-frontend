import React from 'react';
import { useAccount } from 'wagmi';
import { CategoryAnalysis } from '../components/analysis/CategoryAnalysis';
import { MarketCapAnalysis } from '../components/analysis/MarketCapAnalysis';
import { RiskAnalysis } from '../components/analysis/RiskAnalysis';
import { ConnectWalletMessage } from '../components/shared/ConnectWalletMessage';

export default function Analysis() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectWalletMessage />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-8">Portfolio Analysis</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryAnalysis />
        <MarketCapAnalysis />
      </div>
      <RiskAnalysis />
    </div>
  );
}