import React from 'react';
import { Plus, Wallet } from 'lucide-react';

const walletOptions = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '🔗' },
  { name: 'Ledger', icon: '🔒' },
  { name: 'Coinbase Wallet', icon: '📱' },
];

export function ConnectWallet() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Connect Wallet</h2>
      </div>

      <div className="space-y-3">
        {walletOptions.map((wallet) => (
          <button
            key={wallet.name}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-2xl">{wallet.icon}</span>
            <span className="font-medium">{wallet.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}