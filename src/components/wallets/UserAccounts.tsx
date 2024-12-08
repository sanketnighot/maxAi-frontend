import React from 'react';
import { Wallet } from 'lucide-react';

interface Account {
  address: string;
  name: string;
  balance: string;
  network: string;
}

interface UserAccountsProps {
  accounts: Account[];
  selectedAddress?: string;
  onSelectAccount: (address: string) => void;
}

export function UserAccounts({ accounts, selectedAddress, onSelectAccount }: UserAccountsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Your Accounts</h2>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <button
            key={account.address}
            onClick={() => onSelectAccount(account.address)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedAddress === account.address
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {account.balance}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {account.network}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 