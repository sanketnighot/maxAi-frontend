import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowUpRight, ChevronDown, Wallet } from "lucide-react";
import { mainnet } from "wagmi/chains";
import { useAccount, useBalance } from "wagmi";

export function PortfolioCard() {
  const { address, isConnected } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    chainId: mainnet.id,
  });
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ];

  useEffect(() => {
    if (isConnected && ethBalance) {
      const ethPrice = 2000; // Example ETH price
      setTotalPortfolioValue(Number(ethBalance.formatted) * ethPrice);
    }
  }, [isConnected, ethBalance]);

  if (!isConnected) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="text-center text-gray-500 py-4">
          Connect your wallet to view portfolio
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Total Portfolio Value</h3>
          <p className="text-3xl font-bold">
            $
            {totalPortfolioValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-blue-500 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg"
          >
            <span className=" text-sm font-medium">{selectedPeriod}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => {
                    setSelectedPeriod(period.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    selectedPeriod === period.value
                      ? "bg-gray-100 dark:bg-gray-600"
                      : ""
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">24h Change</span>
          {/* <div className="flex items-center gap-1 text-green-500">
            <ArrowUpRight className="w-4 h-4" />
            <span>+$0.00</span>
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">Assets</p>
            <p className="text-lg font-semibold">
              {ethBalance && Number(ethBalance.value) > 0 ? 1 : 0}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">Wallets</p>
            <p className="text-lg font-semibold">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
