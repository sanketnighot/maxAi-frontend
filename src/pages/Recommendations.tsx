import React from "react";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const allRecommendations = [
  {
    title: "Staking Opportunity",
    description: "Stake ETH for up to 12% APY",
    action: "Learn More",
  },
  {
    title: "Upcoming Airdrop",
    description: "Eligible for LayerZero airdrop",
    action: "Check Eligibility",
  },
  {
    title: "DeFi Yield Farming",
    description: "Earn 15% APY on USDC-ETH LP",
    action: "Start Farming",
  },
  {
    title: "NFT Mint Alert",
    description: "New collection launching soon",
    action: "Join Whitelist",
  },
  {
    title: "Token Swap",
    description: "Best rate for ETH to USDC swap",
    action: "Swap Now",
  },
  {
    title: "Governance Voting",
    description: "New proposal available for voting",
    action: "Vote Now",
  },
];

export function RecommendationsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">maxAI Tips</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Personalized recommendations based on your portfolio and market
            analysis. Updated in real-time to help you make informed decisions.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {allRecommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
            >
              <p className="font-medium mb-2">{rec.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {rec.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                {rec.action} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
