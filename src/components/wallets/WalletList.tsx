import React from 'react';
import { Wallet2, ExternalLink, Trash2 } from 'lucide-react';
import { useBalance } from 'wagmi';

interface WalletAccount {
  address: string;
  provider: string;
}

interface WalletListProps {
  accounts: WalletAccount[];
  onRemoveAccount: (address: string) => void;
}

export function WalletList({ accounts, onRemoveAccount }: WalletListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Wallet2 className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Connected Accounts</h2>
      </div>

      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No accounts connected. Connect a wallet to get started.
          </div>
        ) : (
          accounts.map((account) => (
            <AccountCard
              key={account.address}
              account={account}
              onRemove={onRemoveAccount}
            />
          ))
        )}
      </div>
    </div>
  );
}

function AccountCard({ account, onRemove }: { account: WalletAccount; onRemove: (address: string) => void }) {
  const { data: balance } = useBalance({
    address: account.address as `0x${string}`,
  });

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{account.provider}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {account.address}
        </p>
        <p className="text-sm font-medium">
          {balance ? `${balance.formatted} ${balance.symbol}` : 'Loading...'}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={`https://etherscan.io/address/${account.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
        <button
          onClick={() => onRemove(account.address)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}