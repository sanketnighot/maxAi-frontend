import React from "react";
import { TrendingUp, TrendingDown, LineChart } from "lucide-react";

export function Permomance() {
  // Example data - replace with real data later
  const performanceData = {
    bestAsset: {
      symbol: "ETH",
    },
    worstAsset: {
      symbol: "BTC",
    },
    pnl: {
      value: 2150.75,
      isPositive: true,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Performance</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* Best Performing Asset */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Best Asset
            </span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold">
              {performanceData.bestAsset.symbol}
            </span>
          </div>
        </div>

        {/* Worst Performing Asset */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Worst Asset
            </span>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2">
            <span className="text-lg font-semibold">
              {performanceData.worstAsset.symbol}
            </span>
          </div>
        </div>

        {/* PNL */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              PNL
            </span>
            <LineChart
              className={`w-4 h-4 ${
                performanceData.pnl.isPositive
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            />
          </div>
          <div className="mt-2">
            <span
              className={`text-lg font-semibold ${
                performanceData.pnl.isPositive
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {performanceData.pnl.isPositive ? "+" : "-"}$
              {Math.abs(performanceData.pnl.value).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
