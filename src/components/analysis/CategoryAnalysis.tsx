import { Tag } from "lucide-react";
import type { CategorizedToken, CategoryResponse } from "../../types/analysis";

interface CategoryAnalysisProps {
  categories?: CategoryResponse["categories"];
}

interface CategoryStat {
  name: string;
  tokens: CategorizedToken[];
  amount: string;
  percentage: number;
  color: string;
}

// Dummy data
const dummyCategories: CategoryResponse["categories"] = {
  DeFi: [
    { symbol: "AAVE", value: 1000, name: "Aave", balance: "5" },
    { symbol: "UNI", value: 800, name: "Uniswap", balance: "100" },
    { symbol: "COMP", value: 600, name: "Compound", balance: "10" },
  ],
  Stablecoins: [
    { symbol: "USDT", value: 2000, name: "Tether", balance: "2000" },
    { symbol: "USDC", value: 1500, name: "USD Coin", balance: "1500" },
  ],
  L1s: [
    { symbol: "ETH", value: 5000, name: "Ethereum", balance: "2" },
    { symbol: "BTC", value: 8000, name: "Bitcoin", balance: "0.2" },
  ],
  Gaming: [
    { symbol: "AXS", value: 300, name: "Axie Infinity", balance: "20" },
    { symbol: "MANA", value: 200, name: "Decentraland", balance: "100" },
  ],
  Others: [{ symbol: "LINK", value: 400, name: "Chainlink", balance: "25" }],
  Memecoins: [],
  L2s: [],
  Infrastructure: [],
  DAOs: [],
  Metaverse: [],
  GovernanceTokens: [],
  PrivacyCoins: [],
};

export function CategoryAnalysis({
  categories = dummyCategories,
}: CategoryAnalysisProps) {
  if (!categories || typeof categories !== "object") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-[rgb(5,0,255)]" />
          <h2 className="text-lg font-semibold">Category Distribution</h2>
        </div>
        <p className="text-gray-500 text-center py-4">
          No categories available
        </p>
      </div>
    );
  }

  // Create default empty categories if they don't exist
  const defaultCategories = {
    DeFi: categories.DeFi || [],
    Stablecoins: categories.Stablecoins || [],
    Memecoins: categories.Memecoins || [],
    L1s: categories.L1s || [],
    L2s: categories.L2s || [],
    Infrastructure: categories.Infrastructure || [],
    Gaming: categories.Gaming || [],
    DAOs: categories.DAOs || [],
    Metaverse: categories.Metaverse || [],
    GovernanceTokens: categories.GovernanceTokens || [],
    PrivacyCoins: categories.PrivacyCoins || [],
    Others: categories.Others || [],
  };

  // Calculate total portfolio value with safety checks
  const totalValue = Object.values(defaultCategories).reduce(
    (sum: number, tokens) => {
      if (!Array.isArray(tokens)) return sum;
      return (
        sum +
        tokens.reduce((tokenSum, token) => tokenSum + (token.value || 0), 0)
      );
    },
    0
  );

  // Transform categories into stats with safety checks
  const categoryStats: CategoryStat[] = Object.entries(defaultCategories)
    .filter(([, tokens]) => Array.isArray(tokens) && tokens.length > 0)
    .map(([name, tokens]) => {
      const categoryValue = tokens.reduce(
        (sum, token) => sum + (token.value || 0),
        0
      );
      return {
        name,
        tokens,
        amount: `$${categoryValue.toFixed(2)}`,
        percentage:
          totalValue > 0 ? Math.round((categoryValue / totalValue) * 100) : 0,
        color: getCategoryColor(name),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Category Distribution</h2>
      </div>

      {categoryStats.length > 0 ? (
        <div className="space-y-4">
          {categoryStats.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {category.amount} ({category.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div
                  className={`h-full rounded-full ${category.color}`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.tokens.map((token) => (
                  <span
                    key={token.symbol}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded"
                  >
                    {token.symbol}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No tokens in any category
        </p>
      )}
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    DeFi: "bg-purple-500",
    Stablecoins: "bg-blue-500",
    Memecoins: "bg-pink-500",
    L1s: "bg-green-500",
    L2s: "bg-teal-500",
    Infrastructure: "bg-indigo-500",
    Gaming: "bg-orange-500",
    DAOs: "bg-yellow-500",
    Metaverse: "bg-red-500",
    GovernanceTokens: "bg-cyan-500",
    PrivacyCoins: "bg-violet-500",
    Others: "bg-gray-500",
  };
  return colors[category] || "bg-gray-500";
}
