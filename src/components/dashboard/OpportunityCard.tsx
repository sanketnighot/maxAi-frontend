import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function OpportunityCard() {
  return (
    <div className="bg-primary text-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6" />
        <h3 className="text-lg font-semibold">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white/25 backdrop-blur-lg rounded-xl p-4">
          <p className="font-medium mb-2">Staking Opportunity</p>
          <p className="text-sm text-white/80 mb-3">Stake ETH for up to 12% APY</p>
          <button className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white/25 backdrop-blur-lg rounded-xl p-4">
          <p className="font-medium mb-2">Upcoming Airdrop</p>
          <p className="text-sm text-white/80 mb-3">Eligible for LayerZero airdrop</p>
          <button className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
            Check Eligibility <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}