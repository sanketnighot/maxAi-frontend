import React from 'react';
import { PieChart } from 'lucide-react';
import { useAccount } from 'wagmi';

interface IAnalysis {
  short_descriptive_analysis_of_portfolio: string;
  holdings?: {
    symbol: string;
    percentage: number;
    value: number;
  }[];
}

interface AnalysisResponse {
  data: IAnalysis;
  success: boolean;
}

export function DistributionChart() {
  const { address } = useAccount();
  const [analysis, setAnalysis] = React.useState<AnalysisResponse | null>(null);

  React.useEffect(() => {
    const savedAnalysis = localStorage.getItem("portfolioAnalysis");
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    }
  }, []);

  if (!address) {
    return (
      <>
      
      { analysis && <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Portfolio Distribution</h3>
          <PieChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-center text-gray-500 py-8">
          No analysis available. Please analyze your portfolio first.
        </div>
      </div>}
      </>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Portfolio Distribution</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      {analysis?.data?.holdings ? (
        <div className="space-y-4">
          {analysis.data.holdings.map((holding) => (
            <div key={holding.symbol} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">{holding.symbol}</span>
              </div>
              <span className="text-sm text-gray-500">{holding.percentage.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No analysis available. Please analyze your portfolio first.
        </div>
      )}
    </div>
  );
}