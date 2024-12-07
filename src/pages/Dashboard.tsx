import React from 'react';
import { PortfolioCard } from '../components/dashboard/PortfolioCard';
import { DistributionChart } from '../components/dashboard/DistributionChart';
import { OpportunityCard } from '../components/dashboard/OpportunityCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PortfolioCard />
        <DistributionChart />
      </div>
      <div className="space-y-6">
        <OpportunityCard />
      </div>
    </div>
  );
}