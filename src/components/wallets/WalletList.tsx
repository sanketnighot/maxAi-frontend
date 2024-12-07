import React from 'react';
import { Wallet2, ExternalLink, Trash2 } from 'lucide-react';

const wallets = [
  {
    name: 'Main Wallet',
    address: '0x1234...5678',
    balance: '$45,678.90',
    type: 'MetaMask',
  },
  {
    name: 'Trading Wallet',
    address: '0x8765...4321',
    balance: '$34,567.89',
    type: 'WalletConnect',
  },
  {
    name: 'Cold Storage',
    address: '0x9876...5432',
    balance: '$78,901.23',
    type: 'Ledger',
  },
];

export function WalletList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Wallet2 className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Connected Wallets</h2>
      </div>

      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{wallet.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {wallet.address}
              </p>
              <p className="text-sm font-medium">{wallet.balance}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}