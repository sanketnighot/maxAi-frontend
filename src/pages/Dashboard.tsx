import React, { useEffect, useState } from "react";
import { DistributionChart } from "../components/dashboard/DistributionChart";
import { OpportunityCard } from "../components/dashboard/OpportunityCard";
import { useAccount } from "wagmi";
import Landing from "../components/onboarding/Landing";

interface IToken {
    token_name: string;
    token_address: string;
    token_balance: string;
    token_price_in_USD: string;
}

interface ITransaction {
    transaction_id: string;
    transaction_type: string;
    transaction_amount: string;
    transaction_time: string;
    transaction_status: string;
}

interface IVulnerableAsset {
    asset_name: string;
    reason: string;
}

export interface IAnalysis extends Document {
    unrealised_pnl: string;
    user_wallet_address: string;
    chain: string;
    tokens: IToken[];
    transaction_history: ITransaction[];
    short_descriptive_analysis_of_portfolio: string;
    vulnerable_assets: IVulnerableAsset[];
    suggestions: string;
    timestamp: number;
}
// interface AnalysisResponse {
//   // Add response type based on your API
//   data: IAnalysis;
//   success: boolean;
// }

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const [analysis, setAnalysis] = useState<IAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/portfolio-analyzer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address,
          chain: 'ethereum', // or make this selectable
          duration: '123456'    // or make this selectable
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze portfolio');
      }

      const data = await response.json();
      setAnalysis(data);
      localStorage.setItem("portfolioAnalysis", JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("portfolioAnalysis");
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    }
  }, []);

  if (!isConnected) {
    return <Landing />;
  }

  console.log("analysis", analysis)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <DistributionChart />
          </div>
          <div className="space-y-6">
            <OpportunityCard suggestions={
              typeof analysis?.suggestions === 'string' 
                ? JSON.parse(analysis.suggestions) 
                : analysis?.suggestions
            } />
        </div>
      </div>

      {/* Analyze Button Section */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze My Portfolio'}
        </button>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
      
      {/* Analysis Results Section */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Unrealized PNL Card */}
            {analysis.unrealised_pnl && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Unrealized PNL</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {typeof analysis.unrealised_pnl === 'object' 
                    ? JSON.stringify(analysis.unrealised_pnl) 
                    : analysis.unrealised_pnl}
                </p>
              </div>
            )}

            {/* Portfolio Analysis Card */}
            {analysis.short_descriptive_analysis_of_portfolio && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Portfolio Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {typeof analysis.short_descriptive_analysis_of_portfolio === 'object'
                    ? JSON.stringify(analysis.short_descriptive_analysis_of_portfolio)
                    : analysis.short_descriptive_analysis_of_portfolio}
                </p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Vulnerable Assets Card */}
            {analysis.vulnerable_assets && analysis.vulnerable_assets.length > 0 && (
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Vulnerable Assets</h3>
                <div className="space-y-3">
                  {analysis.vulnerable_assets.map((asset, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0">
                      <h4 className="font-medium text-sm">{asset.asset_name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {asset.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
