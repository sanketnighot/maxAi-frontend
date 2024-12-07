import React from 'react';
import { CategoryAnalysis } from '../components/analysis/CategoryAnalysis';
import { MarketCapAnalysis } from '../components/analysis/MarketCapAnalysis';
import { RiskAnalysis } from '../components/analysis/RiskAnalysis';

export default function Analysis() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CategoryAnalysis />
      <MarketCapAnalysis />
      <RiskAnalysis />
    </div>
  );
}