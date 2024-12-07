import React, { useMemo } from 'react';
import { PieChart } from 'lucide-react';
import { useAccount, useBalance, useContractReads } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { parseAbi } from 'viem';

// ERC20 ABI for the functions we need
const erc20Abi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
]);

export function DistributionChart() {
  const { address, isConnected } = useAccount();

  // Fetch ETH balance
  const { data: ethBalance } = useBalance({
    address,
    chainId: mainnet.id,
  });

  // Get token balances using multicall
  const { data: tokenBalances } = useContractReads({
    contracts: [
      // Add more token contracts here
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`, // WETH
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
      {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`, // WBTC
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`, // USDC
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
    ],
  });

  // Get token metadata using multicall
  const { data: tokenMetadata } = useContractReads({
    contracts: [
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  });

  const colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500'];

  // Process token data
  const portfolioData = useMemo(() => {
    if (!ethBalance || !tokenBalances || !tokenMetadata || !isConnected) return [];

    const tokens = [];
    
    // Add ETH
    tokens.push({
      label: 'Ethereum (ETH)',
      value: '0',
      color: 'bg-purple-500',
      amount: ethBalance.formatted,
      balance: ethBalance.value,
    });

    // Process ERC20 tokens
    for (let i = 0; i < tokenBalances.length; i++) {
      const balance = tokenBalances[i].result;
      if (!balance) continue;

      const symbol = tokenMetadata[i * 2].result as string;
      const decimals = tokenMetadata[i * 2 + 1].result as number;
      
      const formatted = (Number(balance) / 10 ** decimals).toFixed(4);
      
      tokens.push({
        label: `${symbol}`,
        value: '0',
        color: colors[i],
        amount: formatted,
        balance,
      });
    }

    // Calculate percentages
    const total = tokens.reduce((sum, token) => sum + BigInt(token.balance), BigInt(0));
    
    return tokens.map(token => ({
      ...token,
      value: ((Number(token.balance) / Number(total)) * 100).toFixed(1) + '%',
    })).filter(token => Number(token.amount) > 0);

  }, [ethBalance, tokenBalances, tokenMetadata, isConnected]);

  if (!address || portfolioData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Portfolio Distribution</h3>
          <PieChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-center text-gray-500 py-8">
          {!address ? 'Connect your wallet to view portfolio' : 'Loading portfolio data...'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Portfolio Distribution</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {portfolioData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.value} ({Number(item.amount).toFixed(5)})
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: item.value }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}