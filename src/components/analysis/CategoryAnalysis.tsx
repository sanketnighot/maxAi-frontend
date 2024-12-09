import React from 'react';
import { Tag } from 'lucide-react';
import type { CategorizedToken } from '../../types/analysis';

interface CategoryAnalysisProps {
  categories: {
    [key: string]: CategorizedToken[];
  };
}

interface CategoryStat {
  name: string;
  tokens: CategorizedToken[];
  totalValue: number;
  percentage: number;
  color: string;
}

export function CategoryAnalysis({ categories }: CategoryAnalysisProps) {
  console.log("Categories received:", categories);

  if (!categories || Object.keys(categories).length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Category Distribution</h2>
        </div>
        <p className="text-gray-500 text-center py-4">No category data available</p>
      </div>
    );
  }

  // Calculate total portfolio value across all categories
  const totalPortfolioValue: number = Object.values(categories).reduce((total, tokens) => {
    return total + tokens.reduce((sum, token) => {
      const value = parseFloat(token.value);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, 0);

  // Transform and sort categories by value
  const categoryStats: CategoryStat[] = Object.entries(categories)
    .map(([name, tokens]) => {
      const categoryValue = tokens.reduce((sum: number, token: CategorizedToken) => {
        const value = parseFloat(token.value);
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      // Sort tokens within category by value
      const sortedTokens = [...tokens].sort((a, b) => 
        parseFloat(b.value) - parseFloat(a.value)
      );

      return {
        name,
        tokens: sortedTokens,
        totalValue: categoryValue,
        percentage: totalPortfolioValue > 0 
          ? (categoryValue / totalPortfolioValue) * 100 
          : 0,
        color: getCategoryColor(name)
      };
    })
    .sort((a, b) => b.totalValue - a.totalValue); // Sort categories by total value

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Category Distribution</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total: ${totalPortfolioValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      </div>

      <div className="space-y-6">
        {categoryStats.map((category) => (
          <div key={category.name} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span className="font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">({category.tokens.length})</span>
              </div>
              <div className="text-sm flex items-center gap-3">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ${category.totalValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span className="text-gray-500 dark:text-gray-400 min-w-[60px] text-right">
                  {category.percentage.toFixed(4)}%
                </span>
              </div>
            </div>

            <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${category.color} transition-all duration-500 shadow-sm`}
                style={{ 
                  width: `${category.percentage}%`,
                  opacity: 0.9 + (category.percentage / 1000) // Subtle opacity variation
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
              {category.tokens.slice(0, 10).map((token) => (
                <div
                  key={`${token.token_symbol}-${token.token_name}`}
                  className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium">{token.token_symbol}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ${parseFloat(token.value).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              ))}
              {category.tokens.length > 10 && (
                <div className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400">
                  +{category.tokens.length - 10} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    DeFi: 'bg-indigo-500',
    Memecoins: 'bg-pink-500',
    Infrastructure: 'bg-orange-500',
    DAOs: 'bg-yellow-500',
    Others: 'bg-gray-500'
  };
  return colors[category] || 'bg-gray-500';
}